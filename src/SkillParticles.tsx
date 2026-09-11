import {useEffect,useRef} from 'react';

// One flowing particle surface: network clusters and letterforms share coordinates.
export default function SkillParticles({words,paused}:{words:string[];paused:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),pause=useRef(paused);
 pause.current=paused;
 useEffect(()=>{
  const el=canvas.current,ctx=el?.getContext('2d');if(!el||!ctx)return;
  const mask=document.createElement('canvas'),ink=mask.getContext('2d');if(!ink)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let w=0,h=0,frame=0,last=0,time=0,drawn=false;
  let textBounds:DOMRect[]=[];
  const measure=()=>{textBounds=Array.from(document.querySelectorAll('.hero-name,.hero-copy,.case-copy,.case-block,.mission-node,.bio-note,.contact h2,.contact-note,.project-directory header')).map(e=>e.getBoundingClientRect()).filter(r=>r.bottom>0&&r.top<innerHeight)};
  const random=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
  const dust=Array.from({length:26000},(_,i)=>({u:random(i+1)*Math.PI*2,v:(random(i+23001)+random(i+33001)-1)*1.6,z:(random(i+43001)-.5)*2,a:.24+random(i+63001)*.46}));
  const letters=words.map(word=>{
   mask.width=600;mask.height=90;ink.font='600 54px Arial';ink.textAlign='center';ink.textBaseline='middle';ink.fillStyle='white';ink.fillText(word,300,45,580);
   const data=ink.getImageData(0,0,600,90).data,result:{x:number;y:number}[]=[];
   for(let y=0;y<90;y+=3)for(let x=0;x<600;x+=3)if(data[(y*600+x)*4+3]>100)result.push({x:(x-300)/600,y:(y-45)/600});
   return result;
  });
  const resize=()=>{w=innerWidth;h=innerHeight;drawn=false;measure();const dpr=Math.min(devicePixelRatio,1.5);el.width=w*dpr;el.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  // A gently turning, folded ribbon; every point and word uses this same surface.
  const surface=(u:number,v:number,z:number,t:number)=>{
   const angle=u+t*.045;
   return {x:w*(.5+.57*Math.cos(angle)) + v*w*.065*Math.sin(angle),y:h*(.49+.22*Math.sin(angle*2+t*.08)+.085*Math.sin(angle-t*.06))+v*h*.115+z*h*.025,depth:.65+.35*Math.sin(angle)};
  };
  const draw=(now:number)=>{
   if((pause.current||document.hidden)&&drawn){last=now;frame=requestAnimationFrame(draw);return;}
   if(last&&now-last<32){frame=requestAnimationFrame(draw);return;}
   const delta=last?Math.min(now-last,40):0;last=now;drawn=true;
   if(!pause.current&&!document.hidden&&!reduced.matches)time+=delta;
   const t=time/1000;ctx.clearRect(0,0,w,h);ctx.fillStyle='#0a0b0c';ctx.fillRect(0,0,w,h);
   const count=w<600?12000:dust.length;
   for(let i=0;i<count;i++){
    const p=dust[i],q=surface(p.u,p.v,p.z,t);ctx.fillStyle=`rgba(242,239,232,${p.a*q.depth})`;ctx.fillRect(q.x,q.y,w<600?.85:1.15,w<600?.85:1.15);
   }
   const anchors=Array.from({length:110},(_,i)=>surface(i/110*Math.PI*2,(random(i+890)-.5)*1.6,0,t));
   ctx.strokeStyle='rgba(236,240,237,.3)';ctx.lineWidth=.65;ctx.beginPath();
   anchors.forEach((p,i)=>{for(let step=1;step<=2;step++){const q=anchors[(i+step)%anchors.length];if(Math.hypot(p.x-q.x,p.y-q.y)<w*.22){ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y)}}});ctx.stroke();
   ctx.fillStyle='rgba(245,246,239,.78)';anchors.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,w<600?1.3:2,0,Math.PI*2);ctx.fill()});
   const groups=w<600?4:6;
   for(let g=0;g<groups;g++){
    const phase=t-g*.65,index=g%words.length;
    // Form once, then remain part of the circulating network.
    let blend=Math.max(0,Math.min(1,(phase-1.2)/2));
    blend=blend*blend*(3-2*blend);if(reduced.matches)blend=0;
    const u=g/groups*Math.PI*2+.26,center=surface(u,0,0,t),targets=letters[index];
    const width=Math.min(w<600?190:310,w*.42),slope=Math.max(-.2,Math.min(.2,Math.cos(u+t*.045)*.18));
    const obstructed=textBounds.some(r=>center.x+width/2>r.left&&center.x-width/2<r.right&&center.y+24>r.top&&center.y-24<r.bottom);
    ctx.globalAlpha=obstructed?.24:Math.max(.4,center.depth);
    const particles=Math.min(720,targets.length),positions:{x:number;y:number}[]=[];
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
   if(!reduced.matches)frame=requestAnimationFrame(draw);
  };
  const restart=()=>{cancelAnimationFrame(frame);last=0;frame=requestAnimationFrame(draw)};
  const onResize=()=>{resize();restart()};
  resize();restart();addEventListener('scroll',measure,{passive:true});addEventListener('resize',onResize);reduced.addEventListener('change',restart);
  return()=>{cancelAnimationFrame(frame);removeEventListener('resize',onResize);removeEventListener('scroll',measure);reduced.removeEventListener('change',restart)};
 },[words.join('|')]);
 return <canvas ref={canvas} className="skill-particles" aria-hidden="true"/>;
}
