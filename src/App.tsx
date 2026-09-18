import { flushSync } from 'react-dom';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles.css';
import SkillParticles from './SkillParticles';
import {projectEvidence} from './projectEvidence';
import Experience from './Experience';
import EvidencePanel from './EvidencePanel';
import ProjectPreview from './ProjectPreview';
import ContentRibbon from './ContentRibbon';
import {MotionProvider,useMotion,useAutoAdvance} from './Motion';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id:string; n:string; name:string; kicker:string; accent:string; ink?:string;
  stack:string[]; desc:string; problem:string; approach:string; result:string;
  flow:{label:string; sub?:string; kind?:'input'|'service'|'model'|'store'|'output'}[];
};

const projects:Project[] = [
  {id:'drax',n:'01',name:'DRAX TBS',kicker:'LLM APPLICATION ENGINEERING',accent:'#9DFF4B',ink:'#11100e',stack:['RETRIEVAL-AUGMENTED GENERATION','CONTEXT ASSEMBLY','SENTENCE TRANSFORMERS','CHROMADB','FASTAPI','LOCAL LLM INFERENCE'],desc:'An LLM tutoring application built around document retrieval, context assembly, configurable tutor behavior and saved conversations.',problem:'Private documents needed useful retrieval and local inference without collapsing into a single opaque prompt.',approach:'Parse PDFs, embed text, retrieve eight relevant chunks and assemble the model context. Separate tutor instructions, generation and session storage; LM Studio provides the local inference endpoint.',result:'A textbook question-answering prototype with saved sessions, strict/general tutor modes and explicit missing-document fallbacks. Grounding quality and precise page attribution still need evaluation.',flow:[{label:'DOCUMENTS',kind:'input'},{label:'FASTAPI',sub:'orchestration',kind:'service'},{label:'EMBEDDINGS',sub:'sentence transformer',kind:'model'},{label:'CHROMADB',sub:'vector store',kind:'store'},{label:'LOCAL LLM',sub:'LM Studio',kind:'model'},{label:'ANSWER',sub:'grounded output',kind:'output'}]},
  {id:'dachat',n:'02',name:'DACHAT',kicker:'LOCAL AI INTERFACE',accent:'#3155FF',stack:['STREAMLIT','LOCAL LLM','PYTHON'],desc:'A Streamlit interface for exploring CSV data with local AI responses and property-price predictions.',problem:'Local models are useful only when the interaction loop is fast enough to test prompts, responses and context behavior.',approach:'Wrap local inference in a simple conversational surface that keeps the model loop inspectable and iteration-friendly.',result:'A compact interface for testing local conversations without depending on a remote chat product.',flow:[{label:'PROMPT',kind:'input'},{label:'STREAMLIT',kind:'service'},{label:'LOCAL MODEL',kind:'model'},{label:'STATE',sub:'conversation context',kind:'store'},{label:'RESPONSE',kind:'output'}]},
  {id:'emotion',n:'03',name:'EMOTION MATRIX',kicker:'VISION STUDY',accent:'#FF725F',stack:['VGG','RESNET','DENSENET','TENSORFLOW','KERAS','MOBILENETV2'],desc:'A two-class happy/sad image study comparing four transfer-learning architectures—and the limits of headline accuracy.',problem:'How do four pretrained CNN architectures compare on a curated happy/sad classification task, and do the reported metrics support the same conclusion?',approach:'Compare VGG16, ResNet50, DenseNet121 and MobileNetV2 on cleaned, normalized and augmented images.',result:'A documented architecture comparison. Reported accuracy and separately reported F1/AUC need reconciliation before making reliability claims.',flow:[{label:'IMAGES',kind:'input'},{label:'BALANCING',sub:'SMOTE / sampling',kind:'service'},{label:'CNN FAMILY',sub:'VGG · ResNet · DenseNet',kind:'model'},{label:'EVALUATION',kind:'service'},{label:'EMOTION',kind:'output'}]},
  {id:'causal',n:'04',name:'CAUSAL MED',kicker:'CAUSAL INFERENCE',accent:'#7A2942',stack:['DOWHY','ECONML','SHAP','PYTHON'],desc:'A causal-inference workflow for estimating and interpreting treatment effects in healthcare-style data.',problem:'Prediction alone cannot answer what changes when a treatment changes; confounding and assumptions have to be represented explicitly.',approach:'Express causal assumptions, estimate treatment effects with modern causal estimators and add interpretation around heterogeneous effects.',result:'A workflow that separates prediction from causal questions and makes assumptions part of the engineering surface.',flow:[{label:'OBSERVATIONAL DATA',kind:'input'},{label:'CAUSAL GRAPH',sub:'assumptions',kind:'service'},{label:'ESTIMATOR',sub:'DoWhy / EconML',kind:'model'},{label:'EFFECT',kind:'output'},{label:'SHAP',sub:'interpretation',kind:'service'}]},
  {id:'ddos',n:'05',name:'DDOS SENTINEL',kicker:'NETWORK DEFENSE',accent:'#FF7A00',stack:['ADABOOST','NAIVE BAYES','PYQT','PYTHON'],desc:'A desktop ML system for classifying suspicious traffic patterns and surfacing potential DDoS activity.',problem:'Traffic classification requires turning noisy packet-level signals into features that a lightweight model can classify quickly.',approach:'Engineer traffic features, compare ensemble and probabilistic classifiers, then surface the result through a monitoring interface.',result:'An end-to-end prototype connecting traffic features, classification and operator-facing alerts.',flow:[{label:'TRAFFIC',kind:'input'},{label:'FEATURES',kind:'service'},{label:'CLASSIFIER',sub:'AdaBoost / NB',kind:'model'},{label:'MONITOR',sub:'PyQt',kind:'service'},{label:'ALERT',kind:'output'}]},
  {id:'market',n:'06',name:'MARKET SIGNAL',kicker:'DECISION MODEL',accent:'#2D8B66',stack:['XGBOOST','SVM','RANDOM FOREST','PYTHON','SHAP (PLANNED)'],desc:'A classification study predicting term-deposit subscriptions from bank marketing campaign data.',problem:'A response score is less useful when stakeholders cannot see which signals push a prediction in either direction.',approach:'Compare logistic regression, SVM, Random Forest, XGBoost, and a neural network. Inspect class balance and feature relationships before evaluating predictions.',result:'A documented model comparison with evaluation outputs. SHAP explanations remain a planned extension.',flow:[{label:'CUSTOMER DATA',kind:'input'},{label:'FEATURE PIPELINE',kind:'service'},{label:'XGBOOST / SVM',kind:'model'},{label:'SHAP',sub:'planned extension',kind:'service'},{label:'RESPONSE SCORE',kind:'output'}]},
  {id:'apple',n:'07',name:'APPLE SEQUENCE',kicker:'TIME SERIES',accent:'#B44E53',stack:['LSTM','PYTHON','TIME SERIES'],desc:'A recurrent time-series experiment focused on sequence-to-forecast behavior.',problem:'Sequential data carries temporal dependence that a flat feature table does not represent naturally.',approach:'Transform observations into ordered windows and use an LSTM to learn a forecasting function over those sequences.',result:'A compact sequence-modeling study centered on temporal representation and forecast behavior.',flow:[{label:'HISTORY',kind:'input'},{label:'WINDOWS',kind:'service'},{label:'LSTM',kind:'model'},{label:'FORECAST',kind:'output'}]},
  {id:'airspace',n:'08',name:'AIRSPACE MAPREDUCE',kicker:'DISTRIBUTED DATA',accent:'#3579B9',stack:['MAPREDUCE','HADOOP','OOZIE','JAVA'],desc:'A distributed workflow for processing large flight datasets through map, shuffle and reduce stages.',problem:'Large flight records become cumbersome when every transformation assumes one local process and one memory space.',approach:'Express the workload as independent map operations, keyed redistribution and reductions that can scale across partitions.',result:'A distributed-processing pipeline that makes the movement and aggregation of flight data explicit.',flow:[{label:'FLIGHT DATA',kind:'input'},{label:'MAP',kind:'service'},{label:'SHUFFLE',kind:'service'},{label:'REDUCE',kind:'service'},{label:'OUTPUT',kind:'output'}]},
];

