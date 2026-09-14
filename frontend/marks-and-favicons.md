# Marks and favicons

Source artwork lives in [`public/brand/`](../public/brand/). Keep one canonical copy there so the website and this reference cannot drift apart.

| Asset | Role on this website | Format and size |
| --- | --- | --- |
| [`u-mark-blue.svg`](../public/brand/u-mark-blue.svg) | U Build Group U in the header and footer, favicon, web-app manifest, and organization metadata | SVG, 1000 × 1000 viewBox |
| [`ubuild-group-buildings.svg`](../public/brand/ubuild-group-buildings.svg) | Three-building hero silhouette, filled with Construction navy `#082B54` | SVG |
| [`u-build-construction-logo.png`](../public/brand/u-build-construction-logo.png) | Full Construction logo in its company route | Transparent PNG, 782 × 391 |
| [`everett-logo.svg`](../public/brand/everett-logo.svg) | Full Everett logo in its company route | SVG |
| [`u-build-developments-logo-2026.png`](../public/brand/u-build-developments-logo-2026.png) | Developments logo in the planned-company route | Transparent PNG, 600 × 300 |
| [`og.png`](../public/og.png) | Existing social-sized image asset; it is not currently declared in page metadata | PNG, 1730 × 909 |

The Group favicon uses the same U mark SVG as the header. It is declared in [`app/layout.tsx`](../app/layout.tsx) and referenced by [`app/manifest.ts`](../app/manifest.ts). There is no separate `favicon.ico`, 32px icon, or Apple touch icon in the repository at present. If those are created later, derive them from the Group U and update the metadata and this page together.

The hero intentionally shows the buildings without a U behind them. The Construction and Everett logos are shown at a consistent visual frame size in the company list. Do not substitute either company's favicon for the full route logo.
