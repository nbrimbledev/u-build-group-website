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
- The group banner was resized so the longest edge is 2,800 pixels and exported as JPEG at quality 88.
- Each website JPEG contains embedded metadata identifying it as user-supplied U Build staff photography prepared for the U Build Group team page.
- The interface retains the supplied square portrait crop and uses the same 6-pixel inset frame found around the homepage project photographs.

The permanent page uses the static responsive grid. Brody and Richard remain first, followed by a fixed mixed order so the layout is stable between visits. The earlier carousel implementation remains in the codebase as a commented backup option and is not linked from the public site.

If a source portrait is replaced, repeat the same export settings and update the name or role in `app/team-data.ts`.
