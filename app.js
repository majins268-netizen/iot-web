const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware untuk serving file statis
app.use(express.static(__dirname));

// Data state untuk telemetry
let state = { 
    temp: 28.5, 
    hum: 61.2, 
    power: 342, 
    volt: 220, 
    wifi: -58, 
    ping: 12,
    history: [] 
};

// Simulasi update data setiap 2 detik
setInterval(() => {
    state.temp = +(state.temp + (Math.random() - 0.45)).toFixed(1);
    state.hum = +(state.hum + (Math.random() * 2 - 1)).toFixed(1);
    state.power = Math.round(300 + Math.random() * 120);
    state.volt = +(220 + (Math.random() * 4 - 2)).toFixed(1);
    state.wifi = Math.round(-50 - Math.random() * 15);
    state.ping = Math.round(10 + Math.random() * 25);
    
    // Format waktu presisi
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour12: false });
    state.history.push({ t: timeStr, temp: state.temp, hum: state.hum, ping: state.ping });
    
    if (state.history.length > 20) state.history.shift();
}, 2000);

// API endpoint
app.get('/api/status', (req, res) => res.json(state));

// Route utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║   📊 Enterprise Telemetry Dashboard     ║
    ╠══════════════════════════════════════════╣
    ║   🌐 http://localhost:${PORT}              ║
    ║   📡 Real-time data setiap 2 detik       ║
    ╚══════════════════════════════════════════╝
    `);
});