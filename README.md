# U Build Group website

This repository contains the U Build Group parent website only. It introduces the Group, shows selected Manitoba locations, and routes visitors to the separate company websites. It is not the source repository for U Build Construction Division or Everett Construction Group.

The current frontend brand reference is in [`frontend/`](frontend/README.md). The live source of truth for colours and layouts is [`app/globals.css`](app/globals.css), with fonts and favicon configuration in [`app/layout.tsx`](app/layout.tsx).

## Local development

```bash
npm ci
npm run dev
```

Run `npm run build` and `npm run lint` before publishing. The site is configured for the `ubuildgroup.ca` domain, but creating this GitHub repository does not change the live Vercel deployment.

Local environment files, build output, and Vercel project linkage are excluded by `.gitignore`. Do not commit credentials or customer information.
