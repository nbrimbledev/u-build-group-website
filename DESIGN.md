---
name: U Build Group
description: A cool mineral portfolio system for a credible Manitoba parent brand.
colors:
  cool-paper: "#f7f9fb"
  mineral-grey: "#e8edf2"
  deep-mineral: "#d8e0e8"
  charcoal-ink: "#111c26"
  slate-copy: "#53616c"
  foundation-navy: "#0f1e46"
  construction-blue: "#014cbb"
  construction-sky: "#038df3"
  construction-navy: "#082b54"
  everett-green: "#146b29"
  everett-deep: "#0f4f21"
  properties-teal: "#016b7b"
  properties-bright: "#05c7cf"
  properties-darkest: "#013f4b"
  properties-ink: "#131b1d"
  properties-light: "#e8f4f5"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 7.6vw, 8.6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6.4rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.035em"
rounded:
  inset: "12px"
  compact: "18px"
  tile: "20px"
  card: "22px"
  icon: "24px"
  feature: "28px"
  circle: "50%"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  grid: "14px"
  mobile-edge: "18px"
  card: "24px"
  band: "28px"
  section-gap: "64px"
components:
  portfolio-header:
    backgroundColor: "rgb(247 249 251 / 86%)"
    textColor: "{colors.charcoal-ink}"
    height: "78px"
    padding: "14px clamp(20px, 4vw, 62px)"
  company-band:
    backgroundColor: "rgb(255 255 255 / 72%)"
    textColor: "{colors.charcoal-ink}"
    padding: "28px clamp(24px, 6vw, 92px)"
    height: "190px"
  company-icon-frame:
    backgroundColor: "rgb(255 255 255 / 88%)"
    rounded: "{rounded.icon}"
    size: "104px"
  foundation-editorial:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-ink}"
    ruleColor: "rgb(15 30 70 / 13%)"
    padding: "46px clamp(28px, 5vw, 64px) 42px"
  statistic-tile:
    backgroundColor: "{colors.foundation-navy}"
    textColor: "{colors.cool-paper}"
    rounded: "{rounded.tile}"
    padding: "24px"
    height: "132px"
  footer:
    backgroundColor: "{colors.foundation-navy}"
    textColor: "{colors.cool-paper}"
    padding: "72px max(32px, calc((100vw - 1180px) / 2)) 28px"
---

# Design System: U Build Group

## Overview

**Creative North Star: "The Manitoba Portfolio House"**

U Build Group feels like a composed parent organization that houses distinct companies under one credible structure. Cool mineral fields, deep navy anchors, and broad horizontal routes create a grounded contemporary character. The company colours remain recognizable, but the Group controls how strongly they appear.

The system relies on generous scale and direct hierarchy rather than construction-site motifs. A large three-building silhouette in Construction Navy sits over two softly framed project-film tracks, forming the expressive hero signature. Supporting content stays quiet so prospective clients and community representatives can choose a company without distraction.

**Key Characteristics:**

- Cool mineral surfaces with dark structural anchors.
- Wide company routes that reveal division colour through interaction.
- Oversized sentence-case headings with compact supporting labels.
- Soft ambient depth reserved for important objects and containers.

## Colors

The palette combines a cool neutral foundation with one parent navy and distinct operating-company accents.

### Primary

- **Foundation Navy** (`#0f1e46`): Anchors Group-level identity, statistics, focus contrast, and other moments that need institutional weight.
- **Construction Blue** (`#014cbb`): Identifies U Build Construction Division routes and key route copy.
- **Construction Sky** (`#038df3`): Brightens the construction gradient and supports visible keyboard focus.
- **Construction Navy** (`#082b54`): Comes directly from the Construction logo and fills the hero building silhouette.

### Secondary

- **Everett Green** (`#146b29`): Identifies Everett locations on the Manitoba map.
- **Everett Deep** (`#0f4f21`): Appears when the Everett company route is hovered. The supplied Everett logo retains its brand colours.
- **Properties Teal** (`#016b7b`): Identifies U Build Developments and anchors its gradient.
- **Properties Bright** (`#05c7cf`): Completes the gradient used by the Properties identity.
- **Properties Darkest** (`#013f4b`): Supports the darkest facets of the Properties mark.
- **Properties Ink** (`#131b1d`): Provides the near-black descriptor tone used with the Properties identity.
- **Properties Light** (`#e8f4f5`): Provides a pale descriptor or knockout tone on dark teal surfaces.

