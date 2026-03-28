const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const HOSTNAME = 'localhost';

// Tipos MIME comunes
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = `.${parsedUrl.pathname}`;
    
    // Default a index.html
    if (pathname === './') {
        pathname = './index.html';
    }

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Obtener la extensión del archivo
    const ext = path.parse(pathname).ext;

    // Leer el archivo del sistema de archivos
    fs.readFile(pathname, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Si el archivo no existe, intentar index.html
                fs.readFile('./index.html', (err, data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', mimeTypes['.html']);
                    res.end(data);
                });
            } else {
                // Error del servidor
                res.statusCode = 500;
                res.end(`Error del servidor: ${err}`);
            }
        } else {
            // Éxito
            res.statusCode = 200;
            res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
            res.end(data);
        }
    });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`════════════════════════════════════════`);
    console.log(`✅ Servidor iniciado correctamente`);
    console.log(`════════════════════════════════════════`);
    console.log(`🌐 URL: http://${HOSTNAME}:${PORT}`);
    console.log(`📂 Ruta: ${__dirname}`);
    console.log(`════════════════════════════════════════`);
    console.log(`👉 Abre tu navegador y ve a:`);
    console.log(`   http://localhost:8000`);
    console.log(`════════════════════════════════════════`);
    console.log(`Presiona CTRL+C para detener el servidor`);
    console.log(`════════════════════════════════════════`);
});