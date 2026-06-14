const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// State suhu & sistem
let state = {
  suhu: 28.0,
  target: 28.0,
  relay: false,
  threshold: 30.0,
  history: []
};

// Simulasi suhu berubah random tiap 2 detik
setInterval(() => {
  // suhu naik kalau relay OFF, turun kalau relay ON (simulasi kipas/AC)
  let drift = state.relay ? -0.3 : 0.2;
  let noise = (Math.random() - 0.5) * 0.6;
  state.suhu = state.suhu + drift + noise;

  // batas wajar
  if (state.suhu < 20) state.suhu = 20;
  if (state.suhu > 40) state.suhu = 40;
  state.suhu = Math.round(state.suhu * 10) / 10;

  // logika kontrol otomatis
  if (state.suhu >= state.threshold) {
    state.relay = true;
  } else if (state.suhu <= state.threshold - 2) {
    state.relay = false;
  }

  // simpan history (max 30 data point)
  state.history.push({ t: Date.now(), suhu: state.suhu, relay: state.relay });
  if (state.history.length > 30) state.history.shift();
}, 2000);

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API buat data realtime
app.get('/api/status', (req, res) => {
  res.json(state);
});

// ubah threshold manual
app.post('/api/threshold', (req, res) => {
  const { threshold } = req.body;
  if (typeof threshold === 'number' && threshold > 20 && threshold < 40) {
    state.threshold = threshold;
  }
  res.json(state);
});

app.listen(PORT, () => {
  console.log(`IoT Suhu jalan di http://localhost:${PORT}`);
});
