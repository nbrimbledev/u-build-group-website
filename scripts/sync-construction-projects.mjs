import { load } from 'cheerio';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishGallery } from './sync-gallery.mjs';

export const projectsUrl = 'https://www.ubuildconstruction.ca/projects';
const allowedHosts = new Set(['www.ubuildconstruction.ca', 'ubuildconstruction.ca', 'cdn.prod.website-files.com']);

export function extractProjects(html) {
  const $ = load(html);
  const cards = $('.all-project-card');
  if (!cards.length) throw new Error('Construction Projects page has no recognizable project cards; keeping the previous collection.');
  const photos = new Map();
  cards.each((_, card) => {
    const title = $(card).find('h2').first().text().trim();
    const img = $(card).find('img').first();
    const src = img.attr('src');
    if (!title || !src) throw new Error('A Construction project is missing its title or photo.');
    let url = new URL(src, projectsUrl);
    if (url.pathname === '/_next/image') {
      const original = url.searchParams.get('url');
      if (!original) throw new Error('Missing original project image URL.');
      url = new URL(original, projectsUrl);
    }
    if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname)) throw new Error('Unrecognized project image host; review before publishing.');
    url.hash = '';
    const sourceUrl = url.href;
    photos.set(sourceUrl, { id: sourceUrl, name: `${title}.webp`, title, alt: img.attr('alt')?.trim() || title, sourceUrl });
  });
  return [...photos.values()];
}

async function download(url, maxBytes) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Construction photo refresh returned HTTP ${response.status}.`);
  const reader = response.body.getReader();
  const chunks = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxBytes) { await reader.cancel(); throw new Error('Construction response exceeds the size limit.'); }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

export async function syncConstructionProjects() {
  const html = (await download(projectsUrl, 5 * 1024 * 1024)).toString('utf8');
  const projects = extractProjects(html);
  const photos = await publishGallery(projects, (item) => download(item.sourceUrl, 50 * 1024 * 1024), process.cwd(), 'construction-projects');
  console.log(`Refreshed ${photos.length} project photographs from ${projectsUrl}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await syncConstructionProjects(); }
  catch (error) {
    if (!process.argv.includes('--allow-stale')) { console.error(error.message); process.exitCode = 1; }
    else {
      try {
        const photos = JSON.parse(await readFile('app/data/construction-projects.json', 'utf8'));
        if (!photos.length) throw new Error('No saved Construction photos available.');
        for (const photo of photos) {
          await access(path.join('public/construction-projects', path.basename(photo.src)));
          await access(path.join('public/construction-projects', path.basename(photo.thumbnail)));
        }
        console.warn(`${error.message} Using ${photos.length} previously saved Construction photos.`);
      } catch { console.error('Construction refresh failed and no complete saved collection is available.'); process.exitCode = 1; }
    }
  }
}
