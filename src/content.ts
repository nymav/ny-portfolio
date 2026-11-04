/** Portfolio facts checked against the owner's CV and linked project artifacts, 4 November 2026. */
export const profile = {
  name: 'Nikhil Yarra',
  email: 'nikhilyarra.mail@gmail.com',
  location: 'Hyderabad, India',
  github: 'https://github.com/nymav',
  linkedin: 'https://www.linkedin.com/in/nikhil-yarra/',
};
export const projects = [
  {
    id: 'docatlas', name: 'DocAtlas', category: 'Retrieval & grounding',
    title: 'An answer is only the beginning.',
    description: 'A local documentation workspace for finding passages, inspecting sources and evaluating retrieval. Optional generation adds cited draft answers.',
    question: 'How can a reader inspect the evidence behind a generated answer?',
    implementation: 'Persistent ingestion, BM25 search, optional dense and hybrid retrieval, source-ID checks and exact-quotation validation. The workspace keeps evidence mode available without a model API key.',
    validation: 'Reproducible retrieval comparisons and a live local-provider smoke test. That test exposed truncation and an unsupported claim despite a valid quotation, a useful limit of citation checks.',
    limit: 'A real quotation does not establish that the answer follows from it. Broader answer-quality evaluation remains necessary.',
    stack: 'Python · FastAPI · SQLite FTS5 · FastEmbed',
    repository: 'https://github.com/nymav/docatlas',
    evidence: 'https://github.com/nymav/docatlas/blob/main/docs/LIVE_PROVIDER_VALIDATION.md',
    evidenceLabel: 'Read the validation notes',
  },
  {
    id: 'modelguard', name: 'ModelGuard', category: 'Regression evaluation',
    title: 'What changed when the prompt changed?',
    description: 'Paired evaluation of a candidate prompt or model against a pinned baseline, with immutable run history and inspectable regression reports.',
    question: 'Which cases improve, which regress, and is an aggregate score hiding the difference?',
    implementation: 'Matched case comparisons, category metrics, exact McNemar tests, Wilson intervals, rolling degradation monitoring and GitHub Actions reports. Dataset and scoring identities must match before comparison.',
    validation: 'The recorded-response demo exercises regressions, recovery and a slow-drift warning. Python 3.11–3.13 and Docker CI validate the software.',
    limit: 'The demonstration is synthetic. Live-provider compatibility and an independently human-reviewed golden dataset are still pending.',
    stack: 'Python · Pydantic · SQLite · GitHub Actions',
    repository: 'https://github.com/nymav/modelguard',
    evidence: 'https://github.com/nymav/modelguard/blob/main/artifacts/demo/demo.json',
    evidenceLabel: 'Inspect the demo evidence',
  },
  {
    id: 'docmend', name: 'DocMend', category: 'Documentation integrity',
    title: 'Keep the explanation close to the code.',
    description: 'Documentation drift analysis across immutable Git revisions. Findings carry supporting evidence; narrowly scoped repairs are checked before application.',
    question: 'When code changes, which documented contracts need attention?',
    implementation: 'Python, TOML and opt-in JSON analysis; Markdown mapping; guarded repairs; SARIF reports; crash-recovery journals; PR lifecycle checks; and explicit runtime budgets.',
    validation: 'Version 0.3.0 passed 97 Python tests, 12 dashboard tests and remote Python/container CI. Frozen constructed evaluations observed no incorrect safe repairs in the three scored splits.',
    limit: 'These are software and constructed-fixture results. Live-provider, GitHub App and independently reviewed real-world validation remain unrun.',
    stack: 'Python · Git · Docker · GitHub Actions · SARIF',
    repository: 'https://github.com/nymav/docmend',
    evidence: 'https://github.com/nymav/docmend/blob/main/artifacts/module-enhancements/offline-validation.json',
    evidenceLabel: 'Inspect the validation record',
  },
] as const;
export const outputs = [
  { title: 'Tool-Observation Integrity in AI Agents: A Critical Survey of Validation, Provenance, and Execution Assurance', venue: 'SSRN', date: 'September 2026', description: 'A survey focused on how agent systems validate tool observations, preserve provenance and account for execution.', url: 'https://doi.org/10.2139/ssrn.7545819', doi: '10.2139/ssrn.7545819' },
  { title: 'Simulator Update Frequency Sensitivity in Driving Scenario Search', venue: 'Zenodo', date: 'October 2026', description: 'A study of simulator update frequency as a sensitivity variable in driving-scenario search.', url: 'https://doi.org/10.5281/zenodo.23817382', doi: '10.5281/zenodo.23817382' },
];
export const experience = [
  { role: 'AI Engineer', company: 'Warren and Carter Technologies Inc.', dates: 'Jan 2026 – Sep 2026', description: 'LLM workflows, retrieval, tool routing and structured outputs, with validation, fallbacks and human-review checkpoints.' },
  { role: 'Data Analyst', company: 'Tubman Technologies Inc.', dates: 'Apr 2025 – Feb 2026', description: 'Python and SQL workflows for healthcare and financial data preparation, document processing, validation and analysis.' },
  { role: 'Data Analyst', company: 'SYMNN', dates: 'Jul 2022 – Jul 2023', description: 'Telecom network and GIS analysis, predictive modelling, and datasets for utilisation and capacity planning.' },
  { role: 'Data Engineer Intern', company: 'Phoenix Global', dates: 'May 2022 – Jun 2022', description: 'Data cleaning, analysis and dashboards; led a five-member analytics project team.' },
];
export const additionalWork = [
  {name:'Medora',type:'Clinical workflow prototype',description:'Doctor, front-desk, nursing and billing workflows with role-based access. In active development through Teyrin.',url:'https://teyrinlabs.com/'},
  {name:'GlassPDF',type:'Local document tools',description:'PDF organisation, extraction, export and English OCR in a browser and desktop app.',url:'https://github.com/nymav/glasspdf'},
  {name:'Mailayer',type:'Email analysis',description:'Read-only Gmail analysis, local search and optional local-model assistance.',url:'https://github.com/nymav/mailayer'},
];
export const earlierWork = [
  {name:'DRAX TBS',description:'Textbook retrieval and local-model tutoring',url:'https://github.com/nymav/drax_tbs'},
  {name:'Facial-image classification',description:'A happy/sad transfer-learning study',url:'https://github.com/nymav/Face-Emotion-Detection-Using-CNNs'},
  {name:'Flight-data analysis',description:'Java MapReduce, Hadoop and Oozie',url:'https://github.com/nymav/Fligh-Data-Analysis-with-MapReduce'},
];
