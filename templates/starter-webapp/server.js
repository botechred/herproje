// server.js — Sıfır bağımlılıklı Node 24 Web + JSON API Sunucusu
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'data', 'store.json');

fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': MIME['.json'] });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/api/items' && req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return sendJson(res, 200, data);
  }

  if (url.pathname === '/api/items' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const incoming = JSON.parse(body || '{}');
        const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const entry = { id: Date.now().toString(36), text: String(incoming.text || '').trim(), createdAt: new Date().toISOString() };
        if (!entry.text) return sendJson(res, 400, { error: 'Boş kayıt eklenemez.' });
        list.unshift(entry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
        sendJson(res, 201, entry);
      } catch {
        sendJson(res, 400, { error: 'Geçersiz istek.' });
      }
    });
    return;
  }

  // Statik dosya sunumu
  const safePath = path.normalize(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bulunamadı');
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`{{PROJE}} çalışıyor -> http://localhost:${PORT}`);
});
