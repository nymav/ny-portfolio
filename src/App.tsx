import { flushSync } from 'react-dom';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
const DraxWorld=React.lazy(()=>import('./VisualWorlds').then(m=>({default:m.DraxWorld})));
import './styles.css';
import SkillParticles from './SkillParticles';
import {projectEvidence} from './projectEvidence';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id:string; n:string; name:string; kicker:string; accent:string; ink?:string;
  stack:string[]; desc:string; problem:string; approach:string; result:string;
  flow:{label:string; sub?:string; kind?:'input'|'service'|'model'|'store'|'output'}[];
};

const projects:Project[] = [
  {id:'drax',n:'01',name:'DRAX TBS',kicker:'LOCAL KNOWLEDGE SYSTEM',accent:'#9DFF4B',ink:'#11100e',stack:['FASTAPI','CHROMADB','SENTENCE TRANSFORMERS','LM STUDIO','PYTHON'],desc:'A local retrieval-augmented system that turns documents into grounded answers without shipping the knowledge base to a hosted model.',problem:'Private documents needed useful retrieval and local inference without collapsing into a single opaque prompt.',approach:'Separate ingestion, embedding, vector retrieval and local generation into inspectable services with explicit boundaries.',result:'A modular local RAG architecture that can be reasoned about, swapped and extended without changing the entire application.',flow:[{label:'DOCUMENTS',kind:'input'},{label:'FASTAPI',sub:'orchestration',kind:'service'},{label:'EMBEDDINGS',sub:'sentence transformer',kind:'model'},{label:'CHROMADB',sub:'vector store',kind:'store'},{label:'LOCAL LLM',sub:'LM Studio',kind:'model'},{label:'ANSWER',sub:'grounded output',kind:'output'}]},
  {id:'dachat',n:'02',name:'DACHAT',kicker:'LOCAL AI INTERFACE',accent:'#3155FF',stack:['STREAMLIT','LOCAL LLM','PYTHON'],desc:'A Streamlit interface for exploring CSV data with local AI responses and property-price predictions.',problem:'Local models are useful only when the interaction loop is fast enough to test prompts, responses and context behavior.',approach:'Wrap local inference in a simple conversational surface that keeps the model loop inspectable and iteration-friendly.',result:'A compact interface for testing local conversations without depending on a remote chat product.',flow:[{label:'PROMPT',kind:'input'},{label:'STREAMLIT',kind:'service'},{label:'LOCAL MODEL',kind:'model'},{label:'STATE',sub:'conversation context',kind:'store'},{label:'RESPONSE',kind:'output'}]},
  {id:'emotion',n:'03',name:'EMOTION MATRIX',kicker:'VISION STUDY',accent:'#FF725F',stack:['VGG','RESNET','DENSENET','TENSORFLOW','KERAS','SMOTE'],desc:'A comparative deep-learning study for facial emotion classification under class imbalance.',problem:'Emotion classes were unevenly represented, making raw accuracy an incomplete signal and architecture comparison less reliable.',approach:'Train multiple CNN families and handle imbalance explicitly, then compare behavior rather than treating one network as a default winner.',result:'A structured comparison across VGG, ResNet and DenseNet families with imbalance-aware preprocessing.',flow:[{label:'IMAGES',kind:'input'},{label:'BALANCING',sub:'SMOTE / sampling',kind:'service'},{label:'CNN FAMILY',sub:'VGG · ResNet · DenseNet',kind:'model'},{label:'EVALUATION',kind:'service'},{label:'EMOTION',kind:'output'}]},
  {id:'causal',n:'04',name:'CAUSAL MED',kicker:'CAUSAL INFERENCE',accent:'#7A2942',stack:['DOWHY','ECONML','SHAP','PYTHON'],desc:'A causal-inference workflow for estimating and interpreting treatment effects in healthcare-style data.',problem:'Prediction alone cannot answer what changes when a treatment changes; confounding and assumptions have to be represented explicitly.',approach:'Express causal assumptions, estimate treatment effects with modern causal estimators and add interpretation around heterogeneous effects.',result:'A workflow that separates prediction from causal questions and makes assumptions part of the engineering surface.',flow:[{label:'OBSERVATIONAL DATA',kind:'input'},{label:'CAUSAL GRAPH',sub:'assumptions',kind:'service'},{label:'ESTIMATOR',sub:'DoWhy / EconML',kind:'model'},{label:'EFFECT',kind:'output'},{label:'SHAP',sub:'interpretation',kind:'service'}]},
  {id:'ddos',n:'05',name:'DDOS SENTINEL',kicker:'NETWORK DEFENSE',accent:'#FF7A00',stack:['ADABOOST','NAIVE BAYES','PYQT','PYTHON'],desc:'A desktop ML system for classifying suspicious traffic patterns and surfacing potential DDoS activity.',problem:'Traffic classification requires turning noisy packet-level signals into features that a lightweight model can classify quickly.',approach:'Engineer traffic features, compare ensemble and probabilistic classifiers, then surface the result through a monitoring interface.',result:'An end-to-end prototype connecting traffic features, classification and operator-facing alerts.',flow:[{label:'TRAFFIC',kind:'input'},{label:'FEATURES',kind:'service'},{label:'CLASSIFIER',sub:'AdaBoost / NB',kind:'model'},{label:'MONITOR',sub:'PyQt',kind:'service'},{label:'ALERT',kind:'output'}]},
  {id:'market',n:'06',name:'MARKET SIGNAL',kicker:'DECISION MODEL',accent:'#2D8B66',stack:['XGBOOST','SVM','RANDOM FOREST','PYTHON','SHAP (PLANNED)'],desc:'A classification study predicting term-deposit subscriptions from bank marketing campaign data.',problem:'A response score is less useful when stakeholders cannot see which signals push a prediction in either direction.',approach:'Compare logistic regression, SVM, Random Forest, XGBoost, and a neural network. Inspect class balance and feature relationships before evaluating predictions.',result:'A documented model comparison with evaluation outputs. SHAP explanations remain a planned extension.',flow:[{label:'CUSTOMER DATA',kind:'input'},{label:'FEATURE PIPELINE',kind:'service'},{label:'XGBOOST / SVM',kind:'model'},{label:'SHAP',sub:'planned extension',kind:'service'},{label:'RESPONSE SCORE',kind:'output'}]},
  {id:'apple',n:'07',name:'APPLE SEQUENCE',kicker:'TIME SERIES',accent:'#B44E53',stack:['LSTM','PYTHON','TIME SERIES'],desc:'A recurrent time-series experiment focused on sequence-to-forecast behavior.',problem:'Sequential data carries temporal dependence that a flat feature table does not represent naturally.',approach:'Transform observations into ordered windows and use an LSTM to learn a forecasting function over those sequences.',result:'A compact sequence-modeling study centered on temporal representation and forecast behavior.',flow:[{label:'HISTORY',kind:'input'},{label:'WINDOWS',kind:'service'},{label:'LSTM',kind:'model'},{label:'FORECAST',kind:'output'}]},
  {id:'airspace',n:'08',name:'AIRSPACE MAPREDUCE',kicker:'DISTRIBUTED DATA',accent:'#3579B9',stack:['MAPREDUCE','HADOOP','OOZIE','JAVA'],desc:'A distributed workflow for processing large flight datasets through map, shuffle and reduce stages.',problem:'Large flight records become cumbersome when every transformation assumes one local process and one memory space.',approach:'Express the workload as independent map operations, keyed redistribution and reductions that can scale across partitions.',result:'A distributed-processing pipeline that makes the movement and aggregation of flight data explicit.',flow:[{label:'FLIGHT DATA',kind:'input'},{label:'MAP',kind:'service'},{label:'SHUFFLE',kind:'service'},{label:'REDUCE',kind:'service'},{label:'OUTPUT',kind:'output'}]},
];

