# Catalogue design and verification - 9 October 2026

The portfolio now leads with a visual catalogue: DocAtlas, Mailayer, GlassPDF and DRAX TBS. Original interface images open implementation case studies with four source-linked architecture stages. DaChat, Airspace, facial emotion recognition and DDoS detection are available in the expandable archive. Copy was shortened across the hero, profile and contact sections; the earlier approach section stays removed.

## Source review

Reviewed Nikhil Yarra’s LinkedIn profile and all 12 listed projects, the public GitHub repository list, and the Teyrin company page. Current project descriptions use revision-pinned source links. DocAtlas’s 95.83% recall@5 is explicitly identified as a small development retrieval evaluation, not generated-answer accuracy or a production guarantee. No unverified accuracy or client claims were added.

Teyrin’s page identifies Software Development, Privately Held, 0-1 employees and the tagline “Intelligence, put to work.” Sole ownership is the user’s supplied statement; no legal entity type, registration, incorporation date, client roster or revenue is inferred. Teyrin is described as being built by Nikhil. The projects are selected personal work, not represented as delivered Teyrin customer engagements.

Source revisions:
- DocAtlas: 7a1c97c43dce99def7a8ddc8fbde3708c0878603
- GlassPDF: 1d7d77ff05105488fb25b6488d585dfd4e513afc
- Mailayer: 89b20b3ef7fd693d75bf5a0fecd5a14b9624eb2e
- DRAX TBS: f0e8bcb5f849d2e6df74d36f973013562c9d5f92

## Browser and accessibility checks

Chrome 155.0.8059.39, Firefox 153.0 and WebKit 26.5 passed the new catalogue suite at widths 320, 390, 768, 1280 and 1440. All four dialogs, four architecture stages, image loading, keyboard Tab cycling, Escape focus restoration, archive expansion, reduced motion, no-JavaScript source links and PDF response were verified. No horizontal overflow or application JavaScript errors were detected.

Eight axe states per engine (24 total) reported zero violations: initial page, each of four project dialogs, expanded archive, phone and Teyrin on phone. Automated rules covered WCAG A/AA tags and best practices. Contrast checks against artwork may still require manual review. This is not full WCAG certification; real-device and screen-reader testing remain outside this automated scope.

## Performance

Lighthouse 12.8.2, three fresh simulated mobile runs: performance 96 each, accessibility 100, best practices 100, SEO 100. Mobile LCP about 2.7s; blocking time 0ms; CLS 0. Desktop: all four category scores 100, LCP about 0.6s, blocking time 0ms and CLS 0. Local lab measurements, not production field metrics or INP measurements.

## Customer PDF

Eight A4 pages: cover, profile/capabilities, four project studies, Teyrin and archive/contact. All pages rendered with Poppler and visually inspected. Text is searchable; 18 clickable links checked. Original project screenshots and explicit scope statements are used. The catalogue is linked from the website and is not loaded until requested.

## Analytics and updates

Cloudflare Web Analytics loads only on nymav.github.io, avoiding local development telemetry. Tracking is aggregate visits and performance, not named visitor identities. The existing supplied résumé PDF remains unchanged and predates the latest LinkedIn employment details. The site is reviewed as of this date; it is not automatically synchronized with LinkedIn.

References: https://www.linkedin.com/in/nikhil-yarra/ ; https://www.linkedin.com/company/teyrin/ ; https://github.com/nymav ; https://developers.cloudflare.com/web-analytics/about/ .
