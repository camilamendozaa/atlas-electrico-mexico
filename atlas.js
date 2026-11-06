'use strict';
const HOME_PLANTS = [
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

const colors={Hidráulica:'#0077c8',Gas:'#ff8c00',Eólica:'#43a047',Geotérmica:'#9675ca',Carbón:'#57708d',Nuclear:'#20a3bb',Combustóleo:'#aa7448'};
const pins=document.getElementById('homePins');let current=null;

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

const homeNavigator=createMapNavigator('previewMap','homeMapTools',{focusWidth:465});
const ns='http://www.w3.org/2000/svg';
function selectPlant(p){document.getElementById('chosenPlant').textContent=p.name;document.getElementById('chosenPlantMeta').textContent=p.state+' · '+p.type+' · '+new Intl.NumberFormat('es-MX').format(p.mw)+' MW (2016)';document.querySelectorAll('.home-pin').forEach(x=>{const active=x.dataset.id===p.id;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});current=p.id;homeNavigator.focus((p.lon+118.3)*26,(33.3-p.lat)*26);}
function makeNode(tag,attrs={}){const x=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))x.setAttribute(k,v);return x;}
for(const p of HOME_PLANTS){const x=(p.lon+118.3)*26,y=(33.3-p.lat)*26;const g=makeNode('g',{class:'home-pin',transform:`translate(${x.toFixed(2)} ${y.toFixed(2)})`,role:'button',tabindex:'0','aria-pressed':'false','data-id':p.id,'aria-label':p.name+'; '+p.state});g.append(makeNode('circle',{class:'ring',r:'10'}));g.append(makeNode('circle',{class:'dot',r:'5.5',fill:colors[p.type]}));const t=makeNode('title');t.textContent=p.name+', '+p.state+' · '+p.mw+' MW (2016)';g.append(t);g.addEventListener('click',()=>selectPlant(p));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectPlant(p)}});pins.append(g)}