const missions = [
 {year:'2026—NOW',x:18,y:18,company:'WARREN & CARTER',role:'AI ENGINEER',brief:'Models meet tools, retrieval, multimodal inputs and review paths.',tags:['AGENTIC WORKFLOWS','RAG','MULTIMODAL','TOOL ROUTING','FASTAPI','VALIDATION']},
 {year:'2025—2026',x:52,y:52,company:'TUBMAN TECHNOLOGIES',role:'DATA ANALYST',brief:'Noisy healthcare and financial data becomes reliable analytical and AI-ready material.',tags:['ETL','PYTHON','SQL','RAG DATA PREP','POWER BI','TABLEAU']},
 {year:'2022—2023',x:79,y:22,company:'SYMNN',role:'DATA ANALYST',brief:'Telecom utilization becomes time-series and capacity intelligence.',tags:['TELECOM DATA','TIME SERIES','PREDICTIVE MODELING','VALIDATION']},
 {year:'2023—2024',x:85,y:70,company:'NJIT',role:'M.S. DATA SCIENCE',brief:'Deep learning, reinforcement learning, AI, machine learning and statistics.',tags:['DEEP LEARNING','REINFORCEMENT LEARNING','AI','ML','STATISTICS']},
];

function useLenis(){
 const instance=useRef<Lenis|null>(null);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let lenis:Lenis|undefined;
  const sync=()=>{lenis?.destroy();lenis=undefined;instance.current=null;if(!media.matches){lenis=new Lenis({smoothWheel:true,lerp:.075,autoRaf:true,anchors:true});instance.current=lenis;lenis.on('scroll',ScrollTrigger.update)}};
  sync();media.addEventListener('change',sync);
  return()=>{media.removeEventListener('change',sync);lenis?.destroy()};
 },[]);
 return instance;
}