### Neutral

- **Cool Paper** (`#f7f9fb`): The lightest page and header surface.
- **Mineral Grey** (`#e8edf2`): Supporting tiles and quiet grouped information.
- **Deep Mineral** (`#d8e0e8`): A stronger neutral layer for boundaries and future-company treatment.
- **Charcoal Ink** (`#111c26`): Primary text and heading colour.
- **Slate Copy** (`#53616c`): Supporting paragraphs and secondary explanations.
**The Division Colour Rule.** Foundation Navy belongs to the parent brand; blue and teal identify the Construction and Developments routes. Everett green appears on the Everett route hover and its map locations. Division accents should guide selection rather than flood supporting sections.

**The Signature Mark Rule.** The hero uses the three-building silhouette alone, filled with the navy sampled from the U Build Construction logo. The hero ends cleanly without a decorative division-colour strip.

**The Project Film Rule.** Every current U Build Construction project image appears in both ambient hero tracks. The rows use offset sequences and counter-move for visual contrast. Matching photographs begin far apart, though they may cross during the loop. A mineral veil keeps the photography secondary to the headline and Group symbol. The loop is decorative, pauses outside the viewport, and becomes a still composition when reduced motion is requested.

**The Foundation Watermark Rule.** The Group U sits as a fixed, low-opacity background field through the shared-foundation section and the Manitoba map introduction. It clips at the map’s top edge so the map itself remains clear.

## Typography

**Display Font:** Space Grotesk (with `sans-serif` fallback)
**Body Font:** Archivo (with Arial and `sans-serif` fallbacks)

**Character:** Space Grotesk gives the parent brand a broad architectural presence without using drafting language. Archivo keeps explanations, navigation, and evidence straightforward.

### Hierarchy

- **Display** (500, `clamp(3.5rem, 7.6vw, 8.6rem)`, 0.9): Reserved for the homepage proposition, with tight tracking (`-0.055em`) and a maximum width near 12 characters.
- **Headline** (500, `clamp(3rem, 6vw, 6.4rem)`, 0.95): Leads major content sections and maintains tight tracking (`-0.05em`).
- **Title** (500, `1.55rem` to `1.65rem`, about 1.08): Names editorial themes, evidence, and brand elements.
- **Body** (400, `1rem` to `1.08rem`, 1.55 to 1.72): Supports decisions in lines generally capped between 36 and 64 characters.
- **Label** (600, `0.76rem` to `0.84rem`, `0.035em` to `0.08em` tracking): Provides navigation, metadata, company type, and section context.

**The Sentence Case Rule.** Use sentence case for headings, company descriptions, and controls. Increased letter spacing is reserved for compact labels, never large headlines.

## Layout

The homepage uses a full-width portfolio gateway followed by a centered content column capped at 1180px. The desktop hero is a two-column composition with the proposition on the left and the three-building emblem on the right. Company routes span the viewport in horizontal bands, using a 124px icon column, flexible copy, and a compact action column.

Content sections use generous vertical spacing between 92px and 138px. The Group story uses a two-column introduction followed by a ruled editorial pair, while numerical evidence retains a compact four-column grid.

At 980px, navigation is simplified, company actions wrap beneath their copy, and four-column layouts become two columns. At 700px, the hero becomes one column with the artwork first, company bands use an 88px icon column, and all supporting grids become single columns. Mobile edges use 18px of space.

**The Full-Width Route Rule.** Company selection bands span the page and retain square outer edges. Rounded cards belong to supporting information, not the primary routing structure.

## Elevation & Depth

The system uses restrained ambient depth. Cool tonal layers establish most separation, while diffuse navy shadows lift only the hero artwork, company icon frames, and the Manitoba map. Company bands, navigation, and the Group editorial remain flat at rest.

### Shadow Vocabulary

