
const express=require('express');
const path=require('path');
const app=express();
const PORT=3001;

let state={
 suhu:28, kelembapan:60, relay:false, threshold:30,
 voltage:220, power:350, battery:95, wifi:-60, history:[]
};

setInterval(()=>{
 state.suhu=Math.max(20,Math.min(40, +(state.suhu+(Math.random()-0.4)).toFixed(1)));
 state.kelembapan=Math.max(30,Math.min(90, +(state.kelembapan+(Math.random()*2-1)).toFixed(1)));
 state.voltage=220+(Math.random()*4-2);
 state.power=300+Math.random()*100;
 state.wifi=-50-Math.random()*20;

 state.relay=state.suhu>=state.threshold;

 state.history.push({
   time:new Date().toLocaleTimeString(),
   suhu:state.suhu,
   kelembapan:state.kelembapan
 });

 if(state.history.length>50) state.history.shift();
},2000);

app.use(express.static(__dirname));
app.use(express.json());

app.get('/api/status',(req,res)=>res.json(state));

app.post('/api/threshold',(req,res)=>{
 state.threshold=req.body.threshold || state.threshold;
 res.json(state);
});

app.listen(PORT,()=>console.log("Dashboard running on :"+PORT));
