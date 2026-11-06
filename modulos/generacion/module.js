'use strict';
/* SOLVIX | Etapa 5 — Generación eléctrica. Geografía histórica de referencia (2016), NO inventario 2024. */
const PLANTS = [
  ['MEX0001856','Aguamilpa Solidaridad','Nayarit','Hidráulica',960,21.8395,-104.8038],
  ['MEX0001859','Alfredo Elías Ayub (La Yesca)','Nayarit','Hidráulica',750,21.1979,-104.1047],
  ['MEX0001858','Leonardo Rodríguez Alcaine (El Cajón)','Nayarit','Hidráulica',750,21.4279,-104.4507],
  ['MEX0001857','Belisario Domínguez (Angostura)','Chiapas','Hidráulica',900,16.4018,-92.7784],
  ['MEX0001853','Manuel Moreno Torres (Chicoasén)','Chiapas','Hidráulica',2400,16.9428,-93.1012],
  ['MEX0001768','Carbón II','Coahuila','Carbón',1400,28.4682,-100.7003],
  ['MEX0001794','Altamira II','Tamaulipas','Gas',495,22.4978,-97.9017],
  ['MEX0001773','Altamira V','Tamaulipas','Gas',1121,22.4997,-97.9053],
  ['MEX0001868','Cerro Prieto','Baja California','Geotérmica',570,32.3916,-115.2252],
  ['MEX0001784','Chihuahua II (El Encino)','Chihuahua','Gas',619.4,28.4461,-105.9200],
  ['MEX0006620','La Venta','Oaxaca','Eólica',84.2,16.5803,-94.8237],
  ['MEX0001866','Eurus','Oaxaca','Eólica',250.5,16.4853,-94.9484],
  ['MEX0001769','Laguna Verde','Veracruz','Nuclear',1510,19.7208,-96.4064],
  ['MEX0006615','Las Tres Vírgenes','Baja California Sur','Geotérmica',10,27.5061,-112.5591],
  ['MEX0001783','Puerto Libertad','Sonora','Combustóleo',632,29.9068,-112.6930]
].map(([id,name,state,type,mw,lat,lon])=>({id,name,state,type,mw,lat,lon}));
const GENERATION = {
  'Ciclo combinado':[50392,58234,61490],
  'Vapor convencional':[17657,29336,28135],
  'Hidroeléctrica':[34110,19568,22354],
  'Carbón':[15186,15307,14012],
  'Nucleoeléctrica':[10850,12386,12307],
  'Turbogás':[7332,8168,8379],
  'Geotérmica':[4543,4321,3692],
  'Diésel':[1157,2657,2851],
  'Solar fotovoltaica':[7,274,555],
  'Turbojet':[38,124,209],
  'Eólica':[70,86,75]
};
const TOTALS={'2022':141343,'2023':150462,'2024':154059};
const YEARS=[2022,2023,2024];
const CLEAN=['Hidroeléctrica','Nucleoeléctrica','Geotérmica','Eólica','Solar fotovoltaica'];
const GROUP_COLOR={Hidráulica:'#1875c3', Gas:'#ff8c00', Eólica:'#43a047', Geotérmica:'#9675ca', Carbón:'#667b8b', Nuclear:'#20a3bb', Combustóleo:'#9e6c43'};

/* Vista interactiva: las coordenadas provienen de los registros históricos, no de una geometría inventada. */
function createMapNavigator(svgId, controlsId, options={}) {
  const map=document.getElementById(svgId), root=document.getElementById(controlsId);
  const BASE={x:0,y:0,w:910,h:540};
  let view={...BASE};
  let reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  function setView(cx,cy,w,animate=true) {
    w=clamp(w,285,BASE.w);
    const h=w*BASE.h/BASE.w;
    const x=clamp(cx-w/2,0,BASE.w-w), y=clamp(cy-h/2,0,BASE.h-h);
    const next={x,y,w,h};
    if(reduced||!animate||!window.requestAnimationFrame){view=next;map.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);return;}
    const prev={...view},begin=performance.now();
    if(map._viewFrame)cancelAnimationFrame(map._viewFrame);
    function tick(time){const t=clamp((time-begin)/320,0,1),ease=1-(1-t)**3;
      const cur={};for(const key of ['x','y','w','h'])cur[key]=prev[key]+(next[key]-prev[key])*ease;
      map.setAttribute('viewBox',`${cur.x} ${cur.y} ${cur.w} ${cur.h}`);
      if(t<1)map._viewFrame=requestAnimationFrame(tick);else{view=next;map._viewFrame=null;}
    }
    view=next;map._viewFrame=requestAnimationFrame(tick);
  }
  function center(){return {x:view.x+view.w/2,y:view.y+view.h/2};}
  function focus(x,y){setView(x,y,options.focusWidth||475);}
  function zoom(mult){const c=center();setView(c.x,c.y,view.w*mult);}
  function reset(){setView(BASE.w/2,BASE.h/2,BASE.w);}
  root.querySelector('[data-map-zoom="in"]').addEventListener('click',()=>zoom(.72));
  root.querySelector('[data-map-zoom="out"]').addEventListener('click',()=>zoom(1/.72));
  root.querySelector('[data-map-zoom="reset"]').addEventListener('click',reset);
  // No map-wheel takeover: scrolling the page remains effortless on mobile and desktop.
  return {focus,zoom,reset,getView:()=>({...view})};
}

