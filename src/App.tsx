import { flushSync } from 'react-dom';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles.css';
import SkillParticles from './SkillParticles';
import {projects as currentProjects, outputs, additionalWork, earlierWork} from './content';
import ProjectArtifact from './ProjectArtifact';
import Experience from './Experience';
import ContentRibbon from './ContentRibbon';
import PortfolioMotion from './PortfolioMotion';
import {MotionProvider,useMotion} from './Motion';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id:string; n:string; name:string; kicker:string; accent:string; ink?:string;
  stack:string[]; desc:string; problem:string; approach:string; result:string;
  flow:{label:string; sub?:string; kind?:'input'|'service'|'model'|'store'|'output'}[];
};

const projects:Project[] = currentProjects.map((p,i)=>({id:p.id,n:String(i+1),name:p.name,kicker:p.category,accent:'#d4d4d4',stack:p.stack.split(' · '),desc:p.description,problem:p.question,approach:p.implementation,result:p.validation+' '+p.limit,flow:[]}));

// Measure layout rather than the animated bounding box when navigating.
function sectionTop(element:HTMLElement){let top=0;let node:HTMLElement|null=element;while(node){top+=node.offsetTop;node=node.offsetParent as HTMLElement|null}return Math.max(0,top-80)}

export default function App(){return <MotionProvider><Portfolio/></MotionProvider>}
function Portfolio(){
 const motion=useMotion();
 const [active,setActive]=useState(()=>Math.max(0,projects.findIndex(p=>location.pathname.includes('/work/'+p.id)))), [indexOpen,setIndexOpen]=useState(false);

 const [caseOpen,setCaseOpen]=useState(()=>location.hash==='#case-study'||location.pathname.includes('/work/'));
 const project=projects[active];
 useEffect(()=>{document.title=caseOpen?`${project.name} | Nikhil Yarra`:'Nikhil Yarra | AI Engineering & Research'},[caseOpen,project.name]);
 useEffect(()=>{if(location.pathname.includes('/work/'))requestAnimationFrame(()=>{const target=document.getElementById('case-study');if(target)window.scrollTo({top:sectionTop(target),behavior:'instant'})})},[]);
 // The chosen case study stays selected while its evidence is being read.
 useEffect(()=>{
  const navigate=(event:MouseEvent)=>{
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
   if(!link||link.closest('dialog')||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
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
   flushSync(()=>{setActive(i);setCaseOpen(true)});
   window.dispatchEvent(new CustomEvent('neural-select',{detail:i}));
   const target=document.getElementById('case-study');
   if(target){
     ScrollTrigger.refresh();
     window.scrollTo({top:sectionTop(target),behavior:'instant'});
     target.focus({preventScroll:true});
     history.replaceState(null,'',`${import.meta.env.BASE_URL}work/${projects[i].id}/#case-study`);
   }
 },[]);

 useEffect(()=>{
  let refreshFrame=0;
  let previousHeight=0;
  const refresh=()=>{const height=document.querySelector('main')?.offsetHeight||0;if(height===previousHeight)return;previousHeight=height;cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh())};
  const observer=new ResizeObserver(refresh);
  if(document.querySelector('main'))observer.observe(document.querySelector('main')!);
  return()=>{observer.disconnect();cancelAnimationFrame(refreshFrame);};
 },[motion.paused]);
 return <main>
   <PortfolioMotion revision={`${caseOpen}-${active}`}/>
   <CinematicFilm/>
   <a className="skip-link" href="#systems">Skip to projects</a>
   <MinimalNav onIndex={()=>setIndexOpen(true)}/>
   <Hero/>
   <div className="content-flow">
   <ProjectDirectory active={active} setActive={chooseProject}/>
   {caseOpen&&<ProjectScene project={project} close={()=>{flushSync(()=>setCaseOpen(false));const target=document.getElementById("systems")!;window.scrollTo({top:sectionTop(target),behavior:"instant"});target.setAttribute("tabindex","-1");target.focus({preventScroll:true});history.replaceState(null,"",`${import.meta.env.BASE_URL}#systems`)}}/>}
   <ResearchOutputs/>
   <Experience/>
   <AdditionalWork/>
   <Contact/>
   </div>
   {indexOpen&&<IndexOverlay onClose={()=>setIndexOpen(false)}/>}
 </main>
}

function MinimalNav({onIndex}:{onIndex:()=>void}){
 const motion=useMotion();
 const [section,setSection]=useState('HOME');
 useEffect(()=>{let af=0;const update=()=>{cancelAnimationFrame(af);af=requestAnimationFrame(()=>{const sections=[['identity','HOME'],['systems','PROJECTS'],['case-study','CASE STUDY'],['research','RESEARCH'],['work','EXPERIENCE'],['products','PRODUCTS'],['contact','CONTACT']];let current='HOME';for(const [id,label] of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=innerHeight*.42)current=label}setSection(current)})};update();addEventListener('scroll',update,{passive:true});return()=>{cancelAnimationFrame(af);removeEventListener('scroll',update)}},[]);
 return <div className="chrome"><button className="progress-glyph" onClick={onIndex} aria-label="Open quick index"><span>NY</span><i/><span>INDEX</span></button><button className="motion-control" disabled={motion.reduced} onClick={motion.toggle} aria-pressed={motion.paused} aria-label={motion.reduced?'Reduced motion enabled':motion.paused?'Resume automatic motion':'Pause automatic motion'}>{motion.reduced?'MOTION OFF':motion.paused?'PLAY':'PAUSE'}</button><span className="current-section">{section}</span></div>
}
function Hero(){return <section className="hero" id="identity"><div className="hero-stage"><p className="hero-kicker">AI ENGINEERING & INDEPENDENT RESEARCH</p><h1 className="hero-name">Nikhil<br/><i>Yarra.</i></h1><div className="hero-caption"><p className="hero-copy">I build and evaluate LLM applications.<br/>Retrieval, model integration and evaluation.</p><a className="hero-cta" href="#systems">Explore selected work <span aria-hidden="true"></span></a></div></div><div className="hero-bottom"><span>PYTHON / AI / DATA</span><a href="#work">BACKGROUND </a></div></section>}

