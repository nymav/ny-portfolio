import {useEffect,useRef} from 'react';
import * as THREE from 'three';

export function createRenderer(){
 try{return new THREE.WebGLRenderer({alpha:true,antialias:true})}catch{return null}
}

// A visual owns a frame only while it is visible and motion is allowed. Changes
// to layout or reduced motion still produce a static frame, including at mount.
function scenePlayback(el:HTMLElement,onResize:(width:number,height:number)=>void,paint:(delta:number,moving:boolean)=>void){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,last=0,width=0,height=0,inView=false;
 const visible=()=>!document.hidden&&inView&&width>0&&height>0;
 const draw=(now:number)=>{
  frame=0;if(!visible()){last=0;return;}
  const moving=!reduced.matches;
  if(moving&&last&&now-last<32){frame=requestAnimationFrame(draw);return;}
  const delta=last?Math.min(now-last,50):0;last=now;
  paint(delta,moving);
  if(moving)frame=requestAnimationFrame(draw);
 };
 const refresh=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(visible())frame=requestAnimationFrame(draw)};
 const resize=()=>{
  width=el.clientWidth;height=el.clientHeight;
  if(width>0&&height>0)onResize(width,height);
  refresh();
 };
 const rect=el.getBoundingClientRect();
 inView=rect.bottom>0&&rect.top<innerHeight&&rect.right>0&&rect.left<innerWidth;
 const intersection=new IntersectionObserver(entries=>{inView=entries.some(entry=>entry.isIntersecting);refresh()});
 const observer=new ResizeObserver(resize);
 intersection.observe(el);observer.observe(el);
 document.addEventListener('visibilitychange',refresh);reduced.addEventListener('change',refresh);
 resize();
 return {refresh,dispose:()=>{cancelAnimationFrame(frame);intersection.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',refresh);reduced.removeEventListener('change',refresh)}};
}

export function DraxWorld(){
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const renderer=createRenderer();if(!renderer)return;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(50,1,.1,200);
  camera.position.z=6;el.appendChild(renderer.domElement);
  const groups:THREE.Points[]=[];
  for(let g=0;g<4;g++){
   const geometry=new THREE.BufferGeometry(),positions=new Float32Array(80*3);
   const cx=(g-1.5)*1.55,cy=(g%2?-.5:.5);
   for(let i=0;i<80;i++){
    positions[i*3]=cx+(Math.random()-.5)*1.2;
    positions[i*3+1]=cy+(Math.random()-.5)*1.25;
    positions[i*3+2]=(Math.random()-.5)*1.5;
   }
   geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
   const material=new THREE.PointsMaterial({size:.045,color:g===1?0x9dff4b:0x171610,transparent:true,opacity:g===1?.95:.42});
   const points=new THREE.Points(geometry,material);groups.push(points);scene.add(points);
  }
  let mx=0,my=0;
  const move=(event:PointerEvent)=>{const bounds=el.getBoundingClientRect();if(!bounds.width||!bounds.height)return;mx=(event.clientX-bounds.left)/bounds.width-.5;my=(event.clientY-bounds.top)/bounds.height-.5};
  const leave=()=>{mx=0;my=0};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
  const playback=scenePlayback(el,(width,height)=>{
   camera.aspect=width/height;
   // Fit the full point cloud to its own panel, especially a narrow tablet column.
   const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
   camera.position.z=Math.max(6,3.3/(tangent*camera.aspect)+1);
   camera.far=Math.max(100,camera.position.z+20);camera.updateProjectionMatrix();
   renderer.setPixelRatio(Math.min(devicePixelRatio,width<600?1.25:1.5));renderer.setSize(width,height);
  },(delta,moving)=>{
   if(moving){
    const settle=1-Math.exp(-delta*.0018);
    camera.position.x+=(mx*.5-camera.position.x)*settle;
    camera.position.y+=(-my*.35-camera.position.y)*settle;
    groups.forEach((points,i)=>points.rotation.y+=delta*(.0008+i*.0002)/16.67);
   }
   renderer.render(scene,camera);
  });
  return()=>{playback.dispose();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);groups.forEach(points=>{points.geometry.dispose();(points.material as THREE.Material).dispose()});renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="world-visual drax-visual"><div ref={mount} className="drax-three"/><div className="visual-caption"><b>SEMANTIC SPACE</b><span>query → neighbors → context</span></div></div>
}

export function SystemConstellation(){
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const renderer=createRenderer();if(!renderer)return;
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
  camera.position.z=7;
  const count=420,geometry=new THREE.BufferGeometry(),positions=new Float32Array(count*3),target=new Float32Array(count*3);
  for(let i=0;i<count;i++){
   positions[i*3]=(Math.random()-.5)*10;positions[i*3+1]=(Math.random()-.5)*6;positions[i*3+2]=(Math.random()-.5)*3;
   const angle=i/count*Math.PI*10,radius=1.2+(i%70)/70*2.4;
   target[i*3]=Math.cos(angle)*radius;target[i*3+1]=Math.sin(angle)*radius*.55;target[i*3+2]=(Math.random()-.5)*1.5;
  }
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const material=new THREE.PointsMaterial({size:.025,color:0x151410,transparent:true,opacity:.52});
  const cloud=new THREE.Points(geometry,material);scene.add(cloud);
  const playback=scenePlayback(el,(width,height)=>{
   camera.aspect=width/height;camera.updateProjectionMatrix();
   renderer.setPixelRatio(Math.min(devicePixelRatio,width<600?1.25:1.5));renderer.setSize(width,height);
  },(delta,moving)=>{
   const settle=moving?1-Math.exp(-delta*.00072):1;
   for(let i=0;i<positions.length;i++)positions[i]+=(target[i]-positions[i])*settle;
   geometry.attributes.position.needsUpdate=true;
   if(moving)cloud.rotation.z+=delta*.0005/16.67;
   renderer.render(scene,camera);
  });
  return()=>{playback.dispose();geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 const nodes=[['LLMs','DRAX · DACHAT'],['AGENTS','WARREN & CARTER'],['RETRIEVAL','DRAX'],['VISION','EMOTION MATRIX'],['APIs','FASTAPI · FLASK'],['DATA','TUBMAN · SYMNN'],['EVALUATION','VALIDATION · REVIEW'],['DEPLOYMENT','DOCKER · CLOUD'],['CAUSAL','CAUSAL MED']];
 return <section className="constellation" id="map"><div ref={mount} className="three-field"/><div className="constellation-copy"><span>EVERYTHING RECONNECTS</span><h2>SYSTEM<br/><i>constellation.</i></h2></div><div className="node-field">{nodes.map(([name,sub],i)=><div className={`sys-node n${i}`} key={name}><strong>{name}</strong><small>{sub}</small></div>)}</div></section>
}

export function AmbientFlight(){
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const renderer=createRenderer();if(!renderer)return;
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color('#080c11');scene.fog=new THREE.FogExp2('#080c11',.025);
  const camera=new THREE.PerspectiveCamera(62,1,.1,160);
  const environment=new THREE.Group();scene.add(environment);
  const positions:number[]=[],locations:THREE.Vector3[]=[];
  // An abstract neural graph rather than an anatomical representation.
  for(let i=0;i<160;i++){
   const angle=i*2.399963,y=1-2*(i+.5)/160,radius=9+Math.sin(i*1.7)*2;
   const point=new THREE.Vector3(Math.cos(angle)*Math.sqrt(1-y*y)*radius,y*radius*.68,Math.sin(angle)*Math.sqrt(1-y*y)*radius-19);
   locations.push(point);positions.push(point.x,point.y,point.z);
  }
  const pointGeometry=new THREE.BufferGeometry();pointGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const pointMaterial=new THREE.PointsMaterial({color:0xa9e8ee,size:.1,transparent:true,opacity:.9});
  environment.add(new THREE.Points(pointGeometry,pointMaterial));
  const edges:number[]=[];
  locations.forEach((point,i)=>locations.map((other,j)=>({point:other,j,d:point.distanceTo(other)})).filter(neighbor=>neighbor.j>i&&neighbor.d<4.8).slice(0,4).forEach(neighbor=>edges.push(point.x,point.y,point.z,neighbor.point.x,neighbor.point.y,neighbor.point.z)));
  const edgeGeometry=new THREE.BufferGeometry();edgeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(edges,3));
  const edgeMaterial=new THREE.LineBasicMaterial({color:0x5baab8,transparent:true,opacity:.22});
  environment.add(new THREE.LineSegments(edgeGeometry,edgeMaterial));
  const coreGeometry=new THREE.IcosahedronGeometry(2.2,1);
  const coreMaterial=new THREE.MeshBasicMaterial({color:0x8ce4df,wireframe:true,transparent:true,opacity:.32});
  const core=new THREE.Mesh(coreGeometry,coreMaterial);core.position.z=-19;environment.add(core);
  const pulseGeometry=new THREE.SphereGeometry(.18,8,8),pulseMaterial=new THREE.MeshBasicMaterial({color:0xc0ff72});
  const pulse=new THREE.Mesh(pulseGeometry,pulseMaterial);environment.add(pulse);
  let selected=0,pulseProgress=0,time=0,px=0,py=0;
  camera.position.set(0,.3,3);camera.lookAt(0,0,-19);
  const playback=scenePlayback(el,(width,height)=>{
   camera.aspect=width/height;camera.updateProjectionMatrix();
   renderer.setPixelRatio(Math.min(devicePixelRatio,width<600?1.25:1.5));renderer.setSize(width,height);
  },(delta,moving)=>{
   if(moving){
    time+=delta;
    environment.rotation.y=Math.sin(time*.000045)*.22;environment.rotation.z=Math.sin(time*.00003)*.045;
    core.rotation.x=time*.00009;core.rotation.y=time*.00013;
    pulseProgress=(pulseProgress+delta*.00035)%1;
    edgeMaterial.opacity=.2+Math.sin(time*.0006)*.055;
    const settle=1-Math.exp(-delta*.0011);
    camera.position.x+=(px*1.5-camera.position.x)*settle;camera.position.y+=(-py*.8+.3-camera.position.y)*settle;
   }
   pulse.position.lerpVectors(core.position,locations[selected],moving?pulseProgress:.5);
   pulse.scale.setScalar(1+Math.sin((moving?pulseProgress:.5)*Math.PI)*1.8);
   camera.lookAt(0,0,-19);renderer.render(scene,camera);
  });
  const select=(event:Event)=>{const index=(event as CustomEvent<number>).detail;if(!Number.isFinite(index))return;selected=((Math.trunc(index)*19)%locations.length+locations.length)%locations.length;pulseProgress=0;playback.refresh()};
  const move=(event:PointerEvent)=>{const bounds=el.getBoundingClientRect();if(!bounds.width||!bounds.height)return;px=((event.clientX-bounds.left)/bounds.width-.5)*2;py=((event.clientY-bounds.top)/bounds.height-.5)*2};
  window.addEventListener('neural-select',select);window.addEventListener('pointermove',move);
  return()=>{playback.dispose();window.removeEventListener('pointermove',move);window.removeEventListener('neural-select',select);pointGeometry.dispose();pointMaterial.dispose();edgeGeometry.dispose();edgeMaterial.dispose();coreGeometry.dispose();coreMaterial.dispose();pulseGeometry.dispose();pulseMaterial.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="ambient-flight immersive-flight" aria-hidden="true"><div ref={mount} className="immersive-canvas"/><div className="ambient-vignette"/></div>
}
