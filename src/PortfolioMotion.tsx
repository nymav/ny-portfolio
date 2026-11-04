import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useMotion} from './Motion';
gsap.registerPlugin(ScrollTrigger);

/** Animate the content inside sections, leaving section geometry and navigation stable. */
export default function PortfolioMotion({revision}:{revision:string}){
 const {paused}=useMotion();
 useEffect(()=>{
  if(paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const context=gsap.context(()=>{
   if(!location.hash&&!location.pathname.includes('/work/'))gsap.fromTo('.hero-kicker,.hero-name,.hero-caption',{y:28,opacity:.6},{y:0,opacity:1,duration:1.05,stagger:.1,ease:'power3.out',clearProps:'transform,opacity'});
   gsap.utils.toArray<HTMLElement>('.project-directory h2,.research-outputs h2,.experience-heading,.featured-work article,.publication-list article,.contact-invitation,.contact-bottom,.end-mark').forEach(element=>{
    gsap.fromTo(element,{y:26,opacity:.55},{y:0,opacity:1,duration:.8,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:element,start:'top 92%',once:true}});
   });
   gsap.utils.toArray<HTMLElement>('.featured-work .artifact').forEach(element=>{
    gsap.fromTo(element,{y:12},{y:-12,ease:'none',scrollTrigger:{trigger:element,start:'top bottom',end:'bottom top',scrub:1}});
   });
   if(document.querySelector('.project-scene'))gsap.fromTo('.study-title,.study-details,.project-scene>.artifact',{y:20,opacity:.65},{y:0,opacity:1,duration:.55,stagger:.07,ease:'power3.out',clearProps:'transform,opacity'});
  });
  return()=>context.revert();
 },[paused,revision]);
 return null;
}
