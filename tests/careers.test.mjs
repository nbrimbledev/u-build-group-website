import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
const result = await build({ entryPoints: ['app/api/careers/apply/route.ts'], bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external' });
const compiledModule = { exports: {} };
new Function('require', 'module', 'exports', result.outputFiles[0].text)(createRequire(import.meta.url), compiledModule, compiledModule.exports);
const { POST } = compiledModule.exports;

function application(overrides = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ fullName: 'Test Applicant', email: 'applicant@example.com', role: 'Carpentry Carpenter', message: 'Résumé test with accents: é.', ...overrides })) form.set(key, value);
  if (!form.has('resume')) form.set('resume', new File(['%PDF-1.7\nTest only'], 'resume.pdf', { type: 'application/pdf' }));
  return form;
}
function request(form, headers = {}) {
  return new Request('https://www.ubuildgroup.ca/api/careers/apply', { method: 'POST', headers: { origin: 'https://www.ubuildgroup.ca', ...headers }, body: form });
}

test('careers validation rejects invalid submissions without contacting the email provider', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Provider should not be called'); };
  try {
    for (const overrides of [{ email: 'bad' }, { fullName: '' }, { role: 'Removed role' }, { resume: new File(['not a pdf'], 'resume.pdf', { type: 'application/pdf' }) }, { resume: new File([new Uint8Array(3 * 1024 * 1024 + 1)], 'large.pdf', { type: 'application/pdf' }) }]) {
      assert.equal((await POST(request(application(overrides)))).status, 400);
    }
    assert.equal((await POST(request(application(), { origin: 'https://other.example' }))).status, 403);
    assert.equal((await POST(request(application(), { 'content-length': String(5 * 1024 * 1024) }))).status, 413);
    assert.equal((await POST(request(application({ website: 'spam' })))).status, 200);
  } finally { globalThis.fetch = originalFetch; }
});

test('careers delivery forwards validated attachments and preserves failure and no-JavaScript responses', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return Response.json({ message: 'Application sent successfully.' }); };
  try {
    assert.equal((await POST(request(application()))).status, 200);
    assert.equal((await POST(request(application()))).status, 200);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, 'https://www.ubuildconstruction.ca/api/careers/apply');
    const payload = calls[0].options.body;
    assert.equal(payload.get('email'), 'applicant@example.com');
    assert.equal(payload.get('role'), 'Carpentry Carpenter');
    assert.equal(await payload.get('resume').text(), '%PDF-1.7\nTest only');
    for (const type of ['application/octet-stream', '']) {
      assert.equal((await POST(request(application({ resume: new File(['%PDF-1.7 Test'], 'generic.pdf', { type }) })))).status, 200);
      assert.equal(calls.at(-1).options.body.get('resume').type, 'application/pdf');
    }
    const html = await POST(request(application(), { accept: 'text/html' }));
    assert.match(html.headers.get('content-type'), /text\/html/);
    assert.match(await html.text(), /Application sent/);
    globalThis.fetch = async () => Response.json({}, { status: 500 });
    assert.equal((await POST(request(application()))).status, 502);
    globalThis.fetch = async () => Response.json({ message: 'Service unavailable' }, { status: 503 });
    assert.equal((await POST(request(application()))).status, 503);
  } finally { globalThis.fetch = originalFetch; }
});
