# U Build Group comparison and consistency audit

28 September 2026. Scope: the Group website only, Home, Team and Gallery, plus the embedded map and shared layout. Construction and Everett websites were not edited.

## Verdict

The visual system is coherent: Space Grotesk headings, Archivo body text, mineral backgrounds, navy accents and company-specific colours. Navigation and footer implementations had drifted between pages. Those issues are corrected through shared components. The Group should remain a concise company gateway rather than duplicate the operating companies' service websites.

The live Group website was inspected directly in a browser. A search-tool fetch returned cached content from the previous website; that stale result was excluded from the comparison. It is not evidence of Google's current indexing status.

## Competitor comparison and recommendations

[Bockstael](https://bockstael.com/) presents a prominent completed-project photograph, sector navigation, selected project stories, an explanation of its approach, news, careers and contact routes. Its mobile site places the broader navigation behind a menu. These observations are based on its current homepage and desktop/mobile browser inspection, not an audit of its entire website.

U Build Group already offers a distinctive animated project backdrop, company selection, a team page and an image gallery. Its simpler navigation suits its role as a parent brand. The most useful additions would be:

1. **Selected project stories.** Add a small curated section with a project photograph, confirmed company and location, and a link to the full story on that company's website. This supplies context that a title-free gallery cannot. Preserve the user's title-free gallery preference.
2. **A shorter homepage introduction.** Consider “Construction and development companies serving Manitoba.” Support it with the existing explanation of the companies. Review wording before replacing the current headline. Keep company selection close to the introduction.
3. **Confirmed evidence behind the Group story.** Add a short history or milestone strip only when dates and company relationships are approved. Attribute credentials and client statements to the correct company; do not invent Group-wide achievements.
4. **A careers route.** If recruiting is active, link to the operating companies' current opportunities. A Group news page is lower priority unless somebody will maintain it. Keep shared-office contact available on every page.

Do not add site search or a large dropdown structure for three pages. A newsletter and a second inquiry form would add maintenance without addressing the current company-selection task. Detailed services and sector pages belong mainly on the operating-company websites.

## Resolved consistency findings

| Finding | Before | Now |
| --- | --- | --- |
| P2 Navigation labels and destinations | Home used “Meet the team”; inner pages used “Team”. The current page vanished from the menu. | All pages show Companies, The group, Locations, Team, Gallery, in that order. Team and Gallery expose the active page visually and through aria-current. |
| P2 Header position and layout | Home used a flex layout and phone action; inner pages used a centred grid and “Group home”. | One shared header with identical logo, spacing, phone link and responsive behaviour. Logo consistently returns home. Header scrolls with the page everywhere. |
| P2 Company anchor | Inner-page Companies links landed at the hero. | Companies links directly to the company-selection bands. |
| P2 Footer coverage | Team/Gallery lacked the homepage's address and social routes. | One shared footer with identical office contact, address and social links. |
| P2 Redundant mobile content | A second company-summary block repeated website links below the map. | Removed the duplicate block. Company links remain in the top gateway. The property remains represented in its gateway description and map. |
| P2 Landmark structure | Header/footer were nested inside main. | Header, main and footer are sibling landmarks on each content page. The skip link goes directly to main content. |

## Remaining audit findings

### P1: Imported image descriptions are camera filenames

Location: `app/data/gallery-synced.json`, consumed by `app/components/Gallery.tsx` and maintained through `scripts/sync-gallery.mjs`.

Several images announce descriptions such as “DJI 20260805114044 0015 D”. The buttons reuse these strings. Although alt attributes exist, the descriptions do not explain the photographs to screen-reader users (WCAG 1.1.1). Use approved descriptive source metadata or a persistent description override. Keep these descriptions invisible to preserve the requested title-free gallery. A simple filename rename may be adequate for the current sync workflow, but verify the resulting imported metadata before publishing.

Suggested follow-up: `$impeccable harden` for accessible photo metadata.

### P2: Statistics attribution conflicts with the saved brief

Location: `app/page.tsx` statistics source note, `app/site-data.ts`, `PRODUCT.md`.

The website attributes the figures to Construction and Everett; the saved brief says Construction only. Do not infer which is correct. Confirm the owner, measurement period and meaning of each total, then update the source note and brief together. No figures were changed in this pass.

Suggested follow-up: `$impeccable clarify` after the figures are confirmed.

### P2: Hero motion has no visible pause control

Location: `app/components/HeroProjectCarousel.tsx`, `app/globals.css`.

The decorative reel respects reduced-motion preferences and pauses offscreen or when the tab is hidden. Visitors who find motion distracting cannot pause it directly without changing their system preference. Add a discreet pause/resume control if retaining continuous animation. Treat WCAG 2.2.2 applicability with care because the reel is decorative and hidden from assistive technology; the usability issue remains.

Suggested follow-up: `$impeccable animate`.

### P2: Reveal sections start invisible

Location: `app/components/Reveal.tsx`.

Content starts at opacity zero and relies on client-side animation to reveal it. Provide an initially visible or no-JavaScript fallback so script failures do not hide the Group story and statistics. This is a source-level robustness finding, not an observed failure during the normal browser session.

Suggested follow-up: `$impeccable harden`.

### P3: Page headings and content widths are intentionally different

Location: `app/globals.css`, Team and Gallery page introductions.

Team uses a larger heading and 1180px content width; Gallery uses 1280px and a smaller heading. These are not broken navigation, but they create a different arrival rhythm. A later polish pass could align intro spacing and title scale while retaining the wide photo grid and full group portrait.

Suggested follow-up: `$impeccable polish`.

### P3: Design documentation and CSS need maintenance

Location: `DESIGN.md`, `.impeccable/design.json`, `app/globals.css`.

The brief still describes older navigation and mobile company summaries, and the generated design sidecar predates DESIGN.md. Some colours and measurements remain literal values rather than tokens. There is no supported dark theme, so missing dark-mode styles were not classified as defects. Refresh the design documentation after agreeing on the next visual changes. The existing global reduced-motion duration override should eventually be replaced with deliberate per-component rules.

Suggested follow-up: `$impeccable document`, then `$impeccable polish`.

## Audit health

These are reviewer scores for this scoped implementation review, not Lighthouse scores or WCAG certification.

| Dimension | Score / 4 | Evidence |
| --- | --- | --- |
| Accessibility | 2 | Native gallery dialog works, focus returns, automatic scan passes; meaningful imported image descriptions still need work. |
| Performance | 3 | Optimized images, thumbnail reel, lazy map and offscreen animation pause; no fresh performance benchmark was run. |
| Responsive design | 3 | No horizontal overflow across the tested sizes; all mobile navigation targets at least 44px tall and wide. Small phone labels and text enlargement deserve further device testing. |
| Theming | 3 | Consistent light-theme palette and fonts; some literal CSS values and stale documentation. |
| Implementation integrity | 3 | Shared chrome eliminates recurring drift; statistics ownership and invisible initial reveal state remain unresolved. |
| Total | 14 / 20 | Good, with the remaining issues listed above. |

Remaining issues: P0 0, P1 1, P2 3, P3 2. Six consistency issues resolved. No deterministic findings from the Impeccable detector on the changed page/component targets; that result does not evaluate the quality of photo descriptions or establish accessibility conformance.

## Verification

- All eight existing tests passed, covering gallery/project sync, hero imagery and metadata.
- Lint and production Next.js build passed.
- Home, Team and Gallery inspected at 1280, 768, 390 and 320px. Header positions and dimensions match between routes at each width; all pages have one h1 and the correct canonical URL. No horizontal page overflow detected.
- Shared navigation labels, hrefs, active states and footer hrefs compared across all routes. Companies anchor lands at the company bands.
- Gallery opens with focus on Close, advances using ArrowRight, closes with Escape and returns focus to the photo button.
- Axe 4.10.3 WCAG 2 A/AA and 2.1 AA scans on all three pages at 320px reported zero automatic violations. Contrast checks remained incomplete on some image/gradient content; this is not a full manual accessibility certification.
- Existing reduced-motion and lazy-loading behaviour reviewed in source. No field-performance, Search Console ownership/indexing, or cross-browser device-lab verification claimed.
- Local Vercel Analytics script warnings are expected outside Vercel hosting. No analytics configuration was changed.

The permanent public content routes are Home, Team and Gallery. The embedded map is a supporting document rather than a separately navigated page. The framework's generic not-found page is outside this chrome update; a branded recovery page is a useful later addition.

Retain the original project photos, Featured-only OneDrive hero additions, random gallery order, hidden gallery titles and Google verification file.