const $=id=>document.getElementById(id);
const fmt=n=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:1}).format(n);
let activeType='Todos', query='', selectedId=PLANTS[0].id;
let generationNavigator;
function groupName(type){return ['Hidráulica','Gas','Eólica','Geotérmica'].includes(type)?type:'Otras';}
function matches(p){return (activeType==='Todos'||groupName(p.type)===activeType)&&(`${p.name} ${p.state} ${p.type}`).toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(query);}
function projected(p){
  // Equirectangular mapping matching the static Natural Earth Mexico outline.
  return {x:(p.lon+118.3)*26,y:(33.3-p.lat)*26};
}
function svgEl(tag, attrs={}) {const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs))e.setAttribute(key,value);return e;}
function choose(id,focus=true){const p=PLANTS.find(x=>x.id===id);if(!p)return;selectedId=id;
  $('plantName').textContent=p.name;$('plantLocation').textContent=p.state+' · México';$('plantType').textContent=p.type;
  $('plantType').style.color=GROUP_COLOR[p.type];$('plantPower').textContent=fmt(p.mw);
  $('plantCoords').textContent=`${p.lat.toFixed(4)}, ${p.lon.toFixed(4)}`;$('plantId').textContent=p.id;
  if(focus && generationNavigator){const point=projected(p);generationNavigator.focus(point.x,point.y);}
  for(const e of document.querySelectorAll('[data-plant-id]')){
    const active=e.dataset.plantId===id;e.classList.toggle('active',active);
    if(e.tagName.toLowerCase()==='button') e.setAttribute('aria-pressed',String(active));
    else {e.setAttribute('aria-label',`${PLANTS.find(p=>p.id===e.dataset.plantId)?.name||''}${active?' — seleccionada':''}`);e.setAttribute('aria-pressed',String(active));}
  }
}
function drawMap(){const visible=PLANTS.filter(matches);const pins=$('mapPins'),list=$('plantList');pins.replaceChildren();list.replaceChildren();
  $('mapCount').textContent=`${visible.length} ${visible.length===1?'punto':'puntos'}`;
  $('listCount').textContent=`${visible.length} ${visible.length===1?'resultado':'resultados'}`;
  if(!visible.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='No hay centrales con esos filtros. Prueba otro término o restablece la selección.';list.append(empty);return;}
  // Render pins with selection on top; positions are taken from historical coordinates.
  for(const p of [...visible].sort((a,b)=>Number(a.id===selectedId)-Number(b.id===selectedId))){
    const xy=projected(p),g=svgEl('g',{class:'pin',transform:`translate(${xy.x.toFixed(2)} ${xy.y.toFixed(2)})`,tabindex:'0',role:'button','aria-pressed':'false','data-plant-id':p.id,'aria-label':p.name});
    g.append(svgEl('circle',{class:'pin-ring',r:'10'}),svgEl('circle',{class:'pin-core',r:'5.5',fill:GROUP_COLOR[p.type]}));
    const title=svgEl('title');title.textContent=`${p.name}, ${p.state} · ${fmt(p.mw)} MW (2016)`;g.append(title);
    g.addEventListener('click',()=>choose(p.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(p.id);}});pins.append(g);
  }
  for(const p of visible){const button=document.createElement('button');button.type='button';button.className='plant-item';button.dataset.plantId=p.id;button.setAttribute('aria-pressed',String(selectedId===p.id));
    const dot=document.createElement('i');dot.className='small-dot';dot.style.background=GROUP_COLOR[p.type];dot.setAttribute('aria-hidden','true');
    const title=document.createElement('span');title.textContent=p.name;const cap=document.createElement('small');cap.textContent=`${fmt(p.mw)} MW`;
    button.append(dot,title,cap);button.addEventListener('click',()=>choose(p.id));list.append(button);
  }
  choose(visible.some(p=>p.id===selectedId)?selectedId:visible[0].id,!!generationNavigator && generationReady);
}
function renderBars(year){const ix=YEARS.indexOf(+year),data=Object.entries(GENERATION).map(([name,values])=>({name,value:values[ix]})).sort((a,b)=>b.value-a.value);const max=data[0].value;
  $('barSub').textContent=`Producción bruta · GWh · ${year}`;const el=$('barChart');el.replaceChildren();
  el.setAttribute('aria-label',`Generación bruta CFE ${year}: ${data.map(d=>`${d.name} ${fmt(d.value)} GWh`).join('; ')}`);
  for(const row of data){const container=document.createElement('div');container.className='bar-row';const lab=document.createElement('span');lab.className='bar-label';lab.textContent=row.name;lab.title=row.name;
    const track=document.createElement('div');track.className='track';const bar=document.createElement('div');bar.className='barfill'+(row.value===max?' highlight':'');bar.style.width=`${(row.value/max*100).toFixed(2)}%`;track.append(bar);
    const value=document.createElement('span');value.className='bar-value';value.textContent=fmt(row.value);container.append(lab,track,value);el.append(container);
  }
}
function renderKpis(year){const ix=YEARS.indexOf(+year),entry=Object.entries(GENERATION).sort((a,b)=>b[1][ix]-a[1][ix])[0];$('kpiTotal').innerHTML=`${fmt(TOTALS[year])} <small>GWh</small>`;
  $('kpiLeader').textContent=entry[0];$('kpiLeaderValue').textContent=`${fmt(entry[1][ix])} GWh`;
  const clean=CLEAN.reduce((sum,n)=>sum+GENERATION[n][ix],0);
  const percent=year==='2024'?38982.9/154059*100:clean/TOTALS[year]*100;
  $('kpiClean').innerHTML=`${new Intl.NumberFormat('es-MX',{minimumFractionDigits:1,maximumFractionDigits:1}).format(percent)}<small>%</small>`;
  $('kpiClean').parentElement.querySelector('p').textContent=year==='2024'?'Dato CFE 2024; participación sobre generación bruta':'Estimación propia a partir de renglones redondeados';
}
function renderTrend(){const a=$('compareA').value,b=$('compareB').value,va=GENERATION[a],vb=GENERATION[b],max=Math.max(...va,...vb)*1.12;
  $('legendA').textContent=a;$('legendB').textContent=b;const area=$('trendChart');area.replaceChildren();const svg=svgEl('svg',{viewBox:'0 0 500 260',role:'img','aria-label':`${a}: ${va.map((v,i)=>`${YEARS[i]} ${fmt(v)} GWh`).join(', ')}. ${b}: ${vb.map((v,i)=>`${YEARS[i]} ${fmt(v)} GWh`).join(', ')}.`});
  const x=i=>64+i*190,y=v=>215-v/max*175;
  for(let i=0;i<5;i++){let val=max*i/4, yy=y(val);svg.append(svgEl('line',{x1:58,y1:yy,x2:460,y2:yy,stroke:'#dce7f1','stroke-width':'1'}));const txt=svgEl('text',{x:51,y:yy+4,'text-anchor':'end',fill:'#5f7891','font-size':11});txt.textContent=fmt(Math.round(val));svg.append(txt);}
  YEARS.forEach((yr,i)=>{const t=svgEl('text',{x:x(i),y:239,'text-anchor':'middle',fill:'#56708a','font-size':'12','font-weight':'700'});t.textContent=yr;svg.append(t);});
  [[va,'#0077c8'],[vb,'#ff8c00']].forEach(([values,color])=>{let pts=values.map((v,i)=>`${x(i)},${y(v).toFixed(1)}`).join(' ');svg.append(svgEl('polyline',{points:pts,fill:'none',stroke:color,'stroke-width':'3.2','stroke-linecap':'round','stroke-linejoin':'round'}));values.forEach((v,i)=>{const dot=svgEl('circle',{cx:x(i),cy:y(v),r:5.5,fill:color,stroke:'#fff','stroke-width':2});const title=svgEl('title');title.textContent=`${YEARS[i]}: ${fmt(v)} GWh`;dot.append(title);svg.append(dot);});});area.append(svg);
}
let generationReady=false;
function init(){
  generationNavigator=createMapNavigator('mexicoMap','generationMapTools',{focusWidth:440});
  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{activeType=btn.dataset.type;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});drawMap();}));
  $('search').addEventListener('input',e=>{query=e.target.value.toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();drawMap();});
  $('resetBtn').addEventListener('click',()=>{query='';activeType='Todos';$('search').value='';document.querySelectorAll('.filter').forEach(b=>{const on=b.dataset.type==='Todos';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});drawMap();});
  for(const [i,n] of Object.keys(GENERATION).entries()){for(const s of [$('compareA'),$('compareB')]){const o=document.createElement('option');o.value=n;o.textContent=n;s.append(o);}}
  $('compareA').value='Ciclo combinado';$('compareB').value='Hidroeléctrica';
  $('compareA').addEventListener('change',renderTrend);$('compareB').addEventListener('change',renderTrend);
  $('yearSelect').addEventListener('change',e=>{renderKpis(e.target.value);renderBars(e.target.value);});
  drawMap();generationReady=true;renderKpis('2024');renderBars('2024');renderTrend();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
