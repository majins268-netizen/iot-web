const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware untuk serving file statis
app.use(express.static(__dirname));

// Route utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║   🔥 IoTherm Pro Dashboard Aktif!        ║
    ╠══════════════════════════════════════════╣
    ║   🌐 http://localhost:${PORT}              ║
    ║   📡 Smart Temperature Control           ║
    ║   🎨 Mode: Cool / Heat / Auto            ║
    ╚══════════════════════════════════════════╝
    `);
});