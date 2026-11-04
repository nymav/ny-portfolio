# Black-particle portfolio: layout and interaction audit

Reviewed 4 November 2026. This report supersedes the earlier light-theme and blue-film layout reports. The owner's selected base is the monochrome particle implementation preserved in `origin/main` before the redesign branch. The animation is the repository's canvas implementation, not a stock video substituted for it.

## Scope and conclusion

The audited product comprises one portfolio document with six main sections, three shareable project addresses, one quick-index dialog, six experience/education tabs, nine project-artifact views, an earlier-studies disclosure, a PDF opened in a separate browser tab, and a recovery page. External publisher, repository, LinkedIn and email applications are destinations, not portfolio-owned screens.

The repair pass retained the black particle background and original large name treatment. It replaced promotional headings with literal section labels; integrated current projects, research outputs and dates; corrected navigation and modal focus; reduced excess section spacing; and introduced motion inside content blocks rather than moving the section boxes used for navigation.

This is a browser/source audit, not a controlled usability experiment, accessibility certification or claim that every browser and device has been tested. Findings below distinguish direct checks from source inspection.

## Screen and state inventory

| Address or surface | Contents and placement | Open/change/close behavior |
|---|---|---|
| `/ny-portfolio/` | Fixed index/motion controls, full-height identity opening, then Projects, Research outputs, Experience and education, Products, Contact | Vertical document; direct section links and index navigation |
| `#identity` | Name at left, concise work description at right on desktop; stacked on a phone | Home and Back to top return here |
| `#systems` | Three project rows; summary and actions on left, an evidence preview on right | Project name or Explore the study opens the corresponding study |
| `#case-study` | Current project's title, question, implementation, validation/limits, interactive artifact, source links and tools | Inline expansion after the project directory; Close study removes it and returns focus to the directory |
| `/work/docatlas/` | Same portfolio with DocAtlas selected and expanded | Direct load and refresh select DocAtlas and position the study below fixed controls |
| `/work/modelguard/` | Same portfolio with ModelGuard selected and expanded | Direct load and refresh select ModelGuard |
| `/work/docmend/` | Same portfolio with DocMend selected and expanded | Direct load and refresh select DocMend |
| Quick index dialog | Name, six section links, location and CV link | Native modal; explicit Close and Escape; Tab/Shift+Tab wrap within controls; focus returns to index opener |
| `#research` | Two research records, each with venue/date, full title, short description and DOI destination | Two columns on larger screens, one column on phones |
| `#work` | Education/experience heading, portrait and background link, six tabs, active detail panel, Previous/Next controls | Exactly one selected tab/panel; arrow keys, Home and End supported |
| `#products` | Medora, GlassPDF and Mailayer summaries, followed by earlier-studies disclosure | Links open destination sites; disclosure expands/collapses locally |
| Earlier studies | DRAX TBS, image-classification study, flight-data analysis | Each has a description and repository link; no second carousel or hidden horizontal list |
| `#contact` | Contact heading, purpose line, Email/LinkedIn/GitHub/CV links, signature and Back to top | Email opens mail client; CV and external links open a separate tab |
| `/Nikhil_Yarra_CV.pdf` | Existing one-page CV in browser PDF viewer | Browser controls handle zoom, print and download; portfolio does not replace the viewer |
| `/404.html` | Page not found, explanation, Return to portfolio and GitHub profile | Portfolio return link tested locally; actual missing-address status is supplied by GitHub Pages |

The three project addresses are not three independently maintained copies of the application. Build output supplies their metadata and entry documents; the application selects the project from the pathname. This avoids mismatched content between an inline study and its shareable address.

## Large layout relationships

### Identity opening

The opening intentionally fills one viewport. That is the cinematic composition selected by the owner, rather than a content section with an unexplained minimum height. The name remains the primary visual element. The work description identifies LLM application development, retrieval, integration and evaluation; it does not assert a research result or customer outcome.

The particle layer is fixed behind the document, excluded from the accessibility tree and unable to intercept clicks. Desktop and phone particle counts are bounded separately. A dark layer suppresses the animation beneath reading sections. Fixed top controls have their own opaque backing so scrolled text does not show through them.

