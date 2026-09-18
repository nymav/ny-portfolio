import {useRef, useState, type KeyboardEvent} from 'react';
import './experience.css';
import ContentRibbon from './ContentRibbon';
import {useAutoAdvance} from './Motion';

const experiences = [
  {
    id: 'warren-carter', company: 'Warren & Carter', year: '2026—NOW',
    role: 'AI Engineer', kind: 'Experience', focus: 'Models, tools & review',
    brief: 'Models meet tools, retrieval, multimodal inputs and review paths.',
    tags: ['Agentic workflows', 'RAG', 'Multimodal', 'Tool routing', 'FastAPI', 'Validation'],
    trace: 'M24 40H77L123 94H167M24 94H167M24 148H77L123 94M167 94H204L250 40H294M204 94H294M204 94L250 148H294',
    points: [[24, 40], [24, 94], [24, 148], [167, 94], [294, 40], [294, 94], [294, 148]],
  },
  {
    id: 'tubman', company: 'Tubman Technologies', year: '2025—2026',
    role: 'Data Analyst', kind: 'Experience', focus: 'From raw data to useful signals',
    brief: 'Noisy healthcare and financial data becomes reliable analytical and AI-ready material.',
    tags: ['ETL', 'Python', 'SQL', 'RAG data prep', 'Power BI', 'Tableau'],
    trace: 'M24 45L82 74L126 94H184L237 58H294M24 94H126M24 143L82 113L126 94M184 94L237 130H294',
    points: [[24, 45], [24, 94], [24, 143], [126, 94], [184, 94], [294, 58], [294, 130]],
  },
  {
    id: 'njit', company: 'NJIT', year: '2023—2024',
    role: 'M.S. Data Science', kind: 'Education', focus: 'Learning the shape of intelligence',
    brief: 'Deep learning, reinforcement learning, AI, machine learning and statistics.',
    tags: ['Deep learning', 'Reinforcement learning', 'AI', 'ML', 'Statistics'],
    trace: 'M42 130L108 36L170 130L236 36L282 130M42 130H282M108 36H236M108 36L236 130M170 130L236 36',
    points: [[42, 130], [108, 36], [170, 130], [236, 36], [282, 130]],
  },
  {
    id: 'symnn', company: 'SYMNN', year: '2022—2023',
    role: 'Data Analyst', kind: 'Experience', focus: 'Patterns across time & capacity',
    brief: 'Telecom utilization becomes time-series and capacity intelligence.',
    tags: ['Telecom data', 'Time series', 'Predictive modeling', 'Validation'],
    trace: 'M24 132H56L78 72L108 109L133 48L161 88L191 60L222 99L253 32L294 61',
    points: [[24, 132], [78, 72], [133, 48], [191, 60], [253, 32], [294, 61]],
  },
] as const;

export default function Experience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const experience = experiences[active];
  useAutoAdvance('work',()=>setActive(value=>(value+1)%experiences.length));

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % experiences.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + experiences.length - 1) % experiences.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = experiences.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section className="experience" id="work" aria-labelledby="experience-title">
    <div className="experience-inner"><span id="about" className="about-anchor" aria-hidden="true"/>
      <header className="experience-heading">
        <div>
          <p className="experience-eyebrow"><span aria-hidden="true">02 /</span> Experience & education</p>
          <h2 id="experience-title">A path through<br/><i>data & AI.</i></h2>
        </div>
        <div className="experience-person"><img src={`${import.meta.env.BASE_URL}nikhil-portrait-small.jpg`} width="480" height="480" loading="lazy" alt="Nikhil Yarra"/><div><p className="experience-intro">Applied AI and data engineering.<br/>M.S. Data Science, NJIT.</p><a className="text-link" href="https://www.linkedin.com/in/nikhil-yarra/" target="_blank" rel="noreferrer">Professional background ↗</a></div></div>
      </header>

      <div className="experience-tabs" role="tablist" aria-label="Explore experience and education">
        {experiences.map((item, index) => <button
          className="experience-tab"
          key={item.id}
          ref={node => { tabs.current[index] = node; }}
          role="tab"
          id={`experience-tab-${item.id}`}
          aria-controls={`experience-panel-${item.id}`}
          aria-selected={active === index}
          tabIndex={active === index ? 0 : -1}
          onClick={() => setActive(index)}
          onKeyDown={event => navigate(event, index)}
        >
          <span className="experience-tab-meta"><span>{item.year}</span><span className="experience-dot" aria-hidden="true"/></span>
          <span className="experience-tab-name">{item.company}</span>
          <span className="experience-tab-kind">{item.kind === 'Education' ? 'Education' : item.role}</span>
        </button>)}
      </div>

      {experiences.map((item, index) => <div
        key={item.id}
        className="experience-panel"
        role="tabpanel"
        id={`experience-panel-${item.id}`}
        aria-labelledby={`experience-tab-${item.id}`}
        hidden={active !== index}
        tabIndex={0}
      >{active === index && <>
        <div className="experience-copy">
          <p className="experience-role"><span>{item.kind}</span><span aria-hidden="true">/</span>{item.role}</p>
          <h3>{item.company}</h3>
          <p className="experience-brief">{item.brief}</p>
          <ContentRibbon label="Areas of focus" items={item.tags}/>
        </div>

      </>}</div>)}

      <footer className="experience-footer">
        <p><span className="experience-position">{String(active + 1).padStart(2, '0')}</span><span aria-hidden="true"> / </span><span className="experience-total">04</span><span className="experience-footer-date">{experience.year}</span></p>
        <div className="experience-arrows" aria-label="Experience navigation">
          <button type="button" onClick={() => setActive((active + experiences.length - 1) % experiences.length)} aria-label="Previous experience"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => setActive((active + 1) % experiences.length)} aria-label="Next experience"><span aria-hidden="true">→</span></button>
        </div>
        <span className="experience-sr-only" role="status" aria-live="off">{experience.company}, {experience.role}, {experience.year}</span>
      </footer>
    </div>
  </section>;
}
