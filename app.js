
const express=require('express');
const app=express();
app.use(express.static(__dirname));

let state={temp:28.5,hum:61.2,power:342,volt:220,wifi:-58,threshold:30,history:[]};

setInterval(()=>{
 state.temp=+(state.temp+(Math.random()-0.45)).toFixed(1);
 state.hum=+(state.hum+(Math.random()*2-1)).toFixed(1);
 state.power=Math.round(300+Math.random()*120);
 state.volt=+(220+(Math.random()*4-2)).toFixed(1);
 state.wifi=Math.round(-50-Math.random()*15);
 state.history.push({t:new Date().toLocaleTimeString(),temp:state.temp,hum:state.hum});
 if(state.history.length>24) state.history.shift();
},2000);

app.get('/api/status',(req,res)=>res.json(state));
app.listen(3001,()=>console.log('Running on 3001'));
