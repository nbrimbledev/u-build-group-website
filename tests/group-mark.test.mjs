import { load } from "cheerio";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { after, test } from "node:test";

const port = 43199;
const origin = `http://127.0.0.1:${port}`;
const server = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: process.cwd(),
  stdio: "ignore",
});

after(() => server.kill());

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return response;
    } catch {
      // The development server has not opened its port yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("The site did not start within 30 seconds");
}

test("the Group U SVG is used throughout the rendered site", async () => {
  const response = await waitForServer();
  const html = await response.text();
  const mark = "/brand/u-mark-blue.svg";

  assert.ok(
    /<link[^>]+rel="icon"[^>]+href="\/brand\/u-mark-blue\.svg"/.test(html),
    "the document should declare the Group SVG as its favicon",
  );
  assert.equal((html.match(/<img[^>]+src="\/brand\/u-mark-blue\.svg"/g) ?? []).length, 2);
  assert.ok(html.includes(`https://ubuildgroup.ca${mark}`));

  const manifestResponse = await fetch(`${origin}/manifest.webmanifest`);
  assert.equal(manifestResponse.status, 200);
  const manifest = await manifestResponse.json();
  assert.deepEqual(manifest.icons, [{ src: mark, sizes: "any", type: "image/svg+xml" }]);

  const markResponse = await fetch(`${origin}${mark}`);
  assert.equal(markResponse.status, 200);
  assert.match(markResponse.headers.get("content-type") ?? "", /image\/svg\+xml/);
  assert.match(await markResponse.text(), /viewBox="0 0 1000 1000"/);
});

test("the hero renders every Construction project image in its ambient carousel", async () => {
  const response = await waitForServer();
  const html = await response.text();
  const projectImages = [
    "coop-academy-pharmacy.webp",
    "hero.jpg",
    "kelsey-estates.webp",
    "stony-mountain-commercial-rental-units.webp",
    "west-hawk-lake.webp",
  ];

  assert.match(html, /class="hero-project-carousel"[^>]+aria-hidden="true"/);
  assert.match(html, /class="hero-project-carousel-row is-forward"/);
  assert.match(html, /class="hero-project-carousel-row is-reverse"/);
  const construction = JSON.parse(await readFile("app/data/construction-projects.json", "utf8"));
  const originalUrls = new Set(projectImages.map((name) => `https://www.ubuildconstruction.ca/projects/${name}`));
  const additional = construction.filter((photo) => !originalUrls.has(photo.sourceUrl));
  const synced = JSON.parse(await readFile("app/data/gallery-synced.json", "utf8"));
  const heroAdditions = synced.filter(photo => photo.featured);
  assert.equal((html.match(/class="hero-project-frame"/g) ?? []).length, (projectImages.length + additional.length + heroAdditions.length) * 2);
  for (const photo of additional) {
    assert.ok(html.includes(photo.src.split("/").pop()), `${photo.title} from the Construction page should appear in the hero`);
  }
  const galleryResponse = await fetch(`${origin}/gallery`);
  assert.equal(galleryResponse.status, 200);
  const galleryHtml = await galleryResponse.text();
  const gallery = load(galleryHtml);
  const labels = gallery(".gallery-card").map((_, element) => gallery(element).attr("aria-label")).get();
  for (const photo of additional) assert.ok(labels.includes(`Enlarge ${photo.title}`), `${photo.title} should appear in the gallery`);

  for (const image of projectImages) {
    assert.ok(html.includes(image), `${image} should appear in the hero carousel`);
  }
});

test("the hero uses the supplied Developments logo without the coloured footer strip", async () => {
  const logo = await readFile("public/brand/u-build-developments-logo-2026.png");
  const stylesheet = await readFile("app/globals.css", "utf8");

  assert.equal(logo.readUInt32BE(16), 1600);
  assert.equal(logo.readUInt32BE(20), 800);
  assert.doesNotMatch(stylesheet, /\.portfolio-hero::before/);
});

test("the fixed Group U background continues from the foundation through the map introduction", async () => {
  const response = await waitForServer();
  const html = await response.text();

  assert.match(html, /class="group-section"[^>]+id="group"/);
  assert.equal((html.match(/class="group-brand-watermark"[^>]+aria-hidden="true"/g) ?? []).length, 2);
  assert.match(html, /class="reach-heading-field"/);
  assert.match(html, /class="content-section reach-map-content"/);
});
