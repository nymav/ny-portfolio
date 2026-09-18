# Portfolio upgrade plan

## Direction

Use the reference portfolio's evidence-first hierarchy and quiet editorial pacing as a quality bar, while keeping Nikhil's own monochrome visual language, projects, links, and portrait. The page should feel like a considered field notebook for applied AI rather than a template or a dashboard.

## Phases

1. **Information architecture** — make the opening answer three questions quickly: who Nikhil is, what he builds, and where the proof is. Keep one continuous page with six anchors: identity, systems, case study, about, experience, contact. Give each anchor a distinct job and remove repeated filler copy.
2. **Hero and identity** — establish a compact point of view, a plain-language capability line, and the portrait as an editorial signal. Keep the hero calm and legible on narrow screens; motion should support reading rather than compete with it.
3. **Experience as a living index** — keep the compact selector, auto-cycle it only while visible, and make each entry scannable: role, place, period, one concrete contribution, then a moving focus ribbon. Keyboard selection and reduced-motion behavior remain first-class.
4. **Projects as evidence** — lead with the project directory, make the active project easy to identify, preserve source links, and cycle problem/implementation/outcome automatically. Remove generic diagrams and use the repository facts as the proof layer.
5. **Motion system** — keep the anchored page-turn transition and subtle fades, but centralize timing and disable it cleanly for reduced-motion or paused mode. Auto-scrolling strips pause on hover, focus, touch, and keyboard interaction.
6. **Responsive and performance pass** — use fluid type and spacing, avoid fixed viewport heights, prevent horizontal overflow, lazy-load the portrait, and verify desktop, tablet, and 390px layouts. Check runtime errors and navigation/resource timing after the visual pass.
7. **Final QA** — validate every anchor, focus state, auto-cycle, source link, and overflow condition; build production assets and record the resulting checks before handoff.

## Acceptance checks

- The first viewport states identity, focus, and a route into real work.
- Experience and project subcontent changes without a click, but stops when a visitor interacts.
- No generic architecture illustration or repeated decorative block is required to understand a project.
- Sections reflow without clipped text, forced wide canvases, or horizontal scrolling.
- `prefers-reduced-motion` and the motion pause control stop every automatic animation.
- All external links remain tied to the existing project evidence; no rival facts or copy are imported.


## Reference review — 18 September 2026

Reference: https://azeez-shaik.vercel.app/ (main, Creative Space, and Contact).

- Main opening: a clear identity, narrow professional focus, and restrained foreground over a moving field. Adapted the clarity, not its centered composition or language.
- About: portrait, contextual prose, and factual credentials provide more trust than another manifesto. Added Nikhil’s supplied portrait and existing role/education facts.
- Experience/research: specific evidence and links carry the section. Kept Nikhil’s own source-backed project links and compact experience. Did not invent research or awards to fill equivalent sections.
- Projects: reference auto-carousel saves space but hides items. Our three visible featured summaries supplement the automatic complete-project strip and case-study cycle.
- Creative Space: separate personality-led visual treatment and media. No unrelated gallery/music copied into this portfolio.
- Contact: explicit reasons to reach out. Our contact section uses a short invitation and direct existing LinkedIn/GitHub links.
- Observed main-page console: no errors during reviewed navigation. Public HTML probe returned HTTP 200, 148,878 bytes, approximately 0.65 s first byte / 0.70 s total in one local measurement. This is HTML transfer only, not a Lighthouse, LCP, INP, or real-user performance score. Browser timing API was unavailable in this inspection environment.

## Implementation completed

- [x] Reordered journey: identity → selected work → inspectable case study → portrait/about → experience → contact.
- [x] Rebuilt asymmetric personal hero and quieter monochrome composition.
- [x] Added three directly readable project summaries with repository links.
- [x] Preserved automatic project reel, case studies, subcontent, and experience cycling.
- [x] Replaced accumulated stylesheet overrides with one fluid responsive system.
- [x] Retained section lift/overlap and backing fade, with reduced-motion / pause paths.
- [x] Reworked portrait, factual background, compact experience and welcoming contact.
- [x] Production build passes; CSS approximately 15.5 KB (4.3 KB gzip), JS 359.41 KB (121.88 KB gzip), before final minor alignment adjustment.

## Verification record

- Desktop 1280 × 720: hero, projects, case-study and portrait visually inspected.
- Phone 390 × 844: hero inspected; document width and scroll width both 390 px; portrait loaded.
- Project subcontent observed moving from Problem to repository evidence without clicking.
- Browser console initially empty after project navigation.
- Tablet 768 × 1024: experience and contact inspected; document width equals scroll width.
- Compact phone 320 × 740: selected work visually inspected; no horizontal document overflow.
- Wide desktop 1920 × 1080: document width equals scroll width.
- Index navigation exercised for identity, work, about, projects and contact; project selection opens the case study.
- Global pause verified: paused state true and zero pin wrappers; resume restores motion.
- Experience auto-cycle observed selecting different roles; project detail auto-cycle observed without interaction.
- Final browser console: no errors. Build and git diff whitespace checks pass.
- Reduced-motion code paths retained and reviewed; OS reduced-motion emulation was not available in the browser inspection API.
- Section overlap reduced to at most 72 px so it covers less of the outgoing content; navigation now has a soft backing fade.
- This is a local preview, not a deployed update. No claim of measured Core Web Vitals is made.

## Evidence pass — 18 September 2026
- Added sourced evidence for DRAX, Emotion Matrix and Airspace. Read the public repositories and actual retrieval/vector-store code; distinguish implementation from claims of validation.
- DRAX: eight retrieved chunks, strict-mode fallback, and estimated page metadata limitation.
- Emotion: four README-reported accuracy values plus the separately reported F1/AUC discrepancy. No fresh benchmark or general emotion-recognition claim.
- Airspace: original scaling artifact and 170–307 second reported 12-node run, with Oozie placeholder limitation.
- Added direct email already published in the portfolio README; clarified hero positioning; lowered background lettering after hero; extended detail timing.
- Desktop 1440×900 and mobile 390×844 visually reviewed. Mobile document width 390 with no horizontal overflow; console error check empty; production build and whitespace check passed.
- Workplace delivery examples await owner confirmation. No invented outcomes or résumé file added.
