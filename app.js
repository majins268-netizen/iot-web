const express = require('express');
const app = express();
app.use(express.static(__dirname));

let state = { 
    temp: 28.5, 
    hum: 61.2, 
    power: 342, 
    volt: 220, 
    wifi: -58, 
    ping: 12, // Metrik tambahan: Latensi Jaringan
    history: [] 
};

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
    
    if (state.history.length > 20) state.history.shift(); // Menyimpan 20 data terakhir
}, 2000);

app.get('/api/status', (req, res) => res.json(state));
app.listen(3001, () => console.log('Enterprise Dashboard running on http://localhost:3001'));
