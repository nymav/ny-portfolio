# Portfolio layout and interaction audit

Date: 4 November 2026. Repository: `nymav/ny-portfolio`.

## Status and scope

This audits the local redesign draft, not the older public GitHub Pages build. Production-path preview: `http://127.0.0.1:8797/ny-portfolio/`. The draft has not been deployed. The owner has rejected its visual simplicity; that is an open design issue despite the technical fixes below. The companion [design research report](PORTFOLIO-DESIGN-RESEARCH.md) explains the proposed next direction.

Inventory: one portfolio document, six main sections, three inline project disclosures, one earlier-work disclosure, one CV PDF, a custom missing-page document, email-copy feedback, and external links. There are no project modals, account screens, search results, carousels, filter dialogs or application tab panels in this draft.

“Every possible” is bounded to this inventory. External websites and browser-native PDF/email applications have their own interfaces. All future case pages or interactive examples will add states that need a new audit.

## Surface-by-surface map

| Surface | Contents and purpose | Desktop arrangement | Mobile arrangement | Location |
|---|---|---|---|---|
| Masthead | Name/home, selected work, research, background, contact, CV | Compact sticky header; CV separated from section links | Name/CV row, then visible navigation row; no hidden menu | `src/App.tsx`, `.site-header` |
| Identity | Role/focus, main heading, introduction, portrait, education caption, recent release | Text beside a correctly proportioned portrait | Heading above text/portrait pairing; release/focus beneath | `#identity`, `.hero-composition` |
| Selected systems | DocAtlas, ModelGuard and DocMend | Project description and relevant exhibit in two columns | Description, exhibit and details in reading order | `#work`, `.project-study` |
| Project details | Question, implementation, validation, limits | Expands below the entire project row; two-column definition list | Single-column definition list | Each project’s `details.study-details` |
| Research outputs | Two titles, venue/date, description, DOI and paper action | Wide reading column and separate action | Stacked title/context/action; DOI can wrap | `#research`, `.research-output` |
| Background | Interests, education, four roles and toolkit | Interests/education beside experience | Under 600px, interests, education and experience stack as coherent groups | `#background`, `.background-layout` |
| Toolkit | Actual tools and methods | 165px label column, 28px gap, wrapping list | Label above a wrapping list | `#toolkit`, `.skills-row` |
| Product work | Medora, GlassPDF, Mailayer | Three equal content columns | Stacked entries without fixed text heights | `#products`, `.other-work` |
| Earlier studies | DRAX TBS, facial-image study, flight-data work | Expandable source list | Name and repository action, description below | `.earlier-work` |
| Contact | Email, copy action, LinkedIn, GitHub, CV, location | Invitation beside contact actions | Single column with wrapping actions and feedback | `#contact`, `.contact-layout` |
| Footer | Owner, review date and back-to-top action | One row | Wraps review date to a separate row | Contact section footer |
| CV | Current owner-provided one-page document | Opens in a new tab using the native PDF viewer | Viewer controls are browser-defined | `public/Nikhil_Yarra_CV.pdf` |
| Missing page | Plain explanation and return/profile links | Centered reading width, no complex controls | Fluid text and wrapping actions | `public/404.html` |

## Findings and fixes

| Finding | Cause | Change | Evidence/status |
|---|---|---|---|
| Portrait stretched vertically | HTML height constraint was not overridden by responsive image sizing | Added automatic image height while keeping the intended crop | Desktop/mobile visual check |
| Template-style ordinal labels | Section labels and project metadata repeated numeric prefixes | Removed section/project/research ordinals | Visible text check finds no “01 /” pattern |
| Excessive toolkit gap | Wide inherited background grid and large bottom section padding | Content-sized label/list grid; values sit near the label | At 1440px, toolkit block is about 47px high and its next boundary is 40px below it |
| Repeated large vertical intervals | 112px section padding and 62px heading gaps | General sections use 64px desktop/44px mobile; heading gap 36px desktop/28px mobile | Computed-style and screenshot checks |
| Empty right column after expanding a project | Details lived inside only the left project column | Details now span both columns below the exhibit | Expanded desktop/tablet/mobile checks |
| Undersized metadata | Several 8–10px labels | Raised small labels and enlarged secondary/body copy | Source/style review; no claim this alone establishes readability for everyone |
| Small “Before” label overflow | Fixed label width no longer fit the enlarged text | Increased label width; code may wrap on phones | Final overflow checks |
| Unclear section landing position | Links targeted padded section containers | Work/research/background links target their headings | Browser navigation checked |
| Long-screen sticky header in a short landscape view | Persistent header consumed too much height | Header becomes static below 500px viewport height | 844×390 check |
| Fragmented mobile background columns | Research interests and degrees competed in narrow columns | Stack these groups below 600px | Mobile visual review |
| Duplicate links to the same paper/product | Multiple nearby anchors duplicated one action | One clear paper action and one product source action | Source/keyboard-stop review |
| Lost context on external navigation | Evidence and CV links reused the portfolio tab | New-tab links with descriptive screen-reader suffixes | Actual CV new-tab test; attributes inspected |
| Decorative background code/media | Old canvas, motion and video components belonged to the previous theme | Removed obsolete components and film assets from the draft | No video/canvas elements in the current DOM |

