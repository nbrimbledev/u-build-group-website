import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, rm, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { publishGallery } from '../scripts/sync-gallery.mjs';

test('gallery sync publishes optimized photos, reuses unchanged files, and preserves the collection on failure', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ubuild-gallery-'));
  try {
    const bytes = await sharp({ create: { width: 30, height: 20, channels: 3, background: '#014cbb' } }).png().toBuffer();
    const item = { id: 'fixture-photo', name: 'Project_View.png', eTag: 'v1', featured: true };
    const first = await publishGallery([item], async () => bytes, root);
    assert.equal(first[0].title, 'Project View');
    assert.equal(first[0].featured, true);
    const metadata = await sharp(path.join(root, 'public', first[0].src)).metadata();
    assert.equal(metadata.format, 'webp');
    const manifest = path.join(root, 'app/data/gallery-synced.json');
    const baseline = await readFile(manifest, 'utf8');
    await publishGallery([item], async () => { throw new Error('unchanged image must not download'); }, root);
    assert.equal(await readFile(manifest, 'utf8'), baseline);
    await assert.rejects(publishGallery([{ ...item, eTag: 'v2' }], async () => Buffer.from('invalid image'), root));
    assert.equal(await readFile(manifest, 'utf8'), baseline);
    await access(path.join(root, 'public', first[0].src));
    await assert.rejects(publishGallery([{ ...item, eTag: 'v3' }], async () => { throw new Error('Microsoft unavailable'); }, root));
    assert.equal(await readFile(manifest, 'utf8'), baseline);
    await publishGallery([], async () => bytes, root);
    assert.deepEqual(JSON.parse(await readFile(manifest, 'utf8')), []);
    await assert.rejects(access(path.join(root, 'public', first[0].src)));
  } finally { await rm(root, { recursive: true, force: true }); }
});
