# Nikhil Yarra — AI/ML Systems Portfolio

An interactive, cinematic portfolio for work across agentic AI, retrieval, multimodal ML, data systems, and applied research.

**Live site:** [nymav.github.io/ny-portfolio](https://nymav.github.io/ny-portfolio/)

## What is inside

- A flowing network interface that connects projects, systems, experience, and contact.
- Eight case studies spanning computer vision, local AI interfaces, predictive modeling, data engineering, and causal analysis.
- An automatically advancing experience and education explorer with keyboard-accessible tabs.
- Fluid section layouts, restrained glass controls, and reduced-motion support.
- Three featured project studies, five additional experiments, scrolling tool ribbons and soft section backdrops.
- Native scrolling with gentle section lift transitions; selected case studies remain stable while reading.
- Automatically sequenced problem, implementation, outcome, and repository details.
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

## Project map

| Project | Focus | Repository |
| --- | --- | --- |
| DRAX TBS | Local retrieval-augmented tutoring and knowledge system | [drax_tbs](https://github.com/nymav/drax_tbs) |
| DaChat | Local Streamlit AI interface for CSV and property-price prediction workflows | [DaChat](https://github.com/nymav/DaChat) |
| Face Emotion Detection | CNN-based facial emotion recognition | [Face-Emotion-Detection-Using-CNNs](https://github.com/nymav/Face-Emotion-Detection-Using-CNNs) |
| DDoS Attack Detection | Machine-learning classification for network attacks | [DDoS Attack Detection](https://github.com/nymav/DDoS-Attack-Detection-using-Machine-Learning) |
| Bank Marketing Modeling | Predictive modeling study for campaign response | [Predictive Modeling](https://github.com/nymav/Predictive-Modeling-for-Optimizing-Bank-Marketing-Campaigns-Using-Machine-Learning) |
| Flight Data Analysis | MapReduce and Hadoop data-processing work | [Flight Data Analysis](https://github.com/nymav/Fligh-Data-Analysis-with-MapReduce) |

The portfolio also includes Causal Med and Apple Sequence as exploratory systems studies.

## Built with

React, TypeScript, Vite, GSAP, Canvas, and GitHub Pages.

## Connect

- [LinkedIn](https://www.linkedin.com/in/nikhil-yarra/)
- [GitHub](https://github.com/nymav)
- [Email](mailto:nikhilyarra@gmail.com)
