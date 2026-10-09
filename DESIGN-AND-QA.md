# Design and verification — 8 October 2026

## What was completed

The material-led opening is followed by a preview-driven work index, detailed architecture views, evidence-rich case studies, an engineering approach grounded in actual code, an expanded professional profile and education, an experience timeline, and a direct contact flow. Typography and the stone / ink / burgundy identity remain consistent throughout.

The original artwork was generated for this portfolio. Its motion now uses compositor transforms and a light passage, pausing out of view, on hidden documents, and for reduced-motion preferences. The former WebGL initializer produced a 2.4-second long task in a throttled test and was removed. Text assets are served with Brotli/gzip, with explicit MIME types and `nosniff` headers.

## Cross-browser results

| Engine | Version | Layout widths | Functional checks | Axe audited states | Violations |
| --- | --- | --- | --- | --- | --- |
| chromium | 155.0.8059.39 | 320, 390, 768, 1280, 1440 | 8 passed | 4 | 0 |
| firefox | 153.0 | 320, 390, 768, 1280, 1440 | 8 passed | 4 | 0 |
| webkit | 26.5 | 320, 390, 768, 1280, 1440 | 8 passed | 4 | 0 |

The engines were isolated headless test browsers: installed Google Chrome, Playwright Firefox, and Playwright WebKit. WebKit is engine coverage, not a claim that every shipping Safari/iOS version was tested. Mac WebKit uses Option+Tab for all-control navigation in this test configuration; that behavior is reflected in the test script.

Checks cover matching keyboard previews, all three expandable projects, four-stage architecture views, all three case-study dialogs and source links, modal Tab cycling, Escape and focus restoration, phone expansion, reduced-motion still artwork, the skip link, and a no-JavaScript identity/artwork fallback. No page JavaScript errors were recorded.

Axe-core 4.11.0 audited WCAG A/AA and best-practice rules in four states per engine: initial page, expanded Mailayer evidence, Mailayer dialog, and 320px phone layout. All 12 scans returned zero violations. Background-art contrast generated incomplete/manual-review items; these are retained in the raw reports. Automated scans do not cover every WCAG criterion. Focus behavior, layout, content labels, and visual contrast were also inspected manually; this is not a full screen-reader or WCAG conformance certification.

A cross-browser scan exposed transient low contrast during entrance fades. Entrances now keep full opacity and animate position only. WebKit exposed a native modal focus escape; dialogs now cycle their own focusable controls consistently.

## Performance results

Lighthouse 12.8.2, cold-cache local runs with standard simulated mobile throttling, followed by the desktop preset. Functional test browsers were closed before these measurements.

| Run | Performance | Accessibility | Best practices | SEO | LCP | Blocking time | Layout shift |
| --- | --- | --- | --- | --- | --- | --- | --- |
| mobile 1 | 98 | 100 | 100 | 100 | 2.4 s | 0 ms | 0 |
| mobile 2 | 98 | 100 | 100 | 100 | 2.4 s | 0 ms | 0 |
| mobile 3 | 98 | 100 | 100 | 100 | 2.4 s | 0 ms | 0 |
| desktop 1 | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |

The median simulated-mobile performance score is 98, with LCP approximately 2.4 seconds, 0ms total blocking time and CLS 0. Desktop performance is 100, with LCP approximately 0.5 seconds. These are reproducible local lab measurements, not promises of production scores on every device or network. Lighthouse cannot establish real-user INP. Field Core Web Vitals require measurements after deployment.

The prior mobile test scored 62 with 2,370ms blocking time. Removing WebGL initialization eliminated the measured startup bottleneck while preserving ambient artwork motion.

## Resource and server checks

All 13 tested local resources returned HTTP 200 with appropriate MIME types and `nosniff`. Additional checks passed for Brotli decoding, PDF byte-range previews, missing-file responses, unsupported methods, root-boundary protection, and malformed URLs. JavaScript syntax was checked with Node.

## Content verification

Roles, dates and education were checked against the supplied résumé, not independently verified with employers. The undergraduate degree is retained as the résumé's B.S. Computer Science & Engineering. Project architecture and decisions come from retained repository-review findings and link to pinned source files. Interface samples, disconnected inference, historical artifacts and implementation limitations are labelled.

No invented impact statistics, testimonials, awards, or accuracy benchmarks were added. The résumé's emotion-model accuracy claim is not promoted because repository evidence did not support the same claim. Project UI evidence does not establish newly completed Gmail OAuth, local inference, citation correctness, or distributed cluster runs.

## Sources and influences

- [Awwwards portfolio collection](https://www.awwwards.com/websites/portfolio/), [Dennis Snellenberg](https://dennissnellenberg.com/), and [Cynthia Ugwu](https://www.cynthiaugwu.com/) informed composition, project presentation and restraint. Their code, photography and branding were not copied. This portfolio has not been judged or rated by Awwwards.
- [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- [Axe-core](https://github.com/dequelabs/axe-core), [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) and [Core Web Vitals](https://web.dev/articles/vitals).

Production-domain canonical/social-sharing metadata and real-user monitoring should be configured when a hosting domain is selected. The Node server is a local preview server; the portfolio can be deployed as a static site.