class SoundEngine {
  ctx:AudioContext|null=null; master:GainNode|null=null; ambient:OscillatorNode|null=null;
  async start(){if(this.ctx){if(this.ctx.state==='suspended')await this.ctx.resume();return;} const AC=window.AudioContext || (window as any).webkitAudioContext; if(!AC)return; this.ctx=new AC(); this.master=this.ctx.createGain(); this.master.gain.value=.11; this.master.connect(this.ctx.destination); this.ambient=this.ctx.createOscillator(); const g=this.ctx.createGain(); this.ambient.type='sine'; this.ambient.frequency.value=74; g.gain.value=.12; this.ambient.connect(g); g.connect(this.master); this.ambient.start(); if(this.ctx.state==='suspended') await this.ctx.resume();}
  stop(){void this.ctx?.suspend();}
  tone(freq=180,duration=.09,type:OscillatorType='sine',gain=.12){if(!this.ctx||!this.master)return; const o=this.ctx.createOscillator(), g=this.ctx.createGain(); o.type=type;o.frequency.setValueAtTime(freq,this.ctx.currentTime);g.gain.setValueAtTime(gain,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+duration);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+duration)}
  click(){this.tone(520,.045,'triangle',.07)}
  impact(){if(!this.ctx||!this.master)return; const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.setValueAtTime(110,this.ctx.currentTime);o.frequency.exponentialRampToValueAtTime(42,this.ctx.currentTime+.35);g.gain.setValueAtTime(.17,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.38);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.4)}
  sweep(){if(!this.ctx||!this.master)return; const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.setValueAtTime(180,this.ctx.currentTime);o.frequency.exponentialRampToValueAtTime(680,this.ctx.currentTime+.22);g.gain.setValueAtTime(.07,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.24);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.25)}
}
const soundEngine=new SoundEngine();

