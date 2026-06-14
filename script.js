
const chart=new Chart(document.getElementById('chart'),{
type:'line',
data:{labels:[],datasets:[
{label:'Suhu',data:[]},
{label:'Humidity',data:[]}
]}
});

async function load(){
const r=await fetch('/api/status');
const d=await r.json();
suhu.innerText=d.s+'°C'||d.suhu+'°C';
hum.innerText=d.h+'%'||d.hum+'%';
volt.innerText=d.volt.toFixed(1)+'V';
power.innerText=d.power.toFixed(0)+'W';

chart.data.labels=d.history.map(x=>x.t);
chart.data.datasets[0].data=d.history.map(x=>x.s);
chart.data.datasets[1].data=d.history.map(x=>x.h);
chart.update();
}
load();
setInterval(load,2000);