### Project directory

Each row keeps the project name, description, study action and repository action together. The adjacent artifact illustrates the same project. On phones the description precedes its artifact; there is no sideways scrolling. Row spacing was reduced to a bounded 44–80px range instead of accumulating large gaps between each nested container.

DocAtlas displays an exact repository quotation. ModelGuard displays baseline/candidate/recovery counts with explicit synthetic-fixture labeling. DocMend displays a constructed signature-change example with an explicit limitation. These previews are evidence-oriented content, not invented dashboard screenshots.

### Research records

Titles wrap naturally, including the long SSRN title. Venue and date precede the title, and the record link follows the short description. Both records are owned research outputs; the layout does not claim journal peer review. The heading is simply “Research outputs.”

### Experience and education

Six entries now occupy a complete three-column, two-row grid on desktop and a two-column grid on a phone. The active panel is underneath the tab set. Role, institution/employer, summary and skills form one reading group. The functional counter is “1 of 6,” not a decorative section number. Previous and Next have visible text.

The panel reserves a modest amount of space to limit footer jumps when changing entries. It is not allowed to remain invisible while motion is paused. Skills are one wrapping list; duplicated moving ticker copies were removed.

### Products and contact

Product summaries use the same reading rhythm as research records. Medora is labeled a prototype in active development, with a Teyrin destination rather than an invented public source link. Earlier studies sit in one disclosure after the product summaries.

Contact is content-sized. The earlier viewport-height contact treatment was removed, its oversized title reduced, and the footer pulled closer to its links. The title is “Contact”; the invitation slogan and repeated promotional footer line were removed.

## Small layouts, text and controls

- Main section padding is bounded on desktop and 48px on phones. The cinematic hero retains its separate full-height rules.
- Project-detail columns collapse to one on phones. Long code and recovery commands wrap inside their own artifact.
- Artifact controls wrap across rows and maintain a minimum 44px height.
- Small navigation, date and section labels were raised to approximately 11px; body copy remains substantially larger. These are design choices, not a claim that small text is optimal for every viewer.
- Light text, muted secondary copy and thin separators carry the hierarchy. No new semantic meaning depends only on color.
- Focus outlines remain visible. The modal has explicit keyboard containment and restoration.
- Research titles use real titles from the owner's supplied records. The headings “Questions worth examining,” “From question to working system,” and the conversational marketing lines were removed.
- Displayed arrow glyphs and decorative `01 /` section labels were removed. Keyboard arrow-key navigation remains available as an input behavior.
- The public contact address is `nikhilyarra.mail@gmail.com`; the CV, portrait and owner links remain consistent with supplied information.

## Project artifact states

| Project | View | What it communicates |
|---|---|---|
| DocAtlas | Source passage | Exact public README quotation and source context |
| DocAtlas | Citation checks | Source identity, exact quotation and semantic support are different checks |
| DocAtlas | Failure found | Documented local-provider truncation/unsupported-claim failure; not a general model-quality claim |
| ModelGuard | Baseline | 13 of 16 scripted cases pass |
| ModelGuard | Candidate | 10 of 16, four regressions and one improvement |
| ModelGuard | Recovery | 15 of 16; demonstrates the harness rather than live model performance |
| DocMend | Code change | Constructed explicit signature changes from timeout 30 to 60 |
| DocMend | Repair conditions | Evidence and scope restrictions before application |
| DocMend | Recovery | Journal/recovery procedure with its writer-safety condition |

All nine views were exercised at desktop and 390px width. Their labels, selected states and page overflow were inspected. These interactions do not issue live model requests or modify repositories.

## Motion specification

| Surface | Treatment | Guardrail |
|---|---|---|
| Background | Original black particle/ribbon canvas | Pause control, reduced-motion preference, hidden-page handling, mobile particle budget |
| Hero | Short staggered entrance for name and introduction | Content starts partly visible; no long loading gate |
| Section headings and rows | One-time vertical entrance with easing | Animation changes inner blocks, not section navigation geometry |
| Artifact previews | Small 24px total scroll-linked vertical displacement | No pinning, scroll capture or horizontal interaction |
| Project study opening | Title, explanation and artifact enter in sequence | No wait required before reading or closing |
| Index opening | Short opacity/vertical transition | Native modal is interactive immediately; explicit focus trap |
| Links and artifact buttons | Short hover/selected-state transitions | Visible text labels remain unchanged |
| Experience detail | Immediate replacement | No delayed typing or entrance fade hiding clinical-style factual text |