export default function App(){
 const lenis=useLenis();
 const [active,setActive]=useState(0), [indexOpen,setIndexOpen]=useState(false);
 const sound=false;
 useEffect(()=>{soundEngine.stop()},[]);
 const [impact,setImpact]=useState('');
 const impactTimer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
 useEffect(()=>()=>clearTimeout(impactTimer.current),[]);
 const project=projects[active];
 useEffect(()=>{
  const navigate=(event:MouseEvent)=>{
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
   if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const hash=link.getAttribute('href')!;
   const target=document.getElementById(hash.slice(1));if(!target)return;
   event.preventDefault();event.stopPropagation();
   flushSync(()=>setIndexOpen(false));
   requestAnimationFrame(()=>{
    window.scrollTo({left:0,top:window.scrollY,behavior:'instant'});
    const career=hash==='#work'?ScrollTrigger.getById('career-journey'):undefined;
    const destination=career?career.start:target.getBoundingClientRect().top+window.scrollY;
    lenis.current?.resize();
    if(lenis.current)lenis.current.scrollTo(destination,{immediate:true,force:true});
    else window.scrollTo({top:destination,behavior:'instant'});
    ScrollTrigger.update();
    if(career)career.getTween()?.progress(1);
    requestAnimationFrame(()=>{
     ScrollTrigger.refresh();
     ScrollTrigger.update();
     ScrollTrigger.getAll().forEach(trigger=>{
      if(trigger.vars.scrub){trigger.getTween()?.progress(1);trigger.animation?.progress(trigger.progress);}
     });
    });
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    history.replaceState(null,'',hash);
   });
  };
  document.addEventListener('click',navigate,true);
  return()=>document.removeEventListener('click',navigate,true);
 },[lenis]);
 const triggerImpact=useCallback((word:string)=>{clearTimeout(impactTimer.current);setImpact(word);impactTimer.current=setTimeout(()=>setImpact(''),520);if(sound)soundEngine.impact()},[sound]);
 const chooseProject=useCallback((i:number)=>{
   flushSync(()=>setActive(i));
   window.dispatchEvent(new CustomEvent('neural-select',{detail:i}));
   if(sound)soundEngine.sweep();
   triggerImpact(projects[i].name.split(' ')[0]);
   const target=document.getElementById('case-study');
   if(target){
     ScrollTrigger.refresh();
     lenis.current?.resize();
     if(lenis.current)lenis.current.scrollTo(target,{immediate:true,force:true});
     else target.scrollIntoView({behavior:'instant'});
     target.focus({preventScroll:true});
     history.replaceState(null,'','#case-study');
   }
 },[sound,triggerImpact,lenis]);

 useEffect(()=>{
  const mm=gsap.matchMedia();
  let disposed=false;
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)',()=>{
    gsap.to('.hero-rule',{scaleX:1.3,transformOrigin:'left center',ease:'none',scrollTrigger:{trigger:'.hero',start:'45% top',end:'bottom top',scrub:1}});
    const world=document.querySelector<HTMLElement>('.career-map');
    const viewport=document.querySelector<HTMLElement>('.career-wrap');
    let cleanCareer=()=>{};
    if(world && viewport){
      const stops=Array.from(world.querySelectorAll<HTMLElement>('.career-map-title, .mission-node, .career-open'));
      // Frame each stop using its actual dimensions, including wrapped text.
      const frame=(el:HTMLElement)=>{
        const scale=Math.min(1,(viewport.clientWidth-100)/el.offsetWidth,(viewport.clientHeight-140)/el.offsetHeight);
        const isExperience=el.classList.contains('mission-node');
        const x=isExperience?viewport.clientWidth*.16-el.offsetLeft*scale:viewport.clientWidth/2-(el.offsetLeft+el.offsetWidth/2)*scale;
        const y=isExperience?Math.max(100,(viewport.clientHeight-el.offsetHeight*scale)/2)-el.offsetTop*scale:viewport.clientHeight/2-(el.offsetTop+el.offsetHeight/2)*scale;
        return {x,y,scale};
      };
      const updateRoute=()=>{
        const svg=world.querySelector<SVGSVGElement>('.career-route');
        const path=svg?.querySelector('path');
        if(!svg || !path)return;
        svg.setAttribute('viewBox',`0 0 ${world.offsetWidth} ${world.offsetHeight}`);
        // Route through the date markers, keeping bends outside the text columns.
        const points=stops.map(el=>({x:el.offsetLeft-16,y:el.offsetTop+8}));
        path.setAttribute('d',points.map((p,i)=>{
          if(!i)return `M${p.x} ${p.y}`;
          const prev=points[i-1],gutter=Math.min(prev.x,p.x)-64;
          return `L${gutter} ${prev.y} L${gutter} ${p.y} L${p.x} ${p.y}`;
        }).join(' '));
        const ns='http://www.w3.org/2000/svg';
        let mask=svg.querySelector('mask');
        if(!mask){mask=document.createElementNS(ns,'mask');mask.id='career-text-clearance';mask.setAttribute('maskUnits','userSpaceOnUse');svg.prepend(mask);}
        mask.setAttribute('x','0');mask.setAttribute('y','0');mask.setAttribute('width',String(world.offsetWidth));mask.setAttribute('height',String(world.offsetHeight));
        mask.replaceChildren();
        const base=document.createElementNS(ns,'rect');base.setAttribute('width','100%');base.setAttribute('height','100%');base.setAttribute('fill','white');mask.append(base);
        stops.forEach(el=>{const rect=document.createElementNS(ns,'rect');rect.setAttribute('x',String(el.offsetLeft-6));rect.setAttribute('y',String(el.offsetTop-20));rect.setAttribute('width',String(el.offsetWidth+30));rect.setAttribute('height',String(el.offsetHeight+40));rect.setAttribute('fill','black');mask.append(rect)});
        path.setAttribute('mask','url(#career-text-clearance)');
      };
      updateRoute();
      const timeline=gsap.timeline({scrollTrigger:{id:'career-journey',trigger:viewport,start:'top top',end:()=>`+=${Math.max(2400,viewport.clientHeight*3.25)}`,pin:true,scrub:.8,invalidateOnRefresh:true,onRefreshInit:updateRoute,onUpdate:self=>{const step=Math.max(0,Math.min(3,Math.round((self.progress*7.6-.35)/1.45)-1));viewport.querySelectorAll('.career-stops button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===step&&self.progress>.1)))}}});
      timeline.set(world,{x:()=>frame(stops[0]).x,y:()=>frame(stops[0]).y,scale:()=>frame(stops[0]).scale});
      timeline.addLabel('career-intro');
      timeline.to(world,{duration:.35});
      stops.slice(1).forEach((el,index)=>{
        timeline.to(world,{x:()=>frame(el).x,y:()=>frame(el).y,scale:()=>frame(el).scale,duration:1,ease:'power1.inOut'});
        timeline.addLabel(`career-stop-${index}`);
        timeline.to(world,{duration:.45});
      });
      document.fonts.ready.then(()=>{if(!disposed)ScrollTrigger.refresh()});
      const selectStop=(event:Event)=>{
        const trigger=timeline.scrollTrigger;if(!trigger)return;
        const index=(event as CustomEvent<number>).detail;
        const destination=trigger.labelToScroll(`career-stop-${index}`);
        if(lenis.current)lenis.current.scrollTo(destination,{immediate:true,force:true});else window.scrollTo(0,destination);
        ScrollTrigger.update();trigger.getTween()?.progress(1);
      };
      window.addEventListener('career-select',selectStop);
      cleanCareer=()=>window.removeEventListener('career-select',selectStop);
    }
    gsap.utils.toArray<HTMLElement>('.morph-title').forEach(el=>gsap.fromTo(el,{fontVariationSettings:'"wght" 380',scaleX:.82},{fontVariationSettings:'"wght" 760',scaleX:1,scrollTrigger:{trigger:el,start:'top 90%',end:'top 35%',scrub:1}}));
    return cleanCareer;
  });
  mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)',()=>{
    gsap.utils.toArray<HTMLElement>('.mission-node').forEach((el,i)=>gsap.from(el,{x:i%2?45:-45,opacity:0,duration:.7,scrollTrigger:{trigger:el,start:'top 82%'}}));
  });
  mm.add('(prefers-reduced-motion: no-preference)',()=>{gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.fromTo(el,{y:38,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}}));});
  return()=>{disposed=true;mm.revert()};
 },[]);
 return <main>
   <CinematicFilm/>
   <a className="skip-link" href="#systems">Skip to projects</a>
   <MinimalNav onIndex={()=>setIndexOpen(true)}/>
   <ImpactFrame word={impact}/>
   <Hero/>
   <Biography/>
   <MorphBridge from="MODELS" to="OPERATIONS" tone="ink"/>
   <Career/>
   <MorphBridge from="OPERATIONS" to="SYSTEMS" tone="paper"/>
   <ProjectDirectory active={active} setActive={chooseProject}/>
   <ProjectScene project={project} next={()=>chooseProject((active+1)%projects.length)} sound={sound}/>
   <Contact/>
   {indexOpen&&<IndexOverlay onClose={()=>setIndexOpen(false)}/>} 
 </main>
}

