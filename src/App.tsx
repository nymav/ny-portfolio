import {useEffect, type ReactNode} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './styles.css';
import {profile, projects, outputs, experience, additionalWork, earlierWork} from './content';

gsap.registerPlugin(ScrollTrigger);
const cv = `${import.meta.env.BASE_URL}Nikhil_Yarra_CV.pdf`;

export default function App() {
  useEffect(() => {
    document.title = 'Nikhil Yarra | AI Engineering & Research';
    const deep = projects.find(p => location.pathname.includes('/work/' + p.id));
    if (deep) requestAnimationFrame(() => document.getElementById(deep.id)?.scrollIntoView());
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({lerp: 0.11});
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.from('.v-name', {opacity: 0, duration: 1.4, ease: 'power3.out', stagger: 0.15});
      gsap.from('.hero .col > *', {opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.4});
      gsap.utils.toArray<HTMLElement>('.giant').forEach(el =>
        gsap.fromTo(el, {xPercent: 6}, {xPercent: -16, ease: 'none', scrollTrigger: {trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true}}));
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el =>
        gsap.from(el, {opacity: 0, y: 40, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: el, start: 'top 90%'}}));
      gsap.utils.toArray<HTMLElement>('.rule').forEach(el =>
        gsap.from(el, {scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut', scrollTrigger: {trigger: el, start: 'top 92%'}}));
      gsap.from('.amp', {opacity: 0, duration: 1.6, ease: 'power3.out', scrollTrigger: {trigger: '.teyrin', start: 'top 70%'}});
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <>
    <header className="nav">
      <a href="#top">NY</a>
      <nav aria-label="Sections"><a href="#work">Work</a><a href="#research">Research</a><a href="#teyrin">Teyrin</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
      <a href={cv} target="_blank" rel="noopener noreferrer">CV</a>
    </header>
    <main>
      <Hero/>
      <Question/>
      {projects.map((p, i) => <Project key={p.id} p={p} i={i}/>)}
      <Research/>
      <Teyrin/>
      <Experience/>
      <Archive/>
      <Contact/>
    </main>
  </>;
}

function Hero() {
  return <section className="hero orange" id="top">
    <Grain/>
    <div className="v-name v-left" aria-hidden="true">Nikhil</div>
    <div className="v-name v-right" aria-hidden="true"><em>Yarra.</em></div>
    <div className="col">
      <h1 className="sr">Nikhil Yarra</h1>
      <p className="label">AI engineer<br/>Founder, Teyrin</p>
      <p className="lead">I build AI you can check. Retrieval, agents and evaluation that show <em>where an answer came from,</em> and where it fails.</p>
      <p className="links"><a href="#work">See the work</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
    </div>
  </section>;
}

function Question() {
  return <section className="question dark">
    <p className="label" data-reveal>The question I work on</p>
    <p className="q" data-reveal>How can we tell whether an AI agent's answer is supported by the evidence its tools <em>actually returned?</em></p>
    <div className="rule"/>
    <p className="facts" data-reveal><span><b>2</b> research outputs</span><span><b>3</b> evaluated systems</span><span><b>4+</b> years in data and AI</span></p>
  </section>;
}

const results: Record<string, ReactNode> = {
  docatlas: <><p className="big">1.00 <em>vs</em> 0.67</p><p className="cap">Correct abstention on out-of-corpus questions, BM25 versus hybrid. Both reached evidence recall@5 of 0.958, so BM25 stays the default.</p></>,
  modelguard: <><p className="big">13 <em>to</em> 10 <em>to</em> 15</p><p className="cap">Cases passing out of 16: baseline, regressed candidate, recovery. Matched with an exact McNemar test and Wilson intervals.</p></>,
  docmend: <><p className="big">8 · 6 · 10</p><p className="cap">Of 24 reserved cases: stale sections repaired, uncertain ones deferred to a human, accurate ones left untouched. None wrongly changed.</p></>,
};
const sources: Record<string, [string, string]> = {
  docatlas: ['https://github.com/nymav/docatlas#measured-not-assumed', 'Results table in the DocAtlas README'],
  modelguard: ['https://github.com/nymav/modelguard/blob/main/artifacts/demo/demo.json', 'Recorded run: artifacts/demo/demo.json'],
  docmend: ['https://github.com/nymav/docmend/blob/main/artifacts/module-enhancements/offline-validation.json', 'Challenge split: offline-validation.json'],
};
const tones = ['cream', 'dark', 'orange'];

function Project({p, i}: {p: typeof projects[number]; i: number}) {
  const tone = tones[i % 3];
  return <section className={`project ${tone}`} id={p.id}>
    {tone === 'orange' && <Grain/>}
    {i === 0 && <p className="label sec" id="work">Selected systems</p>}
    <div className="giant" aria-hidden="true">{p.name}</div>
    <div className="p-grid">
      <div className="p-head" data-reveal>
        <p className="label">{String(i + 1).padStart(2, '0')} / {p.category}</p>
        <h2>{p.name}</h2>
        <p className="p-q"><em>{p.question}</em></p>
        <div className="result">{results[p.id]}<p className="src">Source of these numbers: <a href={sources[p.id][0]} target="_blank" rel="noopener noreferrer">{sources[p.id][1]}</a></p></div>
      </div>
      <div className="p-body" data-reveal>
        <p className="desc">{p.description}</p>
        <dl>
          <dt>Built</dt><dd>{p.implementation}</dd>
          <dt>Tested</dt><dd>{p.validation}</dd>
          <dt>Limit</dt><dd>{p.limit}</dd>
        </dl>
        <p className="stack">{p.stack}</p>
        <p className="links"><a href={p.repository} target="_blank" rel="noopener noreferrer">Source</a><a href={p.evidence} target="_blank" rel="noopener noreferrer">{p.evidenceLabel}</a></p>
      </div>
    </div>
  </section>;
}

function Research() {
  return <section className="research dark" id="research">
    <p className="label" data-reveal>Research, in the record</p>
    {outputs.map(o => <a className="credit" key={o.doi} href={o.url} target="_blank" rel="noopener noreferrer" data-reveal>
      <span className="role">{o.venue}<br/>{o.date}</span>
      <span className="who">{o.title}<small>{o.description} doi:{o.doi}</small></span>
    </a>)}
  </section>;
}

function Teyrin() {
  return <section className="teyrin orange" id="teyrin">
    <Grain/>
    <div className="amp" aria-hidden="true">&amp;</div>
    <p className="label" data-reveal>Now</p>
    <h2 data-reveal>Building <span className="word">TEYR<b>I</b>N</span></h2>
    <p className="t-lead" data-reveal>Most software adds work. <em>Teyrin Labs builds the kind that takes it away.</em></p>
    <p className="t-body" data-reveal>Our first product, Medora, runs the whole clinic: the doctor's notes, the front desk, the nurses and the bill, each person seeing only what they should. With Medora Ops, AI agents take on everything around the doctor. Doctors practise medicine. <b>Medora handles the rest.</b></p>
    <p className="links" data-reveal><a href="https://teyrinlabs.com/" target="_blank" rel="noopener noreferrer">teyrinlabs.com</a></p>
  </section>;
}

function Experience() {
  const rows = [{dates: 'Now', role: 'Founder', company: 'Teyrin Labs', description: 'Building practical AI products, starting with Medora.'}, ...experience,
    {dates: '2023 – 2024', role: 'M.S. Data Science', company: 'New Jersey Institute of Technology, USA', description: ''},
    {dates: '2019 – 2023', role: 'B.Tech. Computer Science', company: 'GITAM, India', description: ''}];
  return <section className="exp cream" id="experience">
    <p className="label" data-reveal>Where I've worked</p>
    <div className="rule"/>
    {rows.map(e => <div className="row" key={e.role + e.company} data-reveal>
      <span className="when">{e.dates}</span>
      <span className="what"><b>{e.role}</b> <em>{e.company}</em>{e.description && <small>{e.description}</small>}</span>
    </div>)}
  </section>;
}

function Archive() {
  return <section className="archive dark">
    <p className="label" data-reveal>Also made</p>
    <div className="rule"/>
    {[...additionalWork.slice(1), ...earlierWork].map(w =>
      <a className="row" key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" data-reveal>
        <span className="what"><b>{w.name}</b> <small>{w.description}</small></span>
      </a>)}
  </section>;
}

function Contact() {
  return <section className="contact orange" id="contact">
    <Grain/>
    <p className="label">Research, engineering or Teyrin</p>
    <a className="talk" href={`mailto:${profile.email}`}>Let's <em>talk.</em></a>
    <p className="links big-links"><a href={`mailto:${profile.email}`}>Email</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={cv} target="_blank" rel="noopener noreferrer">CV</a></p>
    <p className="foot"><span>© {new Date().getFullYear()} Nikhil Yarra</span><a href="#top">Back to top</a></p>
  </section>;
}

function Grain() { return <div className="grain" aria-hidden="true"/>; }