function ProjectDirectory({active,setActive}:{active:number;setActive:(n:number)=>void}){return <section className="project-directory" id="systems"><header><h2>Projects</h2><p className="section-deck">Retrieval, regression evaluation and documentation integrity. Inspect the behavior, evidence and engineering decisions.</p></header><div className="featured-work">{projects.map((p,i)=><article key={p.id}><div className="featured-summary"><span className="eyebrow">{p.kicker}</span><h3><button onClick={()=>setActive(i)}>{p.name}</button></h3><p>{p.desc}</p><div className="featured-links"><button onClick={()=>setActive(i)} aria-label={`Open ${p.name} study`}>Explore the study</button><a href={currentProjects[i].repository} target="_blank" rel="noopener noreferrer">Source</a></div></div><ProjectArtifact id={p.id}/></article>)}</div></section>}
function ProjectScene({project,close}:{project:Project;close:()=>void}){const p=currentProjects.find(p=>p.id===project.id)!;return <section id="case-study" tabIndex={-1} aria-label={`${project.name} case study`} className="project-scene"><div className="case-toolbar"><span className="case-index">{project.kicker}</span><button onClick={close} aria-label="Close case study">Close study</button></div><h2 className="study-title">{project.name}</h2><ProjectDetails project={project}/><ProjectArtifact id={project.id} interactive/><div className="project-proof-links"><a href={p.repository} target="_blank" rel="noopener noreferrer">Explore source</a><a href={p.evidence} target="_blank" rel="noopener noreferrer">Validation evidence</a></div><ContentRibbon label="Tools and frameworks" items={project.stack}/></section>}
function ResearchOutputs(){return <section className="research-outputs" id="research"><header><h2>Research outputs</h2></header><div className="publication-list">{outputs.map(p=><article key={p.doi}><p className="eyebrow">{p.venue} · {p.date}</p><h3>{p.title}</h3><p>{p.description}</p><a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">Paper and record</a></article>)}</div></section>}
function AdditionalWork(){return <section className="additional-work" id="products"><h2>Products</h2><div className="publication-list">{additionalWork.map(p=><article key={p.name}><p className="eyebrow">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name==='Medora'?'Visit Teyrin':'View repository'}</a></article>)}</div><details className="earlier-studies"><summary>Earlier experiments and studies</summary>{earlierWork.map(p=><p key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a><span>{p.description}</span></p>)}</details></section>}
function ProjectDetails({project}:{project:Project}){
 return <div className="study-details">{[['THE QUESTION',project.problem],['ENGINEERING',project.approach],['RESULT & STATUS',project.result]].map(([label,copy])=><div key={label}><h3>{label}</h3><p>{copy}</p></div>)}</div>
}

function Contact(){return <section className="contact" id="contact"><a className="contact-invitation" href="mailto:nikhilyarra.mail@gmail.com" aria-label="Email Nikhil Yarra"><h2>Contact</h2><span aria-hidden="true"></span></a><div className="contact-bottom"><p className="contact-note">For research and engineering opportunities<br/>in agents, retrieval and evaluation.</p><div className="contact-channels"><a href="mailto:nikhilyarra.mail@gmail.com"><span>WRITE DIRECTLY</span>Email </a><a href="https://www.linkedin.com/in/nikhil-yarra/" target="_blank" rel="noreferrer"><span>START A CONVERSATION</span>LinkedIn </a><a href="https://github.com/nymav" target="_blank" rel="noreferrer"><span>FOLLOW THE WORK</span>GitHub</a><a href={`${import.meta.env.BASE_URL}Nikhil_Yarra_CV.pdf`} target="_blank" rel="noopener noreferrer"><span>BACKGROUND</span>CV</a></div></div><footer className="end-mark"><a className="footer-signature" href="#identity">Nikhil <i>Yarra.</i></a><a href="#identity">BACK TO TOP </a></footer></section>}

function IndexOverlay({onClose}:{onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;const previous=document.activeElement as HTMLElement|null;dialog?.showModal();if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.querySelector('[data-motion-paused="true"]'))gsap.fromTo(dialog?.querySelector('.index-main')||dialog,{y:18,opacity:.6},{y:0,opacity:1,duration:.45,ease:'power3.out',clearProps:'transform,opacity'});const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=overflow;previous?.focus()}},[]);
 return <dialog ref={ref} className="index-overlay" aria-label="Quick index" data-lenis-prevent onKeyDown={e=>{if(e.key!=='Tab')return;const nodes=ref.current?.querySelectorAll<HTMLElement>('button,a[href]');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===ref.current)){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}} onCancel={e=>{e.preventDefault();onClose()}}><button autoFocus onClick={onClose}>CLOSE ×</button><div className="index-main"><div><h3>NIKHIL YARRA</h3><p>AI ENGINEER</p></div><nav aria-label="Sections">{[['HOME','#identity'],['PROJECTS','#systems'],['RESEARCH','#research'],['EXPERIENCE','#work'],['PRODUCTS','#products'],['CONTACT','#contact']].map(([a,b])=><a href={b} onClick={e=>{e.preventDefault();onClose();requestAnimationFrame(()=>{const target=document.querySelector<HTMLElement>(b);target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});if(target)window.scrollTo({top:sectionTop(target),behavior:'instant'});history.replaceState(null,'',b)})}} key={a}>{a}<span aria-hidden="true"></span></a>)}</nav><div className="index-meta"><span>Hyderabad, India</span><a href={`${import.meta.env.BASE_URL}Nikhil_Yarra_CV.pdf`} target="_blank" rel="noopener noreferrer">CV</a></div></div></dialog>
}

// The portfolio's visual signature stays behind the content; no video download.
function CinematicFilm(){
 const {paused}=useMotion();
 const keywords=['AGENTIC AI','RETRIEVAL','PYTHON','MACHINE LEARNING','MULTIMODAL','FASTAPI','DEEP LEARNING','SQL','EVALUATION','DATA PIPELINES'];
 return <div className="cinematic-film" aria-hidden="true"><SkillParticles words={keywords} paused={paused}/><div className="film-shade"/></div>
}