function MinimalNav({onIndex}:{onIndex:()=>void}){
 const [section,setSection]=useState('IDENTITY');
 useEffect(()=>{let af=0;const update=()=>{cancelAnimationFrame(af);af=requestAnimationFrame(()=>{const sections=[['identity','IDENTITY'],['work','EXPERIENCE'],['systems','PROJECTS'],['case-study','CASE STUDY'],['contact','CONTACT']];let current='IDENTITY';for(const [id,label] of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=innerHeight*.42)current=label}setSection(current)})};update();addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(af);removeEventListener('scroll',update)}},[]);
 return <div className="chrome"><button className="progress-glyph" onClick={onIndex} aria-label="Open quick index"><span>NY</span><i/><span>INDEX</span></button><span className="current-section">{section}</span></div>
}
function ImpactFrame({word}:{word:string}){return <div className={`impact-frame ${word?'show':''}`} aria-hidden="true"><strong>{word}</strong></div>}

function Hero(){return <section className="hero" id="identity"><div className="hero-stage"><h1 className="hero-name">Nikhil <i>Yarra</i></h1><i className="hero-rule"/><p className="hero-copy">BUILDING SYSTEMS BETWEEN<br/>MODELS, DATA, TOOLS & PEOPLE.</p><a className="hero-cta" href="#systems">Explore my work <span aria-hidden="true">↗</span></a></div><div className="hero-bottom"><span>AGENTIC AI</span><span>RETRIEVAL</span><span>MULTIMODAL</span><span>APPLIED ML</span></div></section>}

function Biography(){return <section className="bio-flow"><div className="bio-manifesto"><div className="morph-title reveal">I BUILD</div><div className="serif reveal">systems that connect</div><div className="morph-title reveal">MODELS TO REALITY.</div></div><div className="discipline-run">{['AGENTS','RETRIEVAL','VISION','EVALUATION','DATA','DEPLOYMENT'].map((x,i)=><span key={x}><b>{String(i+1).padStart(2,'0')}</b>{x}</span>)}</div><p className="bio-note reveal">My work lives between model behavior and the surrounding system: retrieval, tools, APIs, data pipelines, evaluation, fallbacks and human review. The model is one component—not the product.</p></section>}

function MorphBridge({from,to,tone}:{from:string;to:string;tone:'ink'|'paper'}){return <section className={`morph-bridge ${tone}`} aria-hidden="true"><div className="bridge-line">{from}</div><div className="bridge-cut"/><div className="bridge-line ghost">{to}</div></section>}

