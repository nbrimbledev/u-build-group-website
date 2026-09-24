# Gallery photo connection

The Group website keeps its five original photos permanently. `app/gallery-data.ts` combines them with the generated OneDrive collection for `/gallery` and the homepage reel. Construction and Everett websites are unaffected.

## Managing photos

Put approved public photographs in the SharePoint document library at `MARKETING/Gallery`. Project subfolders are supported. All supported images appear in the Gallery page. Only photos inside a folder named `Featured` join the homepage reel. If that folder is empty or absent, no OneDrive photos appear in the reel. The original five remain in either case.

The gallery shuffles photos on each visit and shows no titles or filenames, including in the enlarged viewer. Descriptive filenames are still useful for accessible descriptions. Supported inputs are JPEG, PNG, WebP, AVIF and TIFF. Export HEIC photos to JPEG first. The sync produces WebP copies up to 2400 pixels plus 1000-pixel thumbnails and strips original metadata. Source files are never modified. Maximum input is 50 MB / 80 megapixels per image and 1,000 photographs per collection.

Removing an image from the source removes its generated copies after a successful sync and deployment. Removing all source images leaves the original five. Existing copies remain on the deployed website if listing, download, conversion or build fails. Files in generated folders should not be edited by hand. Git history retains previously published images; source removal is not a purge of repository history.

## Administrator setup (required before automatic updates work)

1. Register an application in Microsoft Entra for the Group gallery. Use Microsoft Graph application permission `Sites.Selected`, grant admin consent, and grant this app **read** access to the UBuildConstruction site only. Consent alone does not grant site access. Keep it separate from personal user sign-in. A narrower folder-specific permission can be used if the administrator verifies all required drive endpoints.
2. Add GitHub Actions repository secrets `MS_TENANT_ID`, `MS_CLIENT_ID`, and `MS_CLIENT_SECRET` in `nbrimbledev/u-build-group-website`. Do not put these values in frontend variables or commit them. Record the secret expiry for renewal.
3. Set repository variable `GALLERY_DRIVE_ID` to the document library drive ID. The currently discovered library is `b!DbJkHZin-0OqgfTXcXHdT-RqyIlHFP5KsRjSgkXUYrPbq0O_NvX2RJJa6hrpaI8_`. Verify it is the library containing `MARKETING/Gallery`.
4. Create a Vercel deploy hook for the existing `u-build-group` project, branch `main`, and store its URL as GitHub secret `GALLERY_VERCEL_DEPLOY_HOOK`. The hook ensures a photo update requests a deployment independently of bot-push integration behaviour. If the ordinary Git integration also deploys bot commits, disable duplicate deployment behaviour as appropriate.
5. Allow this workflow to write the generated collection to `main` under the repository's branch policy. Set repository variable `GALLERY_SYNC_ENABLED` to `true` only when ready. It is disabled by default. Run **Sync gallery photos** manually once and verify both `/gallery` and the homepage after the Vercel build finishes.

The workflow checks about every 15 minutes; GitHub schedules can be delayed and deployment adds time. Only changed collections request a deployment. Failed workflow runs are visible in GitHub Actions. If a deploy-hook request fails after the commit succeeds, manually redeploy the latest main revision in Vercel. If permissions fail, restore access and rerun the workflow; never replace the collection with an empty fallback.

For an operator-run sync, set the same Microsoft variables securely in the shell and run `npm run gallery:sync`. Review the generated changes and run the normal checks before publishing. The script never reads the Mac's OneDrive folder, so scheduled updates do not depend on a computer being awake.

Microsoft guidance: https://learn.microsoft.com/en-us/graph/permissions-selected-overview

## Activation status

The page and synchronization code are implemented. The Microsoft application, repository secrets and scheduled workflow activation must be configured by the administrator. No live Microsoft authentication has been verified yet.

## Construction Projects source

`npm run projects:sync` reads the public https://www.ubuildconstruction.ca/projects page, extracts all project cards, and saves optimized copies in `public/construction-projects` with their titles, descriptions and source URLs in `app/data/construction-projects.json`. It needs no Microsoft credentials. The shared collection combines these photos with the five originals and OneDrive additions. Source URLs prevent the four overlapping original photos from appearing twice. The original timber-framing image stays.

Vercel deployments and `npm run build` refresh the Construction collection automatically. A source outage or unrecognized page layout uses the last complete saved collection during builds; a manual sync reports failure. This is a build-time refresh, not a live request on each visit. Updating Construction alone does not trigger a Group deployment; deploy the Group site to refresh it. The OneDrive schedule remains separately disabled pending administrator setup.