// Measure layout rather than the animated bounding box when navigating.
function sectionTop(element:HTMLElement){let top=0;let node:HTMLElement|null=element;while(node){top+=node.offsetTop;node=node.offsetParent as HTMLElement|null}return Math.max(0,top-80)}

export default function App(){return <MotionProvider><Portfolio/></MotionProvider>}
function Portfolio(){
 const motion=useMotion();
 const [active,setActive]=useState(0), [indexOpen,setIndexOpen]=useState(false);

 const project=projects[active];
 // The chosen case study stays selected while its evidence is being read.
 useEffect(()=>{
  const navigate=(event:MouseEvent)=>{
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
   if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const hash=link.getAttribute('href')!;
   const target=document.getElementById(hash.slice(1));if(!target)return;
   event.preventDefault();event.stopPropagation();
   flushSync(()=>setIndexOpen(false));
   requestAnimationFrame(()=>{
    const destination=sectionTop(target);
    window.scrollTo({top:destination,behavior:'instant'});
    ScrollTrigger.update();
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    history.replaceState(null,'',hash);
   });
  };
  document.addEventListener('click',navigate,true);
  return()=>document.removeEventListener('click',navigate,true);
 },[]);
 const chooseProject=useCallback((i:number)=>{
   flushSync(()=>setActive(i));
   window.dispatchEvent(new CustomEvent('neural-select',{detail:i}));
   const target=document.getElementById('case-study');
   if(target){
     ScrollTrigger.refresh();
     window.scrollTo({top:sectionTop(target),behavior:'instant'});
     target.focus({preventScroll:true});
     history.replaceState(null,'','#case-study');
   }
 },[]);

 useEffect(()=>{
  const mm=gsap.matchMedia();
  if(!motion.paused)mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const sections=gsap.utils.toArray<HTMLElement>('main section');
   sections.forEach((el,index)=>{
    gsap.set(el,{zIndex:index+1});
    if(index>0)gsap.fromTo(el,{y:36,rotationX:3,transformPerspective:1400,transformOrigin:'50% 100%'},{y:0,rotationX:0,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 55%',scrub:true}});
   });
  });
  let refreshFrame=0;
  let previousHeight=0;
  const refresh=()=>{const height=document.querySelector('main')?.offsetHeight||0;if(height===previousHeight)return;previousHeight=height;cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh())};
  const observer=new ResizeObserver(refresh);
  if(document.querySelector('main'))observer.observe(document.querySelector('main')!);
  return()=>{observer.disconnect();cancelAnimationFrame(refreshFrame);mm.revert()};
 },[motion.paused]);
 return <main>
   <CinematicFilm/>
   <a className="skip-link" href="#systems">Skip to projects</a>
   <MinimalNav onIndex={()=>setIndexOpen(true)}/>
   <Hero/>
   <div className="content-flow">
   <ProjectDirectory active={active} setActive={chooseProject}/>
   <ProjectScene project={project} next={()=>chooseProject((active+1)%projects.length)}/>
   <Experience/>
   <Contact/>
   </div>
   {indexOpen&&<IndexOverlay onClose={()=>setIndexOpen(false)}/>} 
 </main>
}