function Career(){return <section className="career-wrap" id="work"><nav className="career-stops" aria-label="Experience stops">{missions.map((m,i)=><button key={m.company} onClick={()=>window.dispatchEvent(new CustomEvent('career-select',{detail:i}))}>{m.company}</button>)}</nav><div className="career-map"><svg className="career-route" viewBox="0 0 1600 900" preserveAspectRatio="none"><path d="M130 180 C 390 140, 470 520, 760 520 S 1120 140, 1450 250 S 1320 720, 1540 700"/></svg><div className="career-map-title"><span>FORMATION / OPERATIONS</span><h2>THE WORK<br/><i>became terrain.</i></h2></div>{missions.map((m,i)=><article className={`mission-node m${i}`} style={{left:`${m.x}%`,top:`${m.y}%`}} key={m.company}><div className="coord">{m.year}</div><h3>{m.company}</h3><div className="role">{m.role}</div><p>{m.brief}</p><div className="mission-tags">{m.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}<div className="career-open">NEXT COORDINATE<br/><i>unwritten.</i></div></div></section>}

function RollingStrip({label,items,onSelect,active}:{label:string;items:string[];onSelect?:(i:number)=>void;active?:number}){
 const viewport=useRef<HTMLDivElement>(null),hovered=useRef(false),focused=useRef(false);
 const drag=useRef<{x:number;scroll:number}|null>(null),dragged=useRef(false);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  const el=viewport.current;if(!el)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,position=el.scrollLeft;
  const tick=(time:number)=>{
   const dt=last?Math.min(time-last,50):0;last=time;
   if(!paused&&!hovered.current&&!focused.current&&!media.matches&&!document.hidden){
    const width=el.firstElementChild?.getBoundingClientRect().width||0;
    position+=dt*.025;
    if(width&&position>=width)position-=width;
    el.scrollLeft=position;
   }else position=el.scrollLeft;
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[paused]);
 return <div className={`rolling-strip ${onSelect?'project-reel':''}`} aria-label={label}>
  <div className="rolling-heading"><span className="rolling-label">{label}</span><button className="rolling-toggle" aria-label={`${paused?'Play':'Pause'} ${label.toLowerCase()} strip`} aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?'PLAY ↗':'PAUSE Ⅱ'}</button></div>
  <div className="rolling-window" ref={viewport} tabIndex={0} role="region" aria-label={`${label}: scroll horizontally to explore`} onPointerDown={e=>{if(e.pointerType==='mouse'&&e.button===0){drag.current={x:e.clientX,scroll:e.currentTarget.scrollLeft};dragged.current=false}}} onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current.x;if(Math.abs(dx)>6){dragged.current=true;e.currentTarget.setPointerCapture(e.pointerId);e.currentTarget.scrollLeft=drag.current.scroll-dx}}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}} onClickCapture={e=>{if(dragged.current){e.preventDefault();e.stopPropagation();dragged.current=false}}} onMouseEnter={()=>hovered.current=true} onMouseLeave={()=>hovered.current=false} onTouchStart={()=>setPaused(true)} onFocusCapture={()=>focused.current=true} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))focused.current=false}}>
   {[0,1].map(copy=><div className="rolling-group" key={copy} aria-hidden={copy===1?true:undefined}>{items.map((item,i)=>onSelect?<button key={item} tabIndex={copy===1?-1:0} aria-label={`Explore ${item} case study`} aria-controls="case-study" aria-pressed={active===i} onClick={()=>onSelect(i)}><small>{String(i+1).padStart(2,'0')}</small><strong>{item}</strong><em>{projects[i]?.kicker}</em><b aria-hidden="true">↗</b></button>:<span key={item}>{item}<b aria-hidden="true">✳</b></span>)}</div>)}
  </div>
 </div>
}
function ProjectDirectory({active,setActive}:{active:number;setActive:(n:number)=>void}){return <section className="project-directory" id="systems"><header><span>SYSTEM DIRECTORY / 08</span><h2 className="morph-title">SELECT<br/><i>a world.</i></h2></header><RollingStrip label="PROJECTS" items={projects.map(p=>p.name)} onSelect={setActive} active={active}/><p className="reel-hint">Select a project to see the problem, implementation, and outcome. Drag the strip, or use Tab and Enter.</p><details className="project-index-disclosure" onToggle={()=>requestAnimationFrame(()=>ScrollTrigger.refresh())}><summary>View all 8 projects <span aria-hidden="true">↘</span></summary><div className="project-list project-field">{projects.map((p,i)=><button key={p.id} style={{'--project-accent':p.accent} as React.CSSProperties} aria-label={`Open ${p.name} case study`} aria-pressed={i===active} aria-controls="case-study" className={i===active?'active':''} onClick={()=>setActive(i)}><span>{p.n}</span><strong>{p.name}</strong><em>{p.kicker}</em><span className="project-open" aria-hidden="true">↗</span></button>)}</div></details></section>}

