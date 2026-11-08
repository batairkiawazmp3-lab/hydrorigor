/**
 * Build-time HTML tweaks (a Sätteri hast plugin for MDX, wired in astro.config.mjs) that make
 * guide tables and diagrams usable on phones.
 *
 * Tables with three or more columns get the `hr-table-stack` class, a `data-label` on every
 * cell (its column heading) and explicit table roles. Below 640px the CSS in
 * `src/styles/global.css` shows each row as a card instead of squeezing the columns; the roles
 * keep screen readers announcing a table even though the display changes.
 *
 * Diagram images (`/images/guides/*.svg`) become a <figure>: the image links to the full-size
 * SVG so a phone reader can open and zoom it, gets width/height from its viewBox (no layout
 * shift) and loads lazily; portrait diagrams also get `hr-figure-tall`, which keeps them at a
 * readable width on desktop. An italic paragraph right after the image becomes its <figcaption>.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface GuideHastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: GuideHastNode[];
}

interface VisitContext {
  parent(node: GuideHastNode): GuideHastNode | undefined;
  indexOf(node: GuideHastNode): number | undefined;
  removeNode(node: GuideHastNode): void;
}

export const DIAGRAM_PREFIX = '/images/guides/';

const isElement = (node: GuideHastNode | undefined, tag?: string): node is GuideHastNode =>
  node?.type === 'element' && (tag === undefined || node.tagName === tag);

const isBlank = (node: GuideHastNode) => node.type === 'text' && !(node.value ?? '').trim();

const elementChildren = (node: GuideHastNode) => (node.children ?? []).filter((child) => isElement(child));

const textOf = (node: GuideHastNode): string =>
  node.type === 'text' ? node.value ?? '' : (node.children ?? []).map(textOf).join('');

/** A plain, mutable copy of a (possibly read-only) node and its subtree. */
function copy(node: GuideHastNode): GuideHastNode {
  const out: GuideHastNode = { type: node.type };
  if (node.tagName !== undefined) out.tagName = node.tagName;
  if (node.value !== undefined) out.value = node.value;
  if (node.properties !== undefined) {
    out.properties = Object.fromEntries(
      Object.entries(node.properties).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]),
    );
  }
  if (node.children !== undefined) out.children = node.children.map(copy);
  return out;
}

const withClass = (properties: Record<string, unknown> | undefined, name: string) => {
  const current = Array.isArray(properties?.className) ? (properties.className as string[]) : [];
  return { ...properties, className: [...current, name] };
};

/** The single element inside a paragraph, ignoring whitespace; undefined if there is anything else. */
const onlyChild = (paragraph: GuideHastNode | undefined, tag: string) => {
  if (!isElement(paragraph, 'p')) return undefined;
  const meaningful = (paragraph.children ?? []).filter((child) => !isBlank(child));
  return meaningful.length === 1 && isElement(meaningful[0], tag) ? meaningful[0] : undefined;
};

const diagramImage = (paragraph: GuideHastNode | undefined) => {
  const img = onlyChild(paragraph, 'img');
  return img && String(img.properties?.src ?? '').startsWith(DIAGRAM_PREFIX) ? img : undefined;
};

/** The nearest non-blank sibling before (-1) or after (+1) a node. */
function sibling(node: GuideHastNode, ctx: VisitContext, step: -1 | 1) {
  const parent = ctx.parent(node);
  const index = ctx.indexOf(node);
  if (!parent?.children || index === undefined) return undefined;
  for (let i = index + step; i >= 0 && i < parent.children.length; i += step) {
    const candidate = parent.children[i];
    if (candidate && !isBlank(candidate)) return candidate;
  }
  return undefined;
}

/** Returns the table with stacking classes, labels and roles, or undefined to leave it alone. */
export function stackTable(source: GuideHastNode): GuideHastNode | undefined {
  const head = elementChildren(source).find((child) => child.tagName === 'thead');
  const headRow = head && elementChildren(head).find((child) => child.tagName === 'tr');
  const labels = headRow ? elementChildren(headRow).map((cell) => textOf(cell).trim()) : [];
  if (labels.length < 3) return undefined;

  const table = copy(source);
  table.properties = { ...withClass(table.properties, 'hr-table-stack'), role: 'table' };
  for (const group of elementChildren(table)) {
    if (group.tagName !== 'thead' && group.tagName !== 'tbody') continue;
    group.properties = { ...group.properties, role: 'rowgroup' };
    for (const row of elementChildren(group)) {
      if (row.tagName !== 'tr') continue;
      row.properties = { ...row.properties, role: 'row' };
      elementChildren(row).forEach((cell, index) => {
        if (cell.tagName === 'th') {
          cell.properties = { ...cell.properties, role: 'columnheader' };
          return;
        }
        const label = labels[index] ?? '';
        let properties: Record<string, unknown> = { ...cell.properties, role: 'cell' };
        if (label) properties.dataLabel = label;
        if (/^sources?$/iu.test(label)) properties = withClass(properties, 'hr-cell-source');
        cell.properties = properties;
      });
    }
  }
  return table;
}

const viewBoxCache = new Map<string, { width: number; height: number } | undefined>();

function diagramSize(src: string) {
  if (!viewBoxCache.has(src)) {
    let size: { width: number; height: number } | undefined;
    try {
      const svg = readFileSync(join(process.cwd(), 'public', src), 'utf8');
      const match = svg.match(/viewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/u);
      if (match) size = { width: Number(match[1]), height: Number(match[2]) };
    } catch {
      size = undefined;
    }
    viewBoxCache.set(src, size);
  }
  return viewBoxCache.get(src);
}

/** A <figure> linking the diagram to its full-size file, with the caption if there is one. */
export function diagramFigure(source: GuideHastNode, caption?: GuideHastNode): GuideHastNode {
  const img = copy(source);
  const src = String(img.properties?.src);
  const size = diagramSize(src);
  img.properties = {
    ...img.properties,
    ...(size ? { width: size.width, height: size.height } : {}),
    loading: 'lazy',
    decoding: 'async',
  };
  const hint = (text: string, className: string): GuideHastNode => ({
    type: 'element',
    tagName: 'span',
    properties: { className: ['hr-figure-zoom', className], ariaHidden: 'true' },
    children: [{ type: 'text', value: text }],
  });
  const figure: GuideHastNode = {
    type: 'element',
    tagName: 'figure',
    // Portrait diagrams (drawn for phones) get a narrower frame on wide screens.
    properties: { className: size && size.height > size.width * 1.15 ? ['hr-figure', 'hr-figure-tall'] : ['hr-figure'] },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: { href: src, className: ['hr-figure-link'] },
        children: [img, hint('Tap to enlarge', 'hr-figure-zoom-phone'), hint('Open full size', 'hr-figure-zoom-wide')],
      },
    ],
  };
  if (caption) {
    figure.children!.push({ type: 'element', tagName: 'figcaption', properties: {}, children: (caption.children ?? []).map(copy) });
  }
  return figure;
}

export const guideMediaPlugin = {
  name: 'hydrorigor-guide-media',
  element: [
    {
      filter: ['table'],
      visit: (node: GuideHastNode) => stackTable(node),
    },
    {
      filter: ['p'],
      visit(node: GuideHastNode, ctx: VisitContext) {
        const img = diagramImage(node);
        if (img) return diagramFigure(img, onlyChild(sibling(node, ctx, 1), 'em'));
        // An italic caption right after a diagram has moved into the figure above.
        if (onlyChild(node, 'em') && diagramImage(sibling(node, ctx, -1))) ctx.removeNode(node);
        return undefined;
      },
    },
  ],
};
