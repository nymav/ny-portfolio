import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
const MotionContext=createContext({paused:false,toggle:()=>{}});
export function MotionProvider({children}:{children:ReactNode}){
 const [paused,setPaused]=useState(false);
 return <MotionContext.Provider value={{paused,toggle:()=>setPaused(value=>!value)}}><div data-motion-paused={paused}>{children}</div></MotionContext.Provider>;
}
export const useMotion=()=>useContext(MotionContext);
export function useAutoAdvance(id:string,advance:()=>void,delay=8000,enabled=true){
 const {paused}=useMotion();const action=useRef(advance);action.current=advance;
 useEffect(()=>{
  const element=document.getElementById(id);if(!element)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,hovered=false,timer=0;
  const stop=()=>{window.clearTimeout(timer)};
  const schedule=()=>{stop();if(!enabled||paused||media.matches||document.hidden||!visible||hovered||(document.activeElement!==element&&element.contains(document.activeElement)))return;timer=window.setTimeout(()=>{action.current();schedule()},delay)};
  const enter=(e:PointerEvent)=>{if(e.pointerType==='mouse'&&(e.target as Element).closest('button,a,input,summary')){hovered=true;stop()}};
  const leave=()=>{hovered=false;schedule()};
  const focusout=()=>queueMicrotask(schedule);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule()},{threshold:.25});observer.observe(element);
  element.addEventListener('pointerover',enter);element.addEventListener('pointerout',leave);element.addEventListener('focusin',schedule);element.addEventListener('focusout',focusout);element.addEventListener('pointerdown',stop);element.addEventListener('pointerup',schedule);
  document.addEventListener('visibilitychange',schedule);media.addEventListener('change',schedule);
  return()=>{stop();observer.disconnect();element.removeEventListener('pointerover',enter);element.removeEventListener('pointerout',leave);element.removeEventListener('focusin',schedule);element.removeEventListener('focusout',focusout);element.removeEventListener('pointerdown',stop);element.removeEventListener('pointerup',schedule);document.removeEventListener('visibilitychange',schedule);media.removeEventListener('change',schedule)};
 },[id,delay,paused,enabled]);
}