function ProjectScene({project,next,sound}:{project:Project;next:()=>void;sound:boolean}){const evidence=projectEvidence[project.id];return <section id="case-study" tabIndex={-1} aria-label={`${project.name} case study`} className={`project-scene scene-${project.id}`} style={{'--accent':project.accent} as React.CSSProperties}><div className="project-opening"><ProjectVisual project={project}/><div className="case-copy"><span className="case-index">{project.n} / 08 · {project.kicker}</span><a className="back-to-systems" href="#systems">← ALL SYSTEMS</a><h2>{project.name}</h2><p className="case-lead">{project.desc}</p>{evidence&&<div className="project-proof-links"><a href={evidence.url} target="_blank" rel="noreferrer">View source ↗</a>{evidence.artifact&&<a href={evidence.artifact} target="_blank" rel="noreferrer">View results ↗</a>}</div>}<a className="case-jump" href="#implementation">Explore the implementation ↓</a></div></div><div className="case-grid" id="implementation"><CaseBlock label="PROBLEM" text={project.problem}/><CaseBlock label="IMPLEMENTATION" text={project.approach}/><CaseBlock label="OUTCOME" text={project.result}/></div>{evidence&&<div className="project-evidence"><CaseBlock label="IMPLEMENTATION SCOPE" text={evidence.scope}/><div className="case-block"><span>IN THE REPOSITORY</span><p>{evidence.fact}</p><a href={evidence.url+'#readme'} target="_blank" rel="noreferrer">Read the project documentation ↗</a></div></div>}<p className="visual-note">System illustration · {project.kicker.toLowerCase()}</p><ArchitectureDiagram flow={project.flow} accent={project.accent}/><div className="stack-strip" aria-label="Tools and frameworks">{project.stack.map(s=><span key={s}>{s}</span>)}</div><button className="next-world" onClick={()=>{if(sound)soundEngine.click();next()}}><span>NEXT WORLD</span><strong>{projects[(projects.findIndex(p=>p.id===project.id)+1)%projects.length].name}</strong></button></section>}
function CaseBlock({label,text}:{label:string;text:string}){return <div className="case-block"><span>{label}</span><p>{text}</p></div>}

function DeferredDrax(){
 const ref=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect()}},{rootMargin:'300px'});observer.observe(el);return()=>observer.disconnect()},[]);
 const fallback=<div className="world-visual drax-visual"><div className="visual-caption"><b>SEMANTIC SPACE</b><span>documents → retrieval → grounded answer</span></div></div>;
 return <div ref={ref} className="deferred-world">{visible?<React.Suspense fallback={fallback}><DraxWorld/></React.Suspense>:fallback}</div>
}
function ProjectVisual({project}:{project:Project}){switch(project.id){case'drax':return <DeferredDrax/>;case'dachat':return <DaChatWorld/>;case'emotion':return <EmotionWorld/>;case'causal':return <CausalWorld/>;case'ddos':return <DDoSWorld/>;case'market':return <MarketWorld/>;case'apple':return <SequenceWorld/>;default:return <AirspaceWorld/>}}

