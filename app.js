const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

let state = {
  suhu: 28.0,
  kelembapan: 60.0,
  relay: false,
  threshold: 30.0,
  history: []
};

setInterval(() => {
  let drift = state.relay ? -0.3 : 0.2;
  let noise = (Math.random() - 0.5) * 0.6;
  state.suhu = state.suhu + drift + noise;
  if (state.suhu < 20) state.suhu = 20;
  if (state.suhu > 40) state.suhu = 40;
  state.suhu = Math.round(state.suhu * 10) / 10;

  let humDrift = (Math.random() - 0.5) * 2;
  state.kelembapan += humDrift;
  if (state.kelembapan < 30) state.kelembapan = 30;
  if (state.kelembapan > 90) state.kelembapan = 90;
  state.kelembapan = Math.round(state.kelembapan * 10) / 10;

  if (state.suhu >= state.threshold) {
    state.relay = true;
  } else if (state.suhu <= state.threshold - 2) {
    state.relay = false;
  }

  state.history.push({ t: Date.now(), suhu: state.suhu, kelembapan: state.kelembapan, relay: state.relay });
  if (state.history.length > 40) state.history.shift();
}, 2000);

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json(state);
});

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