- **Building Silhouette** (`drop-shadow(0 22px 30px rgb(15 30 70 / 25%))`): Separates the Construction Navy buildings from the mineral hero surface.
- **Icon Frame** (`0 8px 28px rgb(17 29 79 / 8%)`): Gives company marks a quiet physical surface.
- **Map Frame** (`0 16px 44px rgb(17 29 79 / 8%)`): Gives the large service-area map enough weight to hold the section.

**The Layer Before Lift Rule.** Use a mineral surface or fine translucent rule before adding a shadow. Shadows are reserved for elements that need clear separation from their field.

## Shapes

Supporting objects use generous, softly rounded corners. Statistic tiles use 20px radii, icon frames use 24px, and the map uses 28px. The Group editorial uses square ruled edges. The building silhouette introduces the system's sharp architectural geometry.

Full-width company bands and the translucent header stay square. Fine navy rules at 13% opacity divide major structural areas without producing a technical drawing aesthetic.

## Components

### Navigation

- **Structure:** A 78px translucent Cool Paper header with a single-colour brand cluster, two compact anchors, and a blue phone link.
- **Targets:** Interactive items provide at least 44px of height.
- **State:** Links shift toward Construction Blue on hover; all keyboard focus uses a 3px Construction Sky outline with a 4px offset.
- **Responsive treatment:** The two section anchors hide below 980px while the phone link remains available.

### Company Route Bands

- **Character:** Confident, direct portfolio choices with restrained default colour and committed hover colour.
- **Structure:** A wide grid with equal 104px icon frames, a flexible copy region, and an action with an inline arrow.
- **State:** U Build Construction Division reveals a blue gradient, Everett reveals Everett Deep, and U Build Developments remains a muted future-company field. The arrow moves 5px on hover.
- **Motion:** Entry uses a short spring stagger. Colour changes take 220ms and arrow movement takes 180ms.

### Group Foundation Editorial

- **Structure:** Two equal editorial columns separated by a fine rule, with the founder-led U Build Construction Division story on one side and the sister-company relationship on the other.
- **Surface:** Transparent over the page field so the section reads as narrative rather than a service-card grid.
- **Responsive treatment:** The columns stack below 700px and use a horizontal rule instead of the desktop divider.

### Statistics

- **Shape:** 20px corners with a minimum height of 132px.
- **Surface:** Foundation Navy with white values and supporting labels at 68% opacity.
- **Use:** Keep source attribution immediately below the grid whenever the figures belong to an operating company.

### Map Frame

- **Shape:** A 28px clipped container.
- **Depth:** Mineral Grey fallback surface with the map-frame shadow.
- **Meaning:** The map shows selected communities and project locations, not formal service boundaries.
- **Responsive treatment:** The interactive map remains visible at every viewport. It uses a fluid height on tablet and mobile, moves the company key below the map on narrow phones, and refits its Manitoba locations when the viewport changes. Three concise company-focus summaries appear below 900px and stack below 700px.

### Footer

- **Surface:** Foundation Navy with Cool Paper text and pale blue headings.
- **Structure:** Four columns collapse to two at 980px and one at 700px.
- **State:** Links brighten to white on hover and keep generous touch height.

## Do's and Don'ts

### Do:

- **Do** let company colours identify destinations and interaction states.
- **Do** keep all company icon frames equal in size within the same breakpoint.
- **Do** use sentence-case Space Grotesk headings over restrained Archivo copy.
- **Do** preserve reduced-motion behavior for reveal and hero-building cursor movement.
- **Do** keep Group-level content concise enough that company routes remain the primary action.

### Don't:

- **Don't** introduce blueprint grids, sheet numbering, registration corners, or technical drawing language.
- **Don't** use tan as the parent site's dominant field.
- **Don't** add Spline scenes, simulated 3D backgrounds, or watermark-bearing embeds.
- **Don't** copy the U Build Construction Division website's composition or construction-specific visual rhetoric.
- **Don't** introduce Everett green outside the Everett company route, the supplied Everett logo, or Everett map locations.
- **Don't** let shadows replace the mineral surface hierarchy.
