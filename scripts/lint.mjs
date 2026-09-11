import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = join(projectRoot, "src");

const allowedExtensions = new Set([
  ".astro",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".css",
]);

const violations = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!allowedExtensions.has(extname(entry.name))) {
      continue;
    }

    const source = await readFile(fullPath, "utf8");
    const rel = relative(projectRoot, fullPath);

    if (/\bconsole\.log\s*\(/.test(source)) {
      violations.push(`${rel}: console.log is not allowed in application source.`);
    }

    if (/\bdebugger\s*;?/.test(source)) {
      violations.push(`${rel}: debugger statement is not allowed.`);
    }
  }
}

await walk(sourceRoot);

if (violations.length > 0) {
  process.stderr.write(`${violations.join("\n")}\n`);
  process.exit(1);
}

process.stdout.write("HydroRigor source lint checks passed.\n");