function MinimalNav({onIndex}:{onIndex:()=>void}){
 const motion=useMotion();
 const [section,setSection]=useState('IDENTITY');
 useEffect(()=>{let af=0;const update=()=>{cancelAnimationFrame(af);af=requestAnimationFrame(()=>{const sections=[['identity','IDENTITY'],['systems','PROJECTS'],['case-study','CASE STUDY'],['work','EXPERIENCE'],['contact','CONTACT']];let current='IDENTITY';for(const [id,label] of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=innerHeight*.42)current=label}setSection(current)})};update();addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(af);removeEventListener('scroll',update)}},[]);
 return <div className="chrome"><button className="progress-glyph" onClick={onIndex} aria-label="Open quick index"><span>NY</span><i/><span>INDEX</span></button><button className="motion-control" onClick={motion.toggle} aria-pressed={motion.paused} aria-label={motion.paused?'Resume automatic motion':'Pause automatic motion'}>{motion.paused?'PLAY ↗':'PAUSE Ⅱ'}</button><span className="current-section">{section}</span></div>
}
function Hero(){return <section className="hero" id="identity"><div className="hero-stage"><p className="hero-kicker">APPLIED AI ENGINEER / SELECTED WORK</p><h1 className="hero-name">Nikhil<br/><i>Yarra.</i></h1><div className="hero-caption"><span className="eyebrow">MODELS ARE THE START.</span><p className="hero-copy">I build local AI tools and retrieval systems.<br/>Then examine where they break.</p><a className="hero-cta" href="#systems">Explore selected work <span aria-hidden="true">↗</span></a></div></div><div className="hero-bottom"><span>PYTHON / AI / DATA</span><span>ENGINEERING, WITH CURIOSITY.</span><a href="#work">BACKGROUND ↓</a></div></section>}

