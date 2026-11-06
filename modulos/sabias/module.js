
'use strict';
let activeFilter='Todos';let index=0;
const $=id=>document.getElementById(id);
function selection(){return ATLAS_FACTS.filter(f=>activeFilter==='Todos'||f[0]===activeFilter)}
function render(){const list=selection();index=(index+list.length)%list.length;const f=list[index];$('factCategory').textContent=f[0].toUpperCase();$('factCount').textContent=String(index+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');$('factTitle').textContent=f[1];$('factText').textContent=f[2];$('factSource').textContent=f[3];renderFactVisual();}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;index=0;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render()}));
$('prev').addEventListener('click',()=>{index--;render()});$('next').addEventListener('click',()=>{index++;render()});

// Comparaciones de fuentes existentes, sin atribuir porcentajes a universos distintos.
const FACT_VISUALS={
 'Recursos':{title:'Consumo de gas natural CFE · TJ',a:['2023',770020],b:['2024',782478],note:'Fuente: Informe Anual CFE 2024, PDF p. 29. Entrada energética primaria.'},
 'Generación':{title:'Generación bruta CFE · GWh',a:['2022',141343],b:['2024',154059],note:'Fuentes: Informes Anuales CFE 2023 y 2024. Total oficial, no suma de renglones.'},
 'Transmisión':{title:'Longitud de líneas CFE Transmisión · km',a:['2022',110449],b:['2024',111138],note:'Fuentes: Informes Anuales CFE 2022 y 2024. No son km-circuito.'},
 'Distribución':{title:'Red de media tensión CFE · km',a:['2023',551465],b:['2024',555336],note:'Fuentes: CFE PAM RGD 2024–2038 y 2025–2039, tabla III.1.'}
};
function renderFactVisual(){const v=FACT_VISUALS[selection()[index][0]];const target=$('visualBars');const max=Math.max(v.a[1],v.b[1]);$('visualTitle').textContent=v.title;$('visualNote').textContent=v.note;target.setAttribute('aria-label',`${v.a[0]}: ${v.a[1]}; ${v.b[0]}: ${v.b[1]}. ${v.title}`);target.replaceChildren();for(const item of [v.a,v.b]){const row=document.createElement('div');row.className='vf-row';const year=document.createElement('span');year.textContent=item[0];const track=document.createElement('div');track.className='vf-track';const fill=document.createElement('div');fill.className='vf-fill';fill.style.width=100*item[1]/max+'%';track.append(fill);const value=document.createElement('strong');value.textContent=new Intl.NumberFormat('es-MX').format(item[1]);row.append(year,track,value);target.append(row);}}

render();
