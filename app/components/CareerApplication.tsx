"use client";

import { useRef, useState, type FormEvent } from "react";
import { careersEmail, GENERAL_APPLICATION, jobCategories, MAX_COVER_LETTER_SIZE, MAX_RESUME_SIZE, roleValue } from "../careers-data";

export function CareerApplication() {
  const [selectedRole, setSelectedRole] = useState(GENERAL_APPLICATION);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);

  function showError(text: string) {
    setMessage(text);
    setStatus("error");
    requestAnimationFrame(() => feedback.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    for (const [name, label, limit] of [["resume", "Résumé", MAX_RESUME_SIZE], ["coverLetter", "Cover letter", MAX_COVER_LETTER_SIZE]] as const) {
      const file = data.get(name);
      if (file instanceof File && file.size) {
        if (!/\.(pdf|doc|docx)$/i.test(file.name)) { showError(`${label} must be a PDF, DOC or DOCX file.`); return; }
        if (file.size > limit) { showError(`${label} must be ${limit / 1024 / 1024} MB or smaller.`); return; }
      }
    }
    submitting.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/careers/apply", { method: "POST", body: data, signal: AbortSignal.timeout(45000) });
      const result = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) {
        showError(result?.message || (response.status === 413 ? "Your attachments are too large. Use a résumé under 3 MB and a cover letter under 1 MB." : "Your application couldn’t be sent. Please try again or email our careers team."));
        return;
      }
      form.reset();
      setSelectedRole(GENERAL_APPLICATION);
      setStatus("success");
      setMessage("Your application has been sent to the U Build Group careers team. Thank you for applying.");
      requestAnimationFrame(() => feedback.current?.focus());
    } catch {
      showError("We couldn’t confirm your submission. Check your connection and try again, or email our careers team. Your details are still here.");
    } finally { submitting.current = false; }
  }

  return <>
    <section id="openings" className="careers-openings" aria-labelledby="openings-title">
      <div className="careers-section-heading">
        <h2 id="openings-title">Current opportunities.</h2>
        <p>Explore roles by trade. You’ll join the Group, with assignments across its companies based on the work required.</p>
      </div>
      {jobCategories.filter((category) => category.applicationsOpen).map((category) => <section className="careers-category" key={category.name} aria-labelledby={`category-${category.name}`}>
        <h3 id={`category-${category.name}`}>{category.name}</h3>
        <div>{category.roles.map((role) => <article className="careers-role" key={role.title}>
          <div><h4>{role.title}</h4><p className="careers-role-meta">{role.type}{role.priority && <span>Priority role</span>}</p></div>
          <p>{role.description}</p>
          <a href="#apply" aria-label={`Apply for ${category.name} ${role.title}`} onClick={() => setSelectedRole(roleValue(category.name, role.title))}>Apply <span aria-hidden="true">↗</span></a>
        </article>)}</div>
      </section>)}
      {!jobCategories.some((category) => category.applicationsOpen && category.roles.length) && <p>No specific roles are open right now. You can still send a general application below.</p>}
    </section>
    <section id="apply" className="careers-apply" aria-labelledby="apply-title">
      <div className="careers-apply-intro">
        <h2 id="apply-title">Tell us about yourself.</h2>
        <p>Send your résumé to the U Build Group careers team. Choose a role above, or submit a general application.</p>
        <p>Prefer email? Send your application to <a href={`mailto:${careersEmail}`}>{careersEmail}</a>.</p>
      </div>
      <form className="careers-form" onSubmit={submit} action="/api/careers/apply" method="post" encType="multipart/form-data" aria-busy={status === "sending"}>
        <p className="careers-form-note">Fields marked * are required.</p>
        <fieldset disabled={status === "sending"}>
          <legend className="visually-hidden">Your application</legend>
          <div className="careers-fields">
            <label>Full name *<input name="fullName" autoComplete="name" maxLength={100} required /></label>
            <label>Email address *<input name="email" type="email" autoComplete="email" maxLength={200} required /></label>
            <label>Role *<select name="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} required>
              <option value={GENERAL_APPLICATION}>General application</option>
              {jobCategories.filter((category) => category.applicationsOpen).map((category) => <optgroup label={category.name} key={category.name}>{category.roles.map((role) => <option key={role.title} value={roleValue(category.name, role.title)}>{category.name} · {role.title}</option>)}</optgroup>)}
            </select></label>
            <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
            <label className="careers-field-wide">Résumé *<input name="resume" type="file" accept=".pdf,.doc,.docx" aria-describedby="resume-help" required /><small id="resume-help">PDF, DOC or DOCX. Maximum 3 MB.</small></label>
            <label className="careers-field-wide">Cover letter<input name="coverLetter" type="file" accept=".pdf,.doc,.docx" aria-describedby="cover-help" /><small id="cover-help">Optional. PDF, DOC or DOCX. Maximum 1 MB.</small></label>
            <label className="careers-field-wide">Message<textarea name="message" rows={5} maxLength={2000} /></label>
          </div>
          <div className="careers-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <button className="careers-submit" type="submit">{status === "sending" ? "Sending application…" : "Submit application"}</button>
        </fieldset>
        <div ref={feedback} tabIndex={-1} role={status === "error" ? "alert" : "status"} className={`careers-feedback ${status === "error" ? "is-error" : ""}`}>
          {message && <p>{message}</p>}
        </div>
        <p className="careers-form-note">Your details and attachments are emailed to our careers team to review your application.</p>
        <noscript><p>You can submit this form without JavaScript. To apply for a specific position, select it in the Role field.</p></noscript>
      </form>
    </section>
  </>;
}