The spacing values are layout decisions, not universal psychological constants. Relative grouping and content relationships matter more than applying one gap everywhere.

## Text hierarchy and content relationships

The main heading identifies the general direction, followed by a concrete introduction. Each selected project shows its name, field, explanation, technology and two distinct actions: repository and evidence. Detailed notes identify question, implementation, validation and limitation, instead of implying all tests are model-quality evaluations.

Research outputs retain the owner-provided titles and venue labels. No peer-reviewed status or independent author-metadata verification is asserted. Publisher pages could not be fully read through the web tool, so those metadata remain sourced from the owner’s CV and earlier confirmation. Work dates retain the owner-confirmed overlap rather than inventing a continuous, non-overlapping employment history. Contact uses `nikhilyarra.mail@gmail.com` consistently.

The toolkit now uses discrete wrapping list items rather than a long slash-separated sentence. The label is connected to its values, and the list remains in the background section rather than becoming a tall standalone panel.

## Typography, color and geometry

- Self-hosted IBM Plex Sans for interface/body text and Instrument Serif for display text, with their licenses retained.
- Body copy generally 16px desktop; secondary copy generally 14px; small metadata generally 11–12px. Large headings scale by viewport. These are measured implementation settings, not a font-productivity finding.
- Desktop content width is capped at 1264px. Main side margins become 36px at intermediate widths and 20px on phones.
- Header is approximately 76px on desktop. It is static on phones and in short landscape windows.
- Measured color-pair contrast: primary text/paper 13.02:1; secondary/paper 5.37:1; rust accent/paper 5.81:1; contact secondary/dark background 7.14:1. These are individual pair checks, not full accessibility certification.
- The draft uses no scroll hijacking, background video or automatic canvas animation. Reduced-motion preference disables smooth transitions.

## All current interaction states

| State | Expected behavior | Checked |
|---|---|---|
| Initial load | Content renders without opening panels or requesting credentials | Browser and build |
| Main navigation | Goes to the corresponding visible heading | Browser |
| Home/back to top | Returns to the masthead | Browser |
| Each project closed/open | Notes expand in normal document flow | Browser |
| All disclosure combinations | Independent state changes do not clip or overflow | All 16 combinations at 390px |
| Earlier studies closed/open | Reveals three source entries without a modal | Browser |
| Keyboard summary activation | Enter and Space toggle; focus remains visible | Browser on DocAtlas disclosure |
| Email copy success | Copies the displayed address and announces confirmation | Browser; status message observed |
| Email copy denied/unavailable | Explains copying/selecting or opening the email app | Source-inspected; denial not forced in the browser |
| Email link | Opens the configured mail application with the recipient | URL inspected; no email was sent |
| CV | Opens a separate PDF tab | Actual native viewer, title and one-page document observed |
| External evidence/profile/paper/product links | Open separate tabs with safe relationship attributes | Attributes inspected; three central GitHub evidence paths verified via API |
| Unknown page | Offers a return to portfolio | Custom document opened in the production-path preview; return link checked separately from live hosting |

There are no hidden popup flows, loading skeletons or form submissions to enumerate. A mail application or third-party research host is outside the portfolio’s layout control.

## Responsive coverage

| Viewport | Intended use | Result |
|---|---|---|
| 320×740 | Narrow phone | No document overflow in measured expanded state |
| 390×844 | Phone | Visual review; all 16 disclosure combinations had no measured clipping |
| 768×1024 | Tablet | Two-column project/background review; notes expand beneath both columns |
| 1024×768 | Small desktop | Width/overflow inspection |
| 1176×827 | Default browser | Desktop hero and project visual review |
| 1440×900 | Desktop | Toolkit spacing measured; content width and section boundaries checked |
| 844×390 | Landscape phone | No width overflow; header switches to static |

DOM width checks cover more states than the selected screenshots. They do not detect every possible perceptual issue, glyph shape, visual imbalance or device-specific rendering defect. Actual Safari/iOS, browser zoom and screen-reader sessions were not comprehensively tested.

Raw inspection records are in `output/layout-audit/responsive-checks.json` and `output/layout-audit/disclosure-combinations.json`. Representative screenshots include `desktop-toolkit-spacing.png`, `mobile-contact.png`, `mobile-research.png`, `tablet-work.png` and `cv-viewer.png`; screenshots are point-in-time evidence and may precede the latest art-direction revision.

## Build and deployment checks

`npm run build:pages` passes TypeScript and builds with `/ny-portfolio/` as the base. `npm run audit:build` checks evidence fields, author-written arrow glyphs, contact consistency, built asset paths, fonts, CV signature and missing-page document. The production preview was opened at its real subpath, and the PDF opened successfully.

The draft JavaScript bundle is about 211kB raw/66kB gzip versus the prior build’s approximately 342kB/117kB. This is a bundle-size comparison, not an observed page-speed or user-productivity result. No Lighthouse score is claimed.

The public `gh-pages` branch has not been updated during this audit. Publishing the unfinished visual direction would misrepresent the owner’s feedback as resolved.

## Open design work

The remaining issue is substantive: the owner finds this draft too simple. The next design pass needs stronger, project-specific artifact previews and more distinctive composition. New interactions or standalone case pages will require their own inventory and browser checks. See [the research-based design direction](PORTFOLIO-DESIGN-RESEARCH.md).
