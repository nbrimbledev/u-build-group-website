# U Build Group website

This repository contains the U Build Group parent website only. It introduces the Group, shows selected Manitoba locations, and routes visitors to the separate company websites. It is not the source repository for U Build Construction Division or Everett Construction Group.

The current frontend brand reference is in [`frontend/`](frontend/README.md). The live source of truth for colours and layouts is [`app/globals.css`](app/globals.css), with fonts and favicon configuration in [`app/layout.tsx`](app/layout.tsx).

## Local development

```bash
npm ci
npm run dev
```

Run `npm test`, `npm run lint`, and `npx next build` before publishing. The local `npm run build` command uses Vinext; the existing Vercel project uses the Next.js build.

## Deployment

The existing Vercel project `u-build-group` is connected to this repository. Pushes to `main` trigger production deployments. Other branches can produce previews. The site is configured for the `ubuildgroup.ca` domain.

Local environment files, build output, and Vercel project linkage are excluded by `.gitignore`. Do not commit credentials or customer information.

## Gallery

The Group gallery and homepage reel share a collection that always retains the original five photos. See [Gallery setup](docs/gallery-setup.md) for OneDrive publishing and administrator activation.