function ProjectDirectory({active,setActive}:{active:number;setActive:(n:number)=>void}){return <section className="project-directory" id="systems"><header><span className="eyebrow">01 / THREE SELECTED STUDIES</span><h2>From question<br/><i>to working system.</i></h2><p className="section-deck">A closer look at LLM applications, model evaluation and distributed data. Explore the behavior, evidence and engineering decisions.</p></header><div className="featured-work">{[0,2,7].map((i,rank)=><article key={projects[i].id}><div className="featured-summary"><span className="eyebrow">0{rank+1} / {projects[i].kicker}</span><h3><button onClick={()=>setActive(i)}>{projects[i].name}<span aria-hidden="true">↗</span></button></h3><p>{projects[i].desc}</p><div className="featured-links"><button onClick={()=>setActive(i)}>Explore the study ↗</button><a href={projectEvidence[projects[i].id].url} target="_blank" rel="noreferrer">Source ↗</a></div></div><ProjectPreview id={projects[i].id}/></article>)}</div><details className="project-index-disclosure" onToggle={()=>requestAnimationFrame(()=>ScrollTrigger.refresh())}><summary>More experiments / 05 <span aria-hidden="true">↘</span></summary><div className="project-list">{projects.map((p,i)=>[0,2,7].includes(i)?null:<button key={p.id} aria-label={`Open ${p.name} case study`} aria-pressed={i===active} aria-controls="case-study" onClick={()=>setActive(i)}><span>{p.n}</span><strong>{p.name}</strong><em>{p.kicker}</em><span aria-hidden="true">↗</span></button>)}</div></details></section>}

function ProjectScene({project,next}:{project:Project;next:()=>void}){const evidence=projectEvidence[project.id];return <section id="case-study" tabIndex={-1} aria-label={`${project.name} case study`} className={`project-scene scene-${project.id}`} style={{'--accent':project.accent} as React.CSSProperties}><div className="project-opening" key={'opening-'+project.id}><div className="case-copy"><span className="case-index">{project.n} / 08 · {project.kicker}</span><a className="back-to-systems" href="#systems">← ALL SYSTEMS</a><h2>{project.name}</h2><p className="case-lead">{project.desc}</p>{evidence&&<div className="project-proof-links"><a href={evidence.url} target="_blank" rel="noreferrer">View source ↗</a>{evidence.artifact&&<a href={evidence.artifact} target="_blank" rel="noreferrer">View results ↗</a>}</div>}<a className="case-jump" href="#implementation">Explore the implementation ↓</a></div></div><EvidencePanel id={project.id}/><ProjectDetails key={project.id} project={project}/><ContentRibbon label="Tools and frameworks" items={project.stack}/><button className="next-world" onClick={next}><span>NEXT PROJECT ↗</span><strong>{projects[(projects.findIndex(p=>p.id===project.id)+1)%projects.length].name}</strong></button></section>}
function ProjectDetails({project}:{project:Project}){
 const [step,setStep]=useState(0);const [reading,setReading]=useState(false);const evidence=projectEvidence[project.id];
 const details=[['PROBLEM',project.problem],['IMPLEMENTATION',project.approach],['OUTCOME',project.result],...(evidence?[['IN THE REPOSITORY',evidence.fact]]:[])];
 useAutoAdvance('implementation',()=>setStep(value=>(value+1)%details.length),9000,!reading);
 return <div className="project-details" id="implementation"><div className="detail-tabs" aria-label="Project details">{details.map(([label],i)=><button key={label} aria-pressed={i===step} onClick={()=>{setReading(true);setStep(i)}}>{String(i+1).padStart(2,'0')} / {label}</button>)}</div><div className="detail-stage" key={step}><p>{details[step][1]}</p>{step===3&&evidence&&<a href={evidence.url+'#readme'} target="_blank" rel="noreferrer">Read the documentation ↗</a>}</div></div>
}

