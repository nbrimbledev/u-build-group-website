import { readdir, stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { publishGallery } from './sync-gallery.mjs';
const folder = process.argv[2];
if (!folder) throw new Error('Supply the local OneDrive Gallery folder path.');
const items = [];
async function collect(relative = '', featured = false) {
  for (const entry of await readdir(path.join(folder, relative), { withFileTypes: true })) {
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) await collect(name, featured || entry.name.toLowerCase() === 'featured');
    else if (entry.isFile() && /\.(jpe?g|png|webp|avif|tiff?)$/i.test(entry.name)) {
      const info = await stat(path.join(folder, name));
      items.push({ id: `local:${name}`, name: entry.name, localPath: name, size: info.size, eTag: `${info.size}-${Math.round(info.mtimeMs)}`, featured });
    }
  }
}
await collect();
if (!items.length) throw new Error('No photos found. Existing gallery retained.');
const photos = await publishGallery(items, item => readFile(path.join(folder, item.localPath)));
console.log(`${items.length} source files → ${photos.length} unique gallery photos, ${photos.filter(p => p.featured).length} featured.`);
