# Nikhil Yarra — portfolio redesign draft

React, TypeScript and Vite portfolio source. The existing public site is [nymav.github.io/ny-portfolio](https://nymav.github.io/ny-portfolio/), served from `gh-pages`.

This redesign is a draft. Layout fixes have been implemented, but the owner has requested a richer visual direction. The current draft has not been published to `gh-pages`.

## Reports

- [Design research, original video evidence and proposed composition](docs/PORTFOLIO-DESIGN-RESEARCH.md)
- [Complete current surface inventory and layout audit](docs/PORTFOLIO-LAYOUT-AUDIT.md)

The audit distinguishes browser checks, source inspection and untested environments. The research distinguishes empirical evidence, practitioner guidance and proposed art direction.

## Content

`src/content.ts` holds the owner’s profile, selected projects, research outputs and work history. Evidence links accompany the selected systems. Constructed model-evaluation data is labeled; passing software tests is not presented as real-world model accuracy.

`src/App.tsx` contains the portfolio surfaces. `src/styles.css` defines the responsive layout. The CV, fonts, licenses and fallback document are in `public/`.

## Local checks

Node.js 22.15+ is used for the build audit’s TypeScript imports.

```sh
npm ci
npm run dev
npm run build:pages
npm run audit:build
npm run preview -- --base=/ny-portfolio/
```

The built output is `dist/`. Publication must retain `/ny-portfolio/` as the base. The existing public deployment is controlled by `gh-pages`; updating a draft source branch does not publish the redesign.

## Contact

[nikhilyarra.mail@gmail.com](mailto:nikhilyarra.mail@gmail.com) · [LinkedIn](https://www.linkedin.com/in/nikhil-yarra/) · [GitHub](https://github.com/nymav)