function Contact(){return <section className="contact" id="contact"><div className="contact-intro"><span className="eyebrow">03 / THE NEXT CONVERSATION</span><p>Good work starts with<br/>an interesting conversation.</p></div><a className="contact-invitation" href="mailto:nikhilyarra@gmail.com" aria-label="Email Nikhil Yarra"><h2>Let’s <i>talk.</i></h2><span aria-hidden="true">↗</span></a><div className="contact-bottom"><p className="contact-note">Let’s discuss applied AI engineering,<br/>LLM applications or data-intensive products.</p><div className="contact-channels"><a href="mailto:nikhilyarra@gmail.com"><span>WRITE DIRECTLY</span>Email ↗</a><a href="https://www.linkedin.com/in/nikhil-yarra/" target="_blank" rel="noreferrer"><span>START A CONVERSATION</span>LinkedIn ↗</a><a href="https://github.com/nymav" target="_blank" rel="noreferrer"><span>FOLLOW THE WORK</span>GitHub ↗</a></div></div><footer className="end-mark"><a className="footer-signature" href="#identity">Nikhil <i>Yarra.</i></a><span>APPLIED AI · DATA · EXPERIMENTS</span><a href="#identity">BACK TO TOP ↑</a></footer></section>}

function IndexOverlay({onClose}:{onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;const previous=document.activeElement as HTMLElement|null;dialog?.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=overflow;previous?.focus()}},[]);
 return <dialog ref={ref} className="index-overlay" aria-label="Quick index" data-lenis-prevent onCancel={e=>{e.preventDefault();onClose()}}><button autoFocus onClick={onClose}>CLOSE ×</button><div className="index-main"><div><h3>NIKHIL YARRA</h3><p>AI ENGINEER</p></div><nav aria-label="Sections">{[['IDENTITY','#identity'],['PROJECTS','#systems'],['EXPERIENCE','#work'],['CONTACT','#contact']].map(([a,b])=><a href={b} onClick={e=>{e.preventDefault();onClose();requestAnimationFrame(()=>{const target=document.querySelector<HTMLElement>(b);target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});target?.scrollIntoView();history.replaceState(null,'',b)})}} key={a}>{a}<span aria-hidden="true">↘</span></a>)}</nav><div className="index-meta"><span>AGENTIC AI</span><span>RAG</span><span>MULTIMODAL</span><span>APPLIED ML</span></div></div></dialog>
}

// The portfolio's visual signature stays behind the content; no video download.
function CinematicFilm(){
 const {paused}=useMotion();
 const keywords=['AGENTIC AI','RETRIEVAL','PYTHON','MACHINE LEARNING','MULTIMODAL','FASTAPI','DEEP LEARNING','SQL','EVALUATION','DATA PIPELINES'];
 return <div className="cinematic-film" aria-hidden="true"><SkillParticles words={keywords} paused={paused}/><div className="film-shade"/></div>
}
