import React, {useEffect,useRef} from 'react';
import * as THREE from 'three';
export function createRenderer(){
 try{return new THREE.WebGLRenderer({alpha:true,antialias:true})}catch{return null}
}


export function DraxWorld(){const mount=useRef<HTMLDivElement>(null);useEffect(()=>{if(!mount.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=mount.current,scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,el.clientWidth/el.clientHeight,.1,100);cam.position.z=6;const r=createRenderer();if(!r)return;r.setPixelRatio(Math.min(devicePixelRatio,1.5));r.setSize(el.clientWidth,el.clientHeight);el.appendChild(r.domElement);const groups:THREE.Points[]=[];for(let g=0;g<4;g++){const geo=new THREE.BufferGeometry(),arr=new Float32Array(80*3);const cx=(g-1.5)*1.55,cy=(g%2?-.5:.5);for(let i=0;i<80;i++){arr[i*3]=cx+(Math.random()-.5)*1.2;arr[i*3+1]=cy+(Math.random()-.5)*1.25;arr[i*3+2]=(Math.random()-.5)*1.5}geo.setAttribute('position',new THREE.BufferAttribute(arr,3));const mat=new THREE.PointsMaterial({size:.045,color:g===1?0x9dff4b:0x171610,transparent:true,opacity:g===1?.95:.42});const pts=new THREE.Points(geo,mat);groups.push(pts);scene.add(pts)}let mx=0,my=0;const move=(e:PointerEvent)=>{const b=el.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5};el.addEventListener('pointermove',move);let af=0;const draw=()=>{cam.position.x+=(mx*.5-cam.position.x)*.03;cam.position.y+=(-my*.35-cam.position.y)*.03;groups.forEach((p,i)=>p.rotation.y+=.0008+i*.0002);r.render(scene,cam);af=requestAnimationFrame(draw)};draw();const ro=new ResizeObserver(()=>{cam.aspect=el.clientWidth/el.clientHeight;cam.updateProjectionMatrix();r.setSize(el.clientWidth,el.clientHeight)});ro.observe(el);return()=>{cancelAnimationFrame(af);ro.disconnect();el.removeEventListener('pointermove',move);groups.forEach(p=>{p.geometry.dispose();(p.material as THREE.Material).dispose()});r.dispose();if(el.contains(r.domElement))el.removeChild(r.domElement)}},[]);return <div className="world-visual drax-visual"><div ref={mount} className="drax-three"/><div className="visual-caption"><b>SEMANTIC SPACE</b><span>query → neighbors → context</span></div></div>}

