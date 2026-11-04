import {useEffect,useRef} from 'react';

// One flowing particle surface: network clusters and letterforms share coordinates.
export default function SkillParticles({words,paused}:{words:string[];paused:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),pause=useRef(paused),refresh=useRef<()=>void>(()=>{});
 pause.current=paused;
 useEffect(()=>{
  const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx)return;
  const mask=document.createElement('canvas'),ink=mask.getContext('2d');if(!ink)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let w=0,h=0,frame=0,last=0,time=0,inView=true,originX=0,originY=0;
  let boundsDirty=true,lastMeasure=-Infinity,boundsTimer=0;
  let textBounds:DOMRect[]=[];
  const visibleText=new Set<Element>();
  const measure=()=>{textBounds=Array.from(visibleText).map(e=>e.getBoundingClientRect()).filter(r=>r.bottom>originY&&r.top<originY+h).map(r=>new DOMRect(r.left-originX,r.top-originY,r.width,r.height));boundsDirty=false};
  const random=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
  const dust=Array.from({length:26000},(_,i)=>({u:random(i+1)*Math.PI*2,v:(random(i+23001)+random(i+33001)-1)*1.6,z:(random(i+43001)-.5)*2,a:.24+random(i+63001)*.46}));
  const letters=words.map(word=>{
   mask.width=600;mask.height=90;ink.font='600 54px Arial';ink.textAlign='center';ink.textBaseline='middle';ink.fillStyle='white';ink.fillText(word,300,45,580);
   const data=ink.getImageData(0,0,600,90).data,result:{x:number;y:number}[]=[];
   for(let y=0;y<90;y+=3)for(let x=0;x<600;x+=3)if(data[(y*600+x)*4+3]>100)result.push({x:(x-300)/600,y:(y-45)/600});
   return result;
  });
  const resize=()=>{const rect=el.getBoundingClientRect();w=rect.width;h=rect.height;originX=rect.left;originY=rect.top;boundsDirty=true;if(!w||!h)return;const dpr=Math.min(devicePixelRatio,w<600?1.25:1.5);el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)};
  // A gently turning, folded ribbon; every point and word uses this same surface.
  const surface=(u:number,v:number,z:number,t:number)=>{
   const angle=u+t*.045;
   return {x:w*(.5+.57*Math.cos(angle)) + v*w*.065*Math.sin(angle),y:h*(.49+.22*Math.sin(angle*2+t*.08)+.085*Math.sin(angle-t*.06))+v*h*.115+z*h*.025,depth:.65+.35*Math.sin(angle)};
  };
  const draw=(now:number)=>{
   frame=0;
   if(document.hidden||!inView||!w||!h){last=0;return;}
   const moving=!pause.current&&!reduced.matches;
   if(moving&&last&&now-last<32){frame=requestAnimationFrame(draw);return;}
   const delta=last?Math.min(now-last,40):0;last=now;
   if(boundsDirty&&now-lastMeasure>=120){measure();lastMeasure=now;}
   if(moving)time+=delta;
   const t=time/1000;ctx.clearRect(0,0,w,h);ctx.fillStyle='#0a0b0c';ctx.fillRect(0,0,w,h);
   const count=w<600?6000:w<1000?14000:dust.length;
   for(let i=0;i<count;i++){
    const p=dust[i],q=surface(p.u,p.v,p.z,t);ctx.fillStyle=`rgba(242,239,232,${p.a*q.depth})`;ctx.fillRect(q.x,q.y,w<600?.85:1.15,w<600?.85:1.15);
   }
   const anchorCount=w<600?70:110;
   const anchors=Array.from({length:anchorCount},(_,i)=>surface(i/anchorCount*Math.PI*2,(random(i+890)-.5)*1.6,0,t));
   ctx.strokeStyle='rgba(236,240,237,.3)';ctx.lineWidth=.65;ctx.beginPath();
   anchors.forEach((p,i)=>{for(let step=1;step<=2;step++){const q=anchors[(i+step)%anchors.length];if(Math.hypot(p.x-q.x,p.y-q.y)<w*.22){ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y)}}});ctx.stroke();
   ctx.fillStyle='rgba(245,246,239,.78)';anchors.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,w<600?1.3:2,0,Math.PI*2);ctx.fill()});
   const groups=words.length?(w<600?4:6):0;
   for(let g=0;g<groups;g++){
    const phase=t-g*.65,index=g%words.length;
    // Form once, then remain part of the circulating network.
    let blend=Math.max(0,Math.min(1,(phase-1.2)/2));
    blend=blend*blend*(3-2*blend);if(reduced.matches)blend=1;
    const u=g/groups*Math.PI*2+.26,center=surface(u,0,0,t),targets=letters[index];
    const width=Math.min(w<600?190:310,w*.42),slope=Math.max(-.2,Math.min(.2,Math.cos(u+t*.045)*.18));
    const obstructed=textBounds.some(r=>center.x+width/2>r.left&&center.x-width/2<r.right&&center.y+24>r.top&&center.y-24<r.bottom);
    ctx.globalAlpha=(obstructed?.24:Math.max(.4,center.depth))*(1-.75*Math.min(1,window.scrollY/Math.max(1,h)));
    const particles=Math.min(w<600?420:720,targets.length),positions:{x:number;y:number}[]=[];
    for(let j=0;j<particles;j++){
     const target=targets[Math.floor(j*targets.length/particles)];
     const drift=surface(u+(random(j+g*700)-.5)*.55,(random(j+g*900+300)-.5)*1.6,0,t);
     const tx=center.x+target.x*width,ty=center.y+target.y*width+target.x*width*slope;
     positions.push({x:drift.x+(tx-drift.x)*blend,y:drift.y+(ty-drift.y)*blend});
    }
    ctx.fillStyle=`rgba(235,239,232,${.23+blend*.4})`;
    positions.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,blend>.8?.85:.7,0,Math.PI*2);ctx.fill()});
    // The word remains tethered to its neighbours as it travels around the loop.
    const a=anchors[Math.floor(g/groups*anchors.length)],b=anchors[(Math.floor(g/groups*anchors.length)+7)%anchors.length];
    ctx.strokeStyle='rgba(240,243,236,.36)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(center.x-width*.42*blend,center.y);ctx.moveTo(center.x+width*.42*blend,center.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    ctx.globalAlpha=1;
    if(g===0){el.dataset.skill=words[index];el.dataset.phase=blend===1?'formed':blend===0?'network':'morphing'}
   }
   el.dataset.ready='true';
   if(moving)frame=requestAnimationFrame(draw);
  };
  const restart=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden&&inView&&w&&h)frame=requestAnimationFrame(draw)};
  // Scroll only invalidates the cached, visible text bounds. Layout is measured at
  // most every 120 ms instead of querying every text block on every scroll event.
  const dirtyBounds=()=>{boundsDirty=true;if(boundsTimer)return;boundsTimer=window.setTimeout(()=>{boundsTimer=0;if(boundsDirty&&!frame&&!document.hidden&&inView){measure();lastMeasure=performance.now();restart()}},120)};
  const textObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visibleText.add(entry.target);else visibleText.delete(entry.target)});dirtyBounds()},{rootMargin:'100px'});
  const observeText=()=>{textObserver.disconnect();visibleText.clear();document.querySelectorAll('.hero-name,.hero-copy,.case-copy,.case-block,.mission-node,.bio-note,.contact h2,.contact-note,.project-directory header').forEach(node=>textObserver.observe(node));dirtyBounds()};
  const contentObserver=new MutationObserver(observeText);
  contentObserver.observe(document.body,{childList:true,subtree:true});
  const sizeObserver=new ResizeObserver(()=>{resize();restart()});sizeObserver.observe(el);
  const visibilityObserver=new IntersectionObserver(entries=>{inView=entries.some(entry=>entry.isIntersecting);restart()});visibilityObserver.observe(el);
  refresh.current=restart;
  observeText();resize();restart();addEventListener('scroll',dirtyBounds,{passive:true});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
  return()=>{refresh.current=()=>{};cancelAnimationFrame(frame);clearTimeout(boundsTimer);sizeObserver.disconnect();visibilityObserver.disconnect();textObserver.disconnect();contentObserver.disconnect();removeEventListener('scroll',dirtyBounds);document.removeEventListener('visibilitychange',restart);reduced.removeEventListener('change',restart)};
 },[words.join('|')]);
 useEffect(()=>{refresh.current()},[paused]);
 return <canvas ref={canvas} className="skill-particles" aria-hidden="true"/>;
}
