/* Atlas Identity Card — création Haizenchi */
(() => {
'use strict';
const APP_AUTHOR='Haizenchi';
const canvas=document.getElementById('card'); const ctx=canvas.getContext('2d');
const els={name:q('name'),race:q('race'),code:q('code'),discord:q('discord'),portrait:q('portrait'),zoom:q('zoom'),offsetX:q('offsetX'),offsetY:q('offsetY'),zoomOut:q('zoomOut'),xOut:q('xOut'),yOut:q('yOut'),portraitTools:q('portraitTools'),resolution:q('resolution'),status:q('status')};
const BASE_W=1600, BASE_H=1000; let portraitImg=null; let dragging=false, dragStart=null;
const C={paper:'#f6f5f1',paper2:'#ebeae5',navy:'#10233a',navy2:'#0a1728',cyan:'#18a7d4',gold:'#e3a72d',ink:'#10253d',muted:'#7d8b96',line:'#ccd4d8',white:'#ffffff',dark:'#0b1219'};
function q(id){return document.getElementById(id)}
function serialFragment(code){
 const groups=String(code||'').toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
 let fragment=groups.find((group,index)=>index>0&&group.length>=4)||groups.find(group=>group.length>=4)||groups.join('');
 fragment=fragment.replace(/[^A-Z0-9]/g,'').slice(0,4);
 return (fragment||'XXXX').padEnd(4,'X');
}
function buildSerial(code){return `AT-E01-CP-${serialFragment(code)}-16`;}
function rr(c,x,y,w,h,r){const m=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+m,y);c.arcTo(x+w,y,x+w,y+h,m);c.arcTo(x+w,y+h,x,y+h,m);c.arcTo(x,y+h,x,y,m);c.arcTo(x,y,x+w,y,m);c.closePath()}
function line(c,x1,y1,x2,y2,color,width=2){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke()}
function txt(c,text,x,y,size,color,weight='500',align='left',family='Segoe UI, Arial, sans-serif'){c.save();c.fillStyle=color;c.font=`${weight} ${size}px ${family}`;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(text,x,y);c.restore()}
function fitText(c,text,maxWidth,startSize,minSize,weight='700'){let s=startSize;for(;s>minSize;s--){c.font=`${weight} ${s}px Segoe UI, Arial, sans-serif`;if(c.measureText(text).width<=maxWidth)break}return s}
function hexPattern(c,x,y,w,h,step=18,alpha=.055){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.strokeStyle=`rgba(16,35,58,${alpha})`;c.lineWidth=1;const hh=step*.866;for(let row=-2;row<h/hh+2;row++){for(let col=-2;col<w/(step*1.5)+2;col++){const cx=x+col*step*1.5+(row%2?step*.75:0),cy=y+row*hh;const r=step*.5;c.beginPath();for(let i=0;i<6;i++){const a=Math.PI/3*i;const px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?c.lineTo(px,py):c.moveTo(px,py)}c.closePath();c.stroke()}}c.restore()}
function drawCompass(c,cx,cy,r){c.save();c.translate(cx,cy);c.strokeStyle=C.gold;c.lineWidth=2;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();c.strokeStyle=C.cyan;c.beginPath();c.arc(0,0,r*.72,0,Math.PI*2);c.stroke();for(let i=0;i<8;i++){const a=Math.PI/4*i;line(c,Math.cos(a)*r*.78,Math.sin(a)*r*.78,Math.cos(a)*r,Math.sin(a)*r,i%2?C.cyan:C.gold,2)}c.fillStyle=C.white;c.beginPath();c.moveTo(0,-r*.9);c.lineTo(r*.14,0);c.lineTo(0,r*.9);c.lineTo(-r*.14,0);c.closePath();c.fill();c.fillStyle=C.navy;c.beginPath();c.moveTo(0,-r*.72);c.lineTo(r*.08,0);c.lineTo(0,r*.18);c.lineTo(-r*.08,0);c.closePath();c.fill();c.restore()}
function drawAtlas(c,cx,cy,s){c.save();c.translate(cx,cy);c.strokeStyle=C.gold;c.lineWidth=s*.028;c.fillStyle=C.gold;c.beginPath();c.moveTo(0,-s*.48);c.lineTo(s*.32,-s*.02);c.lineTo(0,s*.48);c.lineTo(-s*.32,-s*.02);c.closePath();c.stroke();c.globalAlpha=.92;c.beginPath();c.moveTo(0,-s*.44);c.lineTo(s*.27,-s*.03);c.lineTo(0,-s*.14);c.closePath();c.fill();c.beginPath();c.moveTo(0,s*.44);c.lineTo(-s*.27,-s*.03);c.lineTo(0,s*.14);c.closePath();c.fill();c.globalAlpha=1;c.strokeStyle=C.gold;c.beginPath();c.ellipse(0,0,s*.22,s*.11,0,0,Math.PI*2);c.stroke();c.fillStyle=C.gold;c.beginPath();c.arc(0,0,s*.055,0,Math.PI*2);c.fill();c.restore()}
function iconPerson(c,x,y,s,color){c.save();c.strokeStyle=color;c.fillStyle='transparent';c.lineWidth=s*.08;c.beginPath();c.arc(x,y-s*.23,s*.16,0,Math.PI*2);c.stroke();rr(c,x-s*.26,y,s*.52,s*.34,s*.1);c.stroke();c.restore()}
function iconDNA(c,x,y,s,color){c.save();c.strokeStyle=color;c.lineWidth=s*.055;for(let side of [-1,1]){c.beginPath();for(let i=0;i<=24;i++){const t=i/24,a=t*Math.PI*2.2;const xx=x+Math.sin(a)*s*.14*side,yy=y-s*.35+t*s*.7;i?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}for(let i=0;i<5;i++){const yy=y-s*.28+i*s*.14;line(c,x-s*.12,yy,x+s*.12,yy,color,s*.035)}c.restore()}
function iconKey(c,x,y,s,color){c.save();c.strokeStyle=color;c.lineWidth=s*.065;c.beginPath();c.arc(x-s*.09,y-s*.05,s*.17,0,Math.PI*2);c.stroke();line(c,x+s*.04,y+s*.08,x+s*.28,y+s*.32,color,s*.065);line(c,x+s*.16,y+s*.2,x+s*.25,y+s*.11,color,s*.065);c.restore()}
function iconDiscord(c,x,y,s,color){c.save();c.fillStyle=color;rr(c,x-s*.33,y-s*.2,s*.66,s*.46,s*.16);c.fill();c.fillStyle=C.paper;c.beginPath();c.arc(x-s*.12,y,s*.045,0,Math.PI*2);c.arc(x+s*.12,y,s*.045,0,Math.PI*2);c.fill();c.strokeStyle=C.paper;c.lineWidth=s*.035;c.beginPath();c.arc(x,y+s*.02,s*.19,.15*Math.PI,.85*Math.PI);c.stroke();c.restore()}
function field(c,label,value,x,y,w,icon){txt(c,label.toUpperCase(),x+70,y+26,18,C.ink,'700');c.fillStyle='rgba(16,35,58,.055)';rr(c,x+66,y+45,w-66,75,5);c.fill();c.strokeStyle='rgba(24,167,212,.25)';c.lineWidth=1;line(c,x+66,y+120,x+w,y+120,'rgba(16,35,58,.25)',1);const fs=fitText(c,value||'—',w-100,37,22,'750');txt(c,value||'—',x+88,y+98,fs,C.navy,'750');icon(c,x+27,y+73,42,C.cyan)}
function drawPortrait(c){const x=115,y=257,w=390,h=460; c.save();rr(c,x,y,w,h,35);c.clip();c.fillStyle=C.navy2;c.fillRect(x,y,w,h);hexPattern(c,x,y,w,h,16,.13);for(let i=0;i<8;i++){c.strokeStyle=`rgba(24,167,212,${.12-i*.01})`;c.beginPath();c.arc(x+w*.52,y+h*.48,90+i*28,0,Math.PI*2);c.stroke()}
 if(portraitImg){const z=parseFloat(els.zoom.value);const offX=parseFloat(els.offsetX.value),offY=parseFloat(els.offsetY.value);const iw=portraitImg.naturalWidth,ih=portraitImg.naturalHeight;const base=Math.max(w/iw,h/ih);const sc=base*z;const dw=iw*sc,dh=ih*sc;const dx=x+(w-dw)/2+offX*w*.48,dy=y+(h-dh)/2+offY*h*.48;c.drawImage(portraitImg,dx,dy,dw,dh);c.fillStyle='rgba(3,20,33,.11)';c.fillRect(x,y,w,h)} else {c.fillStyle='rgba(24,167,212,.12)';c.beginPath();c.arc(x+w/2,y+175,74,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(x+w/2,y+395,130,150,0,Math.PI,Math.PI*2);c.fill();}
 c.restore();c.strokeStyle=C.cyan;c.lineWidth=3;rr(c,x,y,w,h,35);c.stroke();c.strokeStyle=C.gold;c.lineWidth=2;c.beginPath();c.arc(x+w/2,y+h/2,w*.55,-.65,.55);c.stroke();c.beginPath();c.arc(x+w/2,y+h/2,w*.55,2.45,3.65);c.stroke();txt(c,'PORTRAIT',x+w/2,y+h+28,15,C.cyan,'700','center');}
function render(target=canvas,W=BASE_W,H=BASE_H){const c=target.getContext('2d'); const sx=W/BASE_W,sy=H/BASE_H;c.save();c.setTransform(sx,0,0,sy,0,0);c.clearRect(0,0,BASE_W,BASE_H);
 c.fillStyle=C.dark;c.fillRect(0,0,BASE_W,BASE_H);c.fillStyle=C.paper;rr(c,45,45,1510,910,38);c.fill();hexPattern(c,45,45,1510,910,18,.045);
 // top right navy cut
 c.fillStyle=C.navy; c.beginPath();c.moveTo(1040,45);c.lineTo(1517,45);c.quadraticCurveTo(1555,45,1555,83);c.lineTo(1555,165);c.lineTo(1130,165);c.closePath();c.fill();c.fillStyle=C.gold;c.fillRect(45,177,1510,4);
 drawCompass(c,110,115,45);txt(c,'PASS INTERSTELLAIRE',160,142,62,C.navy,'800');txt(c,'IDENTIFICATION OFFICIELLE — VOYAGEUR / EXPLORATEUR',160,168,20,C.cyan,'600');txt(c,`SÉRIE ${buildSerial(els.code.value)}`,1460,105,18,C.gold,'700','right');
 drawPortrait(c);
 const fx=560,fw=495; field(c,'Nom',els.name.value.trim(),fx,252,fw,iconPerson);field(c,'Race',els.race.value.trim(),fx,397,fw,iconDNA);field(c,'Code',els.code.value.trim(),fx,542,fw,iconKey);field(c,'Discord',els.discord.value.trim(),fx,687,fw,iconDiscord);
 // right Atlas panel
 c.fillStyle=C.navy;rr(c,1110,220,350,515,26);c.fill();c.strokeStyle=C.cyan;c.lineWidth=2;rr(c,1125,235,320,485,22);c.stroke();txt(c,'AFFILIATION',1285,270,16,C.cyan,'700','center');for(let r of [105,135,165]){c.strokeStyle=`rgba(24,167,212,${r===105?.22:.12})`;c.beginPath();c.arc(1285,455,r,0,Math.PI*2);c.stroke()}drawAtlas(c,1285,445,310);txt(c,'ATLAS',1285,665,32,C.gold,'800','center');txt(c,'TRAVELLER VERIFIED',1285,695,13,C.cyan,'700','center');
 // bottom band
 c.fillStyle=C.navy;c.beginPath();c.moveTo(45,815);c.lineTo(235,815);c.lineTo(285,870);c.lineTo(920,870);c.lineTo(970,925);c.lineTo(45,925);c.closePath();c.fill();drawCompass(c,120,870,48);
 // footer tech marks
 for(let i=0;i<20;i++){c.fillStyle=i%5===0?C.gold:'rgba(16,35,58,.24)';c.fillRect(1030+i*19,900,10,3)}
 c.restore();}
function rerender(){render()}
['name','race','code','discord'].forEach(id=>els[id].addEventListener('input',rerender));
els.code.addEventListener('input',()=>{const p=els.code.selectionStart;els.code.value=els.code.value.toUpperCase();try{els.code.setSelectionRange(p,p)}catch(_){}});
[els.zoom,els.offsetX,els.offsetY].forEach(e=>e.addEventListener('input',()=>{syncSliderLabels();rerender()}));
function syncSliderLabels(){els.zoomOut.value=Number(els.zoom.value).toFixed(2)+'×';els.xOut.value=Math.round(Number(els.offsetX.value)*100)+'%';els.yOut.value=Math.round(Number(els.offsetY.value)*100)+'%'}
function setStatus(s){els.status.textContent=s;clearTimeout(setStatus.t);setStatus.t=setTimeout(()=>els.status.textContent='',3500)}
els.portrait.addEventListener('change',async ev=>{const f=ev.target.files?.[0];if(!f)return; if(f.size>15*1024*1024){setStatus('Image trop volumineuse (15 Mo max).');return}const data=await fileToDataURL(f);loadPortrait(data,true)});
function fileToDataURL(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
function loadPortrait(data,compress){const im=new Image();im.onload=async()=>{portraitImg=im;els.zoom.value=1;els.offsetX.value=0;els.offsetY.value=0;els.portraitTools.hidden=false;syncSliderLabels();render();};im.src=data}
q('removePortrait').addEventListener('click',()=>{portraitImg=null;els.portrait.value='';els.portraitTools.hidden=true;render()});
q('download').addEventListener('click',()=>{const w=Number(els.resolution.value),h=Math.round(w/1.6);const out=document.createElement('canvas');out.width=w;out.height=h;render(out,w,h);out.toBlob(blob=>{const a=document.createElement('a');const clean=(els.name.value||'atlas').trim().replace(/[^a-z0-9_-]+/gi,'-').replace(/^-|-$/g,'');a.download=`atlas-id-${clean||'traveller'}.png`;a.href=URL.createObjectURL(blob);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);setStatus(`PNG ${w} × ${h} exporté.`)},'image/png')});
q('reset').addEventListener('click',()=>{if(!confirm('Réinitialiser les informations et le portrait ?'))return;els.name.value='';els.race.value='';els.code.value='';els.discord.value='';portraitImg=null;els.portraitTools.hidden=true;els.portrait.value='';els.zoom.value=1;els.offsetX.value=0;els.offsetY.value=0;syncSliderLabels();render();setStatus('Carte réinitialisée.')} );
function initialise(){els.name.value='';els.race.value='';els.code.value='';els.discord.value='';portraitImg=null;els.portraitTools.hidden=true;els.portrait.value='';els.zoom.value=1;els.offsetX.value=0;els.offsetY.value=0;syncSliderLabels();render();}
// portrait drag / mousewheel
function portraitHit(ev){const r=canvas.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width*BASE_W,y=(ev.clientY-r.top)/r.height*BASE_H;return {hit:x>=115&&x<=505&&y>=285&&y<=745,x,y}}
canvas.addEventListener('pointerdown',ev=>{if(!portraitImg)return;const p=portraitHit(ev);if(!p.hit)return;dragging=true;dragStart={clientX:ev.clientX,clientY:ev.clientY,x:Number(els.offsetX.value),y:Number(els.offsetY.value)};canvas.setPointerCapture(ev.pointerId)});
canvas.addEventListener('pointermove',ev=>{if(!dragging)return;const r=canvas.getBoundingClientRect();const dx=(ev.clientX-dragStart.clientX)/(r.width*(390/BASE_W)),dy=(ev.clientY-dragStart.clientY)/(r.height*(460/BASE_H));els.offsetX.value=Math.max(-1,Math.min(1,dragStart.x+dx*2.08));els.offsetY.value=Math.max(-1,Math.min(1,dragStart.y+dy*2.08));syncSliderLabels();render()});
canvas.addEventListener('pointerup',()=>{dragging=false});canvas.addEventListener('pointercancel',()=>dragging=false);
canvas.addEventListener('wheel',ev=>{if(!portraitImg||!portraitHit(ev).hit)return;ev.preventDefault();els.zoom.value=Math.max(1,Math.min(3.5,Number(els.zoom.value)+(ev.deltaY<0?.08:-.08)));syncSliderLabels();rerender()},{passive:false});
initialise();
console.info(`Atlas Identity Card — signé par ${APP_AUTHOR}`);
})();
