import { careersEmail, MAX_COVER_LETTER_SIZE, MAX_RESUME_SIZE, validRoles } from "../../../careers-data";

export const runtime = "nodejs";
const MAX_BODY = 4 * 1024 * 1024 + 64 * 1024;
const allowedTypes = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream", ""]);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

function reply(request: Request, message: string, status = 200) {
  if (request.headers.get("accept")?.includes("text/html")) {
    return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Application | U Build Group</title><body style="font:18px/1.6 system-ui;padding:32px;max-width:700px;margin:auto"><main><h1>${status < 400 ? "Application sent" : "Application not sent"}</h1><p>${escapeHtml(message)}</p><p><a href="/careers#apply">Return to careers</a></p><p><a href="mailto:${careersEmail}">Email the careers team</a></p></main></body></html>`, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  }
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readForm(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY) throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("form");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error("size"); }
    chunks.push(value);
  }
  return new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type") ?? "" } }).formData();
}

async function attachment(file: File, label: string, maximum: number) {
  if (file.size > maximum) throw new Error(`${label} must be ${maximum / 1024 / 1024} MB or smaller.`);
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension) || !allowedTypes.has(file.type)) throw new Error(`${label} must be a PDF, DOC or DOCX file.`);
  const bytes = Buffer.from(await file.arrayBuffer());
  const valid = extension === "pdf" ? bytes.subarray(0, 5).toString() === "%PDF-" : extension === "doc" ? bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) : bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  if (!valid) throw new Error(`${label} doesn’t appear to be a valid ${extension.toUpperCase()} document. Please export it again.`);
  return new File([bytes], (file.name.split(/[\\/]/).pop() ?? `document.${extension}`).replace(/[\x00-\x1f\x7f]/g, "").slice(-180), { type: extension === "pdf" ? "application/pdf" : extension === "doc" ? "application/msword" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = origin === "https://www.ubuildgroup.ca" || origin === "https://ubuildgroup.ca" || (process.env.NODE_ENV !== "production" && /^http:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(origin ?? ""));
  if (origin && !allowedOrigin) return reply(request, "Please apply through the U Build Group careers page.", 403);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) return reply(request, "Submit the careers form with your résumé attached.", 400);
  let form: FormData;
  try { form = await readForm(request); }
  catch (error) { return reply(request, error instanceof Error && error.message === "size" ? "Your attachments are too large. Use a résumé under 3 MB and a cover letter under 1 MB." : "We couldn’t read the application. Please try again.", error instanceof Error && error.message === "size" ? 413 : 400); }
  const text = (key: string) => typeof form.get(key) === "string" ? (form.get(key) as string).trim() : "";
  if (text("website")) return reply(request, "Application received.");
  const fullName = text("fullName"), email = text("email"), phone = text("phone"), role = text("role"), message = text("message");
  if (!fullName || fullName.length > 100 || /[\r\n]/.test(fullName)) return reply(request, "Enter your full name (up to 100 characters).", 400);
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(request, "Enter a valid email address.", 400);
  if (!validRoles.has(role)) return reply(request, "Select one of the available roles or General application.", 400);
  if (phone.length > 40 || message.length > 2000) return reply(request, "Use up to 40 characters for your phone number and 2,000 for your message.", 400);
  const resume = form.get("resume"), cover = form.get("coverLetter");
  if (!(resume instanceof File) || !resume.size) return reply(request, "Attach your résumé before submitting.", 400);
  const delivery = new FormData();
  for (const [key, value] of Object.entries({ fullName, email, phone, role, message })) delivery.set(key, value);
  try {
    delivery.set("resume", await attachment(resume, "Résumé", MAX_RESUME_SIZE));
    if (cover instanceof File && cover.size) delivery.set("coverLetter", await attachment(cover, "Cover letter", MAX_COVER_LETTER_SIZE));
  } catch (error) { return reply(request, error instanceof Error ? error.message : "Check your attachments and try again.", 400); }
  // Keep the established private email service; applicants interact only with Group.
  try {
    const response = await fetch("https://www.ubuildconstruction.ca/api/careers/apply", {
      method: "POST", body: delivery, signal: AbortSignal.timeout(35000), redirect: "error",
    });
    const result = await response.json() as { message?: string };
    if (!response.ok) {
      const status = [400, 413, 429, 503].includes(response.status) ? response.status : 502;
      return reply(request, result.message || `Your application couldn’t be sent. Please retry or email ${careersEmail}.`, status);
    }
    if (!result.message) return reply(request, "We couldn’t confirm your submission. Please try again.", 502);
    return reply(request, "Your application has been sent to the U Build Group careers team. Thank you for applying.");
  } catch { return reply(request, "We couldn’t confirm your submission. Check your connection and try again, or email our careers team.", 502); }
}
