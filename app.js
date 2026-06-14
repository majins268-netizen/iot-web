
const express=require('express');
const app=express();
app.use(express.static(__dirname));
app.use(express.json());

let state={suhu:28,kelembapan:60,threshold:30,voltage:220,power:320,wifi:-58,history:[]};

setInterval(()=>{
 state.suhu=+(Math.max(20,Math.min(40,state.suhu+(Math.random()-0.4)))).toFixed(1);
 state.kelembapan=+(Math.max(30,Math.min(90,state.kelembapan+(Math.random()*2-1)))).toFixed(1);
 state.voltage=220+(Math.random()*6-3);
 state.power=280+Math.random()*120;
 state.wifi=-50-Math.random()*20;
 state.history.push({t:new Date().toLocaleTimeString(),s:state.suhu,h:state.kelembapan});
 if(state.history.length>30) state.history.shift();
},2000);

app.get('/api/status',(req,res)=>res.json(state));
app.post('/api/threshold',(req,res)=>{state.threshold=req.body.threshold||state.threshold;res.json(state);});
app.listen(3001,()=>console.log('Running 3001'));
