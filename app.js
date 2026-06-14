
const express=require('express');
const path=require('path');
const app=express();

let state={suhu:28,hum:60,volt:220,power:340,wifi:-55,threshold:30,history:[]};

setInterval(()=>{
 state.suhu=+(state.suhu+(Math.random()-0.4)).toFixed(1);
 state.hum=+(state.hum+(Math.random()*2-1)).toFixed(1);
 state.volt=220+(Math.random()*4-2);
 state.power=300+Math.random()*100;
 state.wifi=-50-Math.random()*15;
 state.history.push({t:new Date().toLocaleTimeString(),s:state.suhu,h:state.hum});
 if(state.history.length>40) state.history.shift();
},2000);

app.use(express.static(__dirname));
app.get('/api/status',(req,res)=>res.json(state));

app.listen(3001,()=>console.log('Running on 3001'));
