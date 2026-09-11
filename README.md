# Nikhil Yarra — Cinematic Portfolio

React, TypeScript and Vite portfolio with eight case studies, GSAP transitions, Three.js graphics and optional synthesized sound.

## Run

Use Node.js 22.12+ (or a newer supported LTS release).

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` folder to a static web host. Use an HTTP server rather than opening index.html as a local file.

## Content

Project and career content is in `src/App.tsx`; the visual system is in `src/styles.css`. The contact footer currently contains internal navigation links. Replace these with verified contact URLs before publishing. No email, repository URLs or performance claims have been invented.

## Improvements

- Native modal index with Escape dismissal, focus containment/restoration, and section focus after navigation.
- Skip-to-projects link, visible keyboard focus, selected-project semantics and keyboard-scrollable architecture.
- Project selection and next-project actions move to the selected case study.
- Restored pinned desktop career timeline with measured camera stops that fit each entry; static mobile and reduced-motion fallbacks.
- Reduced motion disables smooth scrolling and reveal/hover motion; static content remains readable.
- WebGL initialization fails gracefully; GPU geometry and materials are disposed on unmount.
- Corrected invalid CSS arithmetic and replaced misaligned diagram lines with node-relative arrows.
- Larger labels, readable mobile constellation and contact headline, contrasting fixed navigation.
- Dependency lockfile for repeatable installs.

Google Fonts requires an internet connection; system font fallbacks are provided. Graphics are illustrative, not live model outputs.

Timeline stops occupy separate horizontal space while preserving the animated camera journey. Project introductions and animated worlds use separate responsive layout areas to avoid overlapping text.
