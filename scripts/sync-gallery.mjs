import { createHash } from 'node:crypto';
import { access, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const GRAPH = 'https://graph.microsoft.com/v1.0';
const supported = /\.(jpe?g|png|webp|avif|tiff?)$/i;
const hash = (value) => createHash('sha256').update(value).digest('hex');
export const photoTitle = (name) => name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();

async function checkedFetch(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`Gallery service returned HTTP ${response.status}. Previous published photos are unchanged.`);
  return response;
}

// Stage every image before replacing the manifest. Errors never publish a partial collection.
export async function publishGallery(items, download, root = process.cwd(), collection = "gallery-synced") {
  if (!["gallery-synced", "construction-projects"].includes(collection)) throw new Error("Unknown gallery collection");
  const manifest = path.join(root, `app/data/${collection}.json`);
  const output = path.join(root, `public/${collection}`);
  const stage = path.join(root, `.gallery-staging/${collection}`);
  let previous = [];
  try { previous = JSON.parse(await readFile(manifest, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rm(stage, { recursive: true, force: true });
  await mkdir(stage, { recursive: true });
  const next = [];
  try {
    for (const item of items) {
      if (!supported.test(item.name)) continue;
      if (item.size > 50 * 1024 * 1024) throw new Error('A gallery image exceeds 50 MB. Resize it before syncing.');
      const id = hash(item.id).slice(0, 24);
      const version = item.eTag ?? item.lastModifiedDateTime;
      const old = previous.find((photo) => photo.id === id && photo.version === version && version);
      const title = item.title ?? photoTitle(item.name);
      const description = { title, alt: item.alt ?? title, featured: item.featured, ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}) };
      if (old) {
        try {
          await access(path.join(output, path.basename(old.src)));
          await access(path.join(output, path.basename(old.thumbnail)));
          next.push({ ...old, ...description });
          continue;
        } catch { /* Recreate any missing published file. */ }
      }
      const bytes = await download(item);
      if (bytes.length > 50 * 1024 * 1024) throw new Error('A gallery image exceeds 50 MB.');
      const processor = sharp(bytes, { limitInputPixels: 80000000 }).rotate();
      const full = await processor.clone().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
      const thumb = await processor.clone().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
      const filename = `${id}-${hash(full).slice(0, 12)}`;
      await writeFile(path.join(stage, `${filename}.webp`), full);
      await writeFile(path.join(stage, `${filename}-thumb.webp`), thumb);
      next.push({ id, version, ...description, src: `/${collection}/${filename}.webp`, thumbnail: `/${collection}/${filename}-thumb.webp` });
    }
    next.sort((a, b) => a.title.localeCompare(b.title, 'en') || a.id.localeCompare(b.id));
    await mkdir(output, { recursive: true });
    const { readdir } = await import('node:fs/promises');
    for (const name of await readdir(stage)) await rename(path.join(stage, name), path.join(output, name));
    await mkdir(path.dirname(manifest), { recursive: true });
    await writeFile(`${manifest}.tmp`, `${JSON.stringify(next, null, 2)}\n`);
    await rename(`${manifest}.tmp`, manifest);
    const retained = new Set(next.flatMap((photo) => [path.basename(photo.src), path.basename(photo.thumbnail)]));
    for (const name of await readdir(output)) {
      if (/^[a-f0-9]{24}-[a-f0-9]{12}(-thumb)?\.webp$/.test(name) && !retained.has(name)) await rm(path.join(output, name));
    }
    return next;
  } finally { await rm(stage, { recursive: true, force: true }); }
}

export async function syncFromMicrosoft() {
  const required = ['MS_TENANT_ID', 'MS_CLIENT_ID', 'MS_CLIENT_SECRET', 'GALLERY_DRIVE_ID'];
  for (const key of required) if (!process.env[key]) throw new Error(`Missing ${key}. Follow docs/gallery-setup.md. No photos were changed.`);
  const tokenResponse = await checkedFetch(`https://login.microsoftonline.com/${encodeURIComponent(process.env.MS_TENANT_ID)}/oauth2/v2.0/token`, {
    method: 'POST', body: new URLSearchParams({ client_id: process.env.MS_CLIENT_ID, client_secret: process.env.MS_CLIENT_SECRET, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' }),
  });
  const { access_token } = await tokenResponse.json();
  if (!access_token) throw new Error('Microsoft did not return an access token.');
  const graph = async (url) => {
    if (!url.startsWith(`${GRAPH}/`)) throw new Error('Unexpected Microsoft pagination URL.');
    return (await checkedFetch(url, { headers: { Authorization: `Bearer ${access_token}` } })).json();
  };
  const drive = `${GRAPH}/drives/${encodeURIComponent(process.env.GALLERY_DRIVE_ID)}`;
  const folder = (process.env.GALLERY_FOLDER_PATH || 'MARKETING/Gallery').split('/').map(encodeURIComponent).join('/');
  const items = [];
  async function collect(url, featured = false, depth = 0) {
    if (depth > 12) throw new Error('Gallery folders are nested too deeply.');
    while (url) {
      const page = await graph(url);
      if (!Array.isArray(page.value)) throw new Error('Microsoft returned an incomplete folder listing.');
      for (const item of page.value) {
        if (item.remoteItem) continue; // Do not follow shortcuts outside the approved Gallery folder.
        if (item.folder) await collect(`${drive}/items/${encodeURIComponent(item.id)}/children?$top=200`, featured || item.name.toLowerCase() === 'featured', depth + 1);
        else if (item.file && supported.test(item.name)) items.push({ ...item, featured });
        if (items.length > 1000) throw new Error('Gallery contains more than 1,000 photos. Review the collection before publishing.');
      }
      url = page['@odata.nextLink'];
    }
  }
  await collect(`${drive}/root:/${folder}:/children?$top=200`);
  const photos = await publishGallery(items, async (item) => {
    // Download URLs expire; only optimized image bytes are published.
    const detail = await graph(`${drive}/items/${encodeURIComponent(item.id)}`);
    const url = detail['@microsoft.graph.downloadUrl'];
    if (!url || new URL(url).protocol !== 'https:') throw new Error('Microsoft did not provide a secure image download.');
    const response = await checkedFetch(url);
    const reader = response.body.getReader();
    const chunks = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 50 * 1024 * 1024) { await reader.cancel(); throw new Error('A gallery image exceeds 50 MB.'); }
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks);
  });
  console.log(`Gallery sync complete: ${photos.length} OneDrive photos. The five original photos are retained separately.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncFromMicrosoft().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