function DaChatWorld(){return <div className="world-visual chat-visual"><svg viewBox="0 0 1000 600"><path className="chat-path" d="M100 410 C240 130 330 510 470 260 S700 160 900 340"/>{[[130,390],[260,230],[400,360],[530,230],[690,210],[830,330]].map((p,i)=><g key={i}><circle cx={p[0]} cy={p[1]} r={i%2?34:18}/><text x={p[0]+40} y={p[1]+5}>{i%2?'MODEL':'USER'} / 0{i+1}</text></g>)}</svg><div className="big-word">CONTEXT</div></div>}
function EmotionWorld(){return <div className="world-visual emotion-visual"><div className="conv-grid">{Array.from({length:64},(_,i)=><i key={i} style={{opacity:.08+(i%7)*.035,animationDelay:`${-(i%11)*.12}s`}}/>)}</div><div className="layer-stack"><span>VGG</span><span>RESNET</span><span>DENSENET</span></div><div className="big-word">FEATURES</div></div>}
function CausalWorld(){return <div className="world-visual causal-visual"><svg viewBox="0 0 1000 620"><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z"/></marker></defs>{[['X',170,310],['T',430,160],['Y',760,300],['U',430,450]].map(([t,x,y])=><g key={String(t)}><circle cx={Number(x)} cy={Number(y)} r="58"/><text x={Number(x)} y={Number(y)+10}>{t}</text></g>)}<path d="M225 285 L375 185 M485 180 L705 275 M230 335 L700 315 M450 395 L450 220 M485 430 L715 330"/></svg><div className="causal-note">ASSUMPTIONS ARE PART OF THE SYSTEM.</div></div>}
function DDoSWorld(){return <div className="world-visual ddos-visual"><div className="packet-field">{Array.from({length:48},(_,i)=><i key={i} style={{left:`${(i*23)%100}%`,top:`${(i*47)%100}%`,animationDelay:`${-(i%9)*.17}s`}}/> )}</div><div className="defense-line"/><div className="threat-label">TRAFFIC / CLASSIFY / ALERT</div></div>}
function MarketWorld(){const bars=[-46,28,-19,61,34,-38,52,-24,18,-57];return <div className="world-visual market-visual"><div className="shap-axis"/>{bars.map((v,i)=><div className={`shap-bar ${v<0?'neg':'pos'}`} key={i} style={{'--v':Math.abs(v),top:`${10+i*8}%`} as React.CSSProperties}><span>f{i+1}</span></div>)}<div className="market-label">WHY DID THE MODEL MOVE?</div></div>}
function SequenceWorld(){return <div className="world-visual sequence-visual"><svg viewBox="0 0 1200 620" preserveAspectRatio="none"><path className="seq-a" d="M0 420 C150 350 190 470 300 390 S470 280 560 340 S720 430 810 300 S1030 230 1200 120"/><path className="seq-b" d="M0 470 C190 390 230 510 350 420 S520 340 620 390 S780 470 900 350 S1080 300 1200 250"/></svg><div className="time-ticks">{['t-5','t-4','t-3','t-2','t-1','t','t+1'].map(x=><span key={x}>{x}</span>)}</div></div>}
function AirspaceWorld(){return <div className="world-visual airspace-visual"><svg viewBox="0 0 1200 640"><path d="M40 500 Q300 70 620 330 T1160 120"/><path d="M20 180 Q320 600 580 240 T1180 500"/><path d="M120 620 Q450 220 760 390 T1120 60"/></svg><div className="map-lanes"><span>MAP</span><span>SHUFFLE</span><span>REDUCE</span></div></div>}

function ArchitectureDiagram({flow,accent}:{flow:Project['flow'];accent:string}){return <div className="arch-shell" tabIndex={0} role="region" aria-label="Technical architecture. Scroll horizontally to explore the pipeline."><div className="arch-head"><span>TECHNICAL ARCHITECTURE</span><span>INPUT → SYSTEM → OUTPUT</span></div><svg className="arch-lines" viewBox={`0 0 ${flow.length*220} 180`} preserveAspectRatio="none">{flow.slice(0,-1).map((_,i)=><path key={i} d={`M${i*220+165} 90 L${(i+1)*220+55} 90`}/>)}</svg><div className="arch-nodes">{flow.map((n,i)=><div className={`arch-node ${n.kind||''}`} key={n.label} style={{'--accent':accent} as React.CSSProperties}><b>{String(i+1).padStart(2,'0')}</b><strong>{n.label}</strong>{n.sub&&<small>{n.sub}</small>}</div>)}</div></div>}

function Contact(){const ref=useRef<HTMLHeadingElement>(null);useEffect(()=>{const el=ref.current;if(!el||matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches)return;const move=(e:PointerEvent)=>{const b=el.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;gsap.to(el,{x:x*18,y:y*10,rotation:x*1.1,duration:.6,ease:'power3.out'})};el.addEventListener('pointermove',move);return()=>{el.removeEventListener('pointermove',move);gsap.killTweensOf(el)}},[]);return <section className="contact" id="contact"><div className="contact-small">AVAILABLE FOR THE NEXT SYSTEM.</div><h2 ref={ref}>LET'S<br/><i>build</i><br/>SOMETHING.</h2><p className="contact-note">Explore the systems, trace the work, and see how the pieces connect.</p><a className="contact-direct" href="https://www.linkedin.com/in/nikhil-yarra/" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><a className="contact-direct" href="https://github.com/nymav" target="_blank" rel="noreferrer">Explore my GitHub ↗</a><div className="contact-links"><a href="#systems">SYSTEMS</a><a href="#work">WORK</a><a href="#identity">IDENTITY</a></div><div className="end-mark">NY / END OF FIELD</div></section>}

function IndexOverlay({onClose}:{onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;const previous=document.activeElement as HTMLElement|null;dialog?.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=overflow;previous?.focus()}},[]);
 return <dialog ref={ref} className="index-overlay" aria-label="Quick index" data-lenis-prevent onCancel={e=>{e.preventDefault();onClose()}}><button autoFocus onClick={onClose}>CLOSE ×</button><div className="index-main"><div><h3>NIKHIL YARRA</h3><p>AI ENGINEER</p></div><nav aria-label="Sections">{[['IDENTITY','#identity'],['OPERATIONS','#work'],['SYSTEMS','#systems'],['CONTACT','#contact']].map(([a,b])=><a href={b} onClick={e=>{e.preventDefault();onClose();requestAnimationFrame(()=>{const target=document.querySelector<HTMLElement>(b);target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});target?.scrollIntoView();history.replaceState(null,'',b)})}} key={a}>{a}<span aria-hidden="true">↘</span></a>)}</nav><div className="index-meta"><span>AGENTIC AI</span><span>RAG</span><span>MULTIMODAL</span><span>APPLIED ML</span></div></div></dialog>
}

// Immersive geometric environment with a slow, pointer-responsive camera.
function CinematicFilm(){
 const ref=useRef<HTMLVideoElement>(null);
 const keywords=['AGENTIC AI','RETRIEVAL','PYTHON','MACHINE LEARNING','MULTIMODAL','FASTAPI','DEEP LEARNING','SQL','EVALUATION','DATA PIPELINES'];
 const paused=false;
 useEffect(()=>{
  const video=ref.current;if(!video)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{video.pause()};
  sync();media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  return()=>{video.pause();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)};
 },[paused]);
 return <><div className="cinematic-film" aria-hidden="true"><video ref={ref} muted loop playsInline preload="none" poster="/neural-film-poster.jpg" src="/neural-film.mp4"/><SkillParticles words={keywords} paused={paused}/><div className="film-shade"/></div></>
}
