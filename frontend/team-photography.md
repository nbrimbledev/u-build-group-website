# Team photography

The team page uses staff photography supplied through the U Build Construction SharePoint library. These images are used only by the U Build Group website.

## Source

- Group banner: `4. COMPANY INFO + TEMPLATES / 4. UBC - STAFF / Office Staff Headshots / Group Photo-Edited / #1-Edit.jpg`
- Individual portraits: `4. COMPANY INFO + TEMPLATES / 4. UBC - STAFF / Office Staff Headshots / Headshots-edited`
- Supplied portrait names: Ahmad, Andy, Angie, Brody, Candice, Connell, Jay, Junior, Khaldon, Kristen, Lindsay, Lucas, and Richard.

Noah does not currently have a supplied portrait. Andy's confirmed role is Chief Estimator.

## Web transformations

The source photographs remain unchanged in SharePoint. Website copies are stored in `public/team/`.

- Headshots were resized so the longest edge is 1,200 pixels and exported as JPEG at quality 86.
- The Careers group banner uses the original 7,205 × 2,087 JPEG. Next.js delivers responsive versions at quality 90.
- Exported headshots contain embedded metadata identifying them as user-supplied U Build staff photography.
- The interface retains the supplied square portrait crop and uses the same 6-pixel inset frame found around the homepage project photographs.

The permanent page uses the static responsive grid. Brody and Richard remain first, followed by a fixed mixed order so the layout is stable between visits. The earlier carousel implementation remains in the codebase as a commented backup option and is not linked from the public site.

If a source portrait is replaced, repeat the same export settings and update the name or role in `app/team-data.ts`.

The Careers banner now uses the original 7205 × 2087 JPEG as its source. Next.js delivers responsive versions at quality 90 to avoid recompressing the former reduced export. The group photo is shown on Careers only; Team focuses on individual profiles.
