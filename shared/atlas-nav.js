
'use strict';
window.addEventListener('DOMContentLoaded',()=>{
const entries=[['recursos','00 · Recursos'],['generacion','01 · Generación'],['transmision','02 · Transmisión'],['distribucion','03 · Distribución'],['sabias','04 · ¿Sabías que?']];
const current=location.pathname.split('/').filter(Boolean).slice(-2)[0]||'recursos';
const nav=document.createElement('nav');nav.className='atlas-crossbar';nav.setAttribute('aria-label','Navegación general del Atlas');
const back=document.createElement('a');back.href='../../index.html';back.textContent='← Inicio del Atlas';nav.append(back);
const right=document.createElement('div');right.className='atlas-cross-right';
const label=document.createElement('label');label.htmlFor='atlas-switch';label.textContent='Cambiar módulo';right.append(label);
const sel=document.createElement('select');sel.id='atlas-switch';sel.setAttribute('aria-label','Cambiar módulo del Atlas');
entries.forEach(([slug,name])=>{const opt=document.createElement('option');opt.value=slug;opt.textContent=name;opt.selected=slug===current;sel.append(opt)});
sel.addEventListener('change',()=>location.href='../'+sel.value+'/index.html');right.append(sel);
const i=entries.findIndex(([slug])=>slug===current);if(i>=0&&i<entries.length-1){const next=document.createElement('a');next.className='atlas-next';next.href='../'+entries[i+1][0]+'/index.html';next.textContent='Siguiente módulo →';right.append(next)}
nav.append(right);const header=document.querySelector('header');if(header)header.insertAdjacentElement('afterend',nav);else document.body.prepend(nav);
});
