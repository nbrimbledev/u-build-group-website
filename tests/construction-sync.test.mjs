import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extractProjects } from '../scripts/sync-construction-projects.mjs';

test('reads all project cards, unwraps Next image URLs, decodes captions and ignores unrelated images', () => {
  const html = `<img src="/brand/logo.svg"><article class="all-project-card"><img src="/_next/image?url=%2Fprojects%2Fexample.webp&amp;w=800" alt="Site &amp; building"><h2>School &amp; centre</h2></article><article class="all-project-card"><img src="https://cdn.prod.website-files.com/site/photo.jpg"><h2>Another project</h2></article><article class="all-project-card"><img src="/projects/example.webp"><h2>Duplicate</h2></article>`;
  const photos = extractProjects(html);
  assert.equal(photos.length, 2);
  assert.equal(photos[0].sourceUrl, 'https://www.ubuildconstruction.ca/projects/example.webp');
  assert.equal(photos[1].title, 'Another project');
  const single = extractProjects(html.split('<article class="all-project-card">')[0] + '<article class="all-project-card"><img src="/projects/photo.webp" alt="Site &amp; building"><h2>School &amp; centre</h2></article>');
  assert.equal(single[0].title, 'School & centre');
  assert.equal(single[0].alt, 'Site & building');
});

test('fails closed when the source layout changes or includes incomplete or untrusted images', () => {
  assert.throws(() => extractProjects('<h1>Service unavailable</h1>'));
  assert.throws(() => extractProjects('<article class="all-project-card"><h2>No photo</h2></article>'));
  assert.throws(() => extractProjects('<article class="all-project-card"><h2>Untrusted</h2><img src="https://unknown.example/photo.jpg"></article>'));
});
