import http from 'http';
import { createReadStream, statSync, existsSync } from 'fs';
import { extname, join, resolve, normalize } from 'path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5177;
const ROOT = resolve(process.cwd());

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function safePath(p) {
  const full = resolve(join(ROOT, p));
  if (!full.startsWith(ROOT)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const full = safePath(normalize(pathname.replace(/^\//, '')));
  if (!full || !existsSync(full)) {
    res.writeHead(404).end('Not Found');
    return;
  }
  try {
    const stat = statSync(full);
    if (stat.isDirectory()) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    const type = MIME[extname(full).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    createReadStream(full).pipe(res);
  } catch (e) {
    res.writeHead(500).end('Server Error');
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Static server listening on http://localhost:${PORT}`);
});

