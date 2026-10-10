# Nikhil Yarra — AI/ML Systems Portfolio

An interactive, cinematic portfolio for work across agentic AI, retrieval, multimodal ML, data systems, and applied research.

**Live site:** [nymav.github.io/ny-portfolio](https://nymav.github.io/ny-portfolio/)

## What is inside

- A flowing network interface that connects projects, systems, experience, and contact.
- Eight case studies spanning computer vision, local AI interfaces, predictive modeling, data engineering, and causal analysis.
- An experience and education explorer with keyboard-accessible tabs and stable reading states.
- Fluid section layouts, restrained glass controls, and reduced-motion support.
- Three featured project studies, five additional experiments, scrolling tool ribbons and soft section backdrops.
- Native scrolling with gentle section lift transitions; selected case studies remain stable while reading.
- On-demand case studies with problem, implementation and status visible together.
- A compact portrait and background integrated into the experience section.
- A global pause control, interaction pauses, and reduced-motion fallbacks.
- Offscreen canvas and project-strip animations pause to reduce idle work.
- Evidence links to the public GitHub repositories behind the featured work.

## Run locally

Requires Node.js 22.12+ (or a current supported LTS release).

```sh
git clone https://github.com/nymav/ny-portfolio.git
cd ny-portfolio
npm ci
npm run dev
```

Create a production build with:

```sh
npm run build
npm run preview
```

## Deploy

The static production output is published from the `gh-pages` branch for GitHub Pages. Run `npm run build:pages`, then publish the generated `dist/` directory to `gh-pages`. The Pages build uses `/ny-portfolio/` as its asset base; the local development build uses `/`.

## Selected projects

| Project | Focus | Repository |
| --- | --- | --- |
| DocAtlas | Documentation search, source inspection, and retrieval evaluation | [docatlas](https://github.com/nymav/docatlas) |
| GlassPDF | Local PDF organisation, export, and OCR; a Teyrin product | [glasspdf](https://github.com/nymav/glasspdf) |
| Mailayer | Read-only Gmail analysis and local search | [mailayer](https://github.com/nymav/mailayer) |
| DRAX TBS | Textbook retrieval and local model inference | [drax_tbs](https://github.com/nymav/drax_tbs) |

## Built with

React, TypeScript, Vite, GSAP, Canvas, and GitHub Pages.

## Connect

- [LinkedIn](https://www.linkedin.com/in/nikhil-yarra/)
- [GitHub](https://github.com/nymav)
- [Email](mailto:nikhilyarra01@gmail.com)
