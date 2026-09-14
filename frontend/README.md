# U Build Group frontend reference

Use this folder for work on the U Build Group website. It records the current site decisions, not a general brand kit for the sister companies. The Construction, Everett, and Developments marks appear here only because the Group site routes visitors to those companies.

- [Colours](colours.md) covers the parent palette, company accents, and where each may appear.
- [Typography](typography.md) records the Space Grotesk and Archivo pairing used on the site.
- [Marks and favicons](marks-and-favicons.md) identifies the actual image files and their roles.
- [Interface rules](interface.md) covers the hero, company routes, map, motion, and responsive behaviour.

The code wins if a value in these pages drifts. Check [`app/globals.css`](../app/globals.css) for CSS values, [`app/layout.tsx`](../app/layout.tsx) for fonts and favicon metadata, and [`app/components/DivisionGateway.tsx`](../app/components/DivisionGateway.tsx) for the company gateway. [`DESIGN.md`](../DESIGN.md) has additional design context. Older generated design-tool files are intentionally excluded from this repository because they describe an earlier palette.

Review this folder whenever the palette, type, or source artwork changes.
