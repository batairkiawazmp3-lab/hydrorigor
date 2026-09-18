import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distRoot = resolve(projectRoot, 'dist');
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};
const host = option('--host', '127.0.0.1');
const port = Number(option('--port', '4321'));

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.wasm', 'application/wasm'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const vercelConfig = JSON.parse(await readFile(join(projectRoot, 'vercel.json'), 'utf8'));
const securityHeaders = Object.fromEntries(
  (vercelConfig.headers?.find(({ source }) => source === '/(.*)')?.headers ?? [])
    .map(({ key, value }) => [key, value]),
);

async function findStaticFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relativePath = decoded.replace(/^\/+/, '');
  const candidates = decoded === '/'
    ? [join(distRoot, 'index.html')]
    : decoded.endsWith('/')
      ? [join(distRoot, relativePath, 'index.html')]
      : extname(decoded)
        ? [join(distRoot, relativePath)]
        : [join(distRoot, relativePath, 'index.html'), join(distRoot, `${relativePath}.html`)];

  for (const candidate of candidates) {
    const absolute = resolve(candidate);
    if (!absolute.startsWith(`${distRoot}${sep}`)) continue;
    try {
      if ((await stat(absolute)).isFile()) return absolute;
    } catch {
      // Try the next clean-URL form.
    }
  }
  return undefined;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${host}:${port}`);
    const staticFile = await findStaticFile(url.pathname);
    const file = staticFile ?? join(distRoot, '404.html');
    const statusCode = staticFile ? 200 : 404;
    const headers = {
      ...securityHeaders,
      'Content-Type': contentTypes.get(extname(file)) ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    };

    response.writeHead(statusCode, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(error instanceof Error ? error.message : 'Bad request');
  }
});

server.listen(port, host, () => {
  process.stdout.write(`HydroRigor static preview: http://${host}:${port}\n`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