export function SystemConstellation(){const mount=useRef<HTMLDivElement>(null);useEffect(()=>{if(!mount.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=mount.current,scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(42,el.clientWidth/el.clientHeight,.1,100);cam.position.z=7;const r=createRenderer();if(!r)return;r.setPixelRatio(Math.min(devicePixelRatio,1.5));r.setSize(el.clientWidth,el.clientHeight);el.appendChild(r.domElement);const count=420,geo=new THREE.BufferGeometry(),arr=new Float32Array(count*3),target=new Float32Array(count*3);for(let i=0;i<count;i++){arr[i*3]=(Math.random()-.5)*10;arr[i*3+1]=(Math.random()-.5)*6;arr[i*3+2]=(Math.random()-.5)*3;const a=i/count*Math.PI*10,radius=1.2+(i%70)/70*2.4;target[i*3]=Math.cos(a)*radius;target[i*3+1]=Math.sin(a)*radius*.55;target[i*3+2]=(Math.random()-.5)*1.5}geo.setAttribute('position',new THREE.BufferAttribute(arr,3));const mat=new THREE.PointsMaterial({size:.025,color:0x151410,transparent:true,opacity:.52});const cloud=new THREE.Points(geo,mat);scene.add(cloud);let form=0,af=0;const draw=()=>{form+=(1-form)*.012;const pos=geo.attributes.position as THREE.BufferAttribute;for(let i=0;i<count;i++){pos.array[i*3]+=(target[i*3]-pos.array[i*3])*.012;pos.array[i*3+1]+=(target[i*3+1]-pos.array[i*3+1])*.012;pos.array[i*3+2]+=(target[i*3+2]-pos.array[i*3+2])*.012}pos.needsUpdate=true;cloud.rotation.z+=.0005;r.render(scene,cam);af=requestAnimationFrame(draw)};draw();const ro=new ResizeObserver(()=>{cam.aspect=el.clientWidth/el.clientHeight;cam.updateProjectionMatrix();r.setSize(el.clientWidth,el.clientHeight)});ro.observe(el);return()=>{cancelAnimationFrame(af);ro.disconnect();geo.dispose();mat.dispose();r.dispose();if(el.contains(r.domElement))el.removeChild(r.domElement)}},[]);const nodes=[['LLMs','DRAX · DACHAT'],['AGENTS','WARREN & CARTER'],['RETRIEVAL','DRAX'],['VISION','EMOTION MATRIX'],['APIs','FASTAPI · FLASK'],['DATA','TUBMAN · SYMNN'],['EVALUATION','VALIDATION · REVIEW'],['DEPLOYMENT','DOCKER · CLOUD'],['CAUSAL','CAUSAL MED']];return <section className="constellation" id="map"><div ref={mount} className="three-field"/><div className="constellation-copy"><span>EVERYTHING RECONNECTS</span><h2>SYSTEM<br/><i>constellation.</i></h2></div><div className="node-field">{nodes.map(([n,s],i)=><div className={`sys-node n${i}`} key={n}><strong>{n}</strong><small>{s}</small></div>)}</div></section>}


export function AmbientFlight(){
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const renderer=createRenderer();if(!renderer)return;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color('#080c11');scene.fog=new THREE.FogExp2('#080c11',.025);
  const camera=new THREE.PerspectiveCamera(62,1,.1,160);
  const environment=new THREE.Group();scene.add(environment);
  const positions:number[]=[];
  const locations:THREE.Vector3[]=[];
  // An abstract neural graph rather than an anatomical representation.
  for(let i=0;i<160;i++){
   const angle=i*2.399963, y=1-2*(i+.5)/160;
   const radius=9+Math.sin(i*1.7)*2;
   const v=new THREE.Vector3(Math.cos(angle)*Math.sqrt(1-y*y)*radius,y*radius*.68,Math.sin(angle)*Math.sqrt(1-y*y)*radius-19);
   locations.push(v);positions.push(v.x,v.y,v.z);
  }
  const pointGeometry=new THREE.BufferGeometry();pointGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const pointMaterial=new THREE.PointsMaterial({color:0xa9e8ee,size:.1,transparent:true,opacity:.9});
  environment.add(new THREE.Points(pointGeometry,pointMaterial));
  const edges:number[]=[];
  locations.forEach((v,i)=>locations.map((p,j)=>({p,j,d:v.distanceTo(p)})).filter(n=>n.j>i&&n.d<4.8).slice(0,4).forEach(n=>edges.push(v.x,v.y,v.z,n.p.x,n.p.y,n.p.z)));
  const edgeGeometry=new THREE.BufferGeometry();edgeGeometry.setAttribute('position',new THREE.Float32BufferAttribute(edges,3));
  const edgeMaterial=new THREE.LineBasicMaterial({color:0x5baab8,transparent:true,opacity:.22});
  environment.add(new THREE.LineSegments(edgeGeometry,edgeMaterial));
  const coreGeometry=new THREE.IcosahedronGeometry(2.2,1);
  const coreMaterial=new THREE.MeshBasicMaterial({color:0x8ce4df,wireframe:true,transparent:true,opacity:.32});
  const core=new THREE.Mesh(coreGeometry,coreMaterial);core.position.z=-19;environment.add(core);
  const pulseGeometry=new THREE.SphereGeometry(.18,8,8);
  const pulseMaterial=new THREE.MeshBasicMaterial({color:0xc0ff72});
  const pulse=new THREE.Mesh(pulseGeometry,pulseMaterial);environment.add(pulse);
  let selected=0,pulseProgress=0;
  const select=(event:Event)=>{selected=(event as CustomEvent<number>).detail*19%locations.length;pulseProgress=0};
  window.addEventListener('neural-select',select);
  let af=0,last=0,time=0,px=0,py=0;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.render(scene,camera)};
  const move=(e:PointerEvent)=>{px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2};
  const draw=(now:number)=>{
   af=requestAnimationFrame(draw);if(now-last<33)return;
   const delta=last?Math.min(now-last,50):0;last=now;time+=delta;
   environment.rotation.y=Math.sin(time*.000045)*.22;
   environment.rotation.z=Math.sin(time*.00003)*.045;
   core.rotation.x=time*.00009;core.rotation.y=time*.00013;
   pulseProgress=(pulseProgress+delta*.00035)%1;
   pulse.position.lerpVectors(core.position,locations[selected],pulseProgress);
   pulse.scale.setScalar(1+Math.sin(pulseProgress*Math.PI)*1.8);
   edgeMaterial.opacity=.2+Math.sin(time*.0006)*.055;
   camera.position.x+=(px*1.5-camera.position.x)*.035;
   camera.position.y+=(-py*.8+.3-camera.position.y)*.035;
   camera.lookAt(0,0,-19);
   renderer.render(scene,camera);
  };
  const sync=()=>{cancelAnimationFrame(af);last=0;if(!document.hidden&&!media.matches)af=requestAnimationFrame(draw);else renderer.render(scene,camera)};
  camera.position.set(0,.3,3);camera.lookAt(0,0,-45);resize();sync();
  addEventListener('resize',resize);addEventListener('pointermove',move);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);
  return()=>{cancelAnimationFrame(af);removeEventListener('resize',resize);removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync);window.removeEventListener('neural-select',select);pointGeometry.dispose();pointMaterial.dispose();edgeGeometry.dispose();edgeMaterial.dispose();coreGeometry.dispose();coreMaterial.dispose();pulseGeometry.dispose();pulseMaterial.dispose();renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div className="ambient-flight immersive-flight" aria-hidden="true"><div ref={mount} className="immersive-canvas"/><div className="ambient-vignette"/></div>
}