The motion provider listens for changes to the operating system's reduced-motion preference. CSS, canvas and GSAP paths all have a reduced-motion/pause path. The browser tests directly exercised the manual pause path; an OS-level preference change was inspected in code rather than changed on the owner's computer.

## Issues found and repairs

| Finding | Effect | Repair and verification |
|---|---|---|
| Global pause froze a newly inserted text animation at opacity zero | Experience panel could appear empty | Limited pause behavior, removed panel entrance fade, verified computed opacity 1 and animation none while paused |
| Restored experience grid assumed four entries | Six entries made incomplete rows and inconsistent spacing | Three columns on desktop, two on phones; all six selections exercised |
| Count remained hard-coded at 04 | Incorrect navigation context | Counter derives from actual entry count |
| Removing arrows left blank Previous/Next buttons | Unclear affordance | Replaced with visible words; wraparound tested |
| Skill labels were duplicated for a ticker | Repetition and partial text at rest | Single wrapping list; content no longer depends on animation |
| Index and document click handlers could both handle the same anchor | Competing navigation/focus behavior | Excluded modal links from document handler and used measured section positions |
| Modal boundary focus was not reliable in the first check | Tab could leave expected control sequence | Added explicit first/last focus handling; Shift+Tab reached CV, Tab returned to Close, Escape restored opener |
| Selected study URL could retain another project's pathname | Refresh could reopen wrong project | Project selection writes its own address; closing returns to the portfolio address |
| Contact used a viewport minimum and very large title | Empty vertical area at the bottom | Content-sized section and reduced title/footer spacing |
| Particle contrast competed with reading blocks | Additional visual noise | Stronger reading-layer backing, retained hero signature |
| Promotional headings obscured the actual section purpose | More words without more information | Literal Projects, Research outputs, Experience and education, Products, Contact labels |
| Restored employer date said NOW | Incorrect current-employment implication | Corrected Warren & Carter to Jan–Sep 2026; retained owner-confirmed job overlap |

## Validation evidence and limits

Production build: `npm run build:pages` (TypeScript and Vite), followed by `npm run audit:build`. The audit checks project evidence fields, contact address, prohibited arrow glyphs, generated project addresses and metadata, Pages asset paths, fonts, CV signature and recovery-page presence.

Browser matrix: 320×740, 390×844, 768×1024, 1024×768, 1176×800, 1440×900 and 844×390. Home and quick-index geometry were measured across all seven sizes, with zero measured horizontal overflow. Each of the three project addresses was measured across the same seven widths with zero document/artifact horizontal overflow. Short landscape dialogs remain vertically scrollable; scrollability is required where content exceeds the available height.

Behavioral checks included all nine artifact states at desktop and phone widths; all six experience selections; Home/End and Previous/Next wraparound; quick-index destinations; Escape and boundary focus; deep-link load/refresh; study close; expanded/collapsed earlier studies; native PDF opening; and recovery-page return. Captured runtime error log was empty in the tested browser session.

Evidence is in `output/black-particle-audit/`: viewport measurements, route checks, artifact-state records, experience-state records and screenshots. Earlier screenshots in that directory document intermediate findings; files prefixed `final-` represent the final visual pass. The new motion/spacing pass is followed by a final build and viewport check; earlier measurements are not described as a fresh exhaustive run of every possible combination.

Not claimed: testing every Cartesian combination of independent controls, a full screen-reader audit, Safari/Firefox/device-lab coverage, field Core Web Vitals, a slow-network benchmark, independent verification of every employer statement, or independent peer review of the papers. External destinations were checked as destinations; their login and application states are outside this portfolio. The PDF viewer's layout belongs to the browser. Third-party fonts have fallback fonts; those resources depend on network availability.
