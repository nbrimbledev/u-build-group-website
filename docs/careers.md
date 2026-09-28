# Group careers

The Group website owns the public role list and application form. The eight initial roles were verified directly against the live Construction careers page on 28 September 2026. Search-cache results contained older roles and were not used.

The user confirmed that employees work for U Build Group and support its companies as required. Roles are therefore presented under Group and organized by Carpentry, Concrete and Civil. No pay, benefits, qualifications or legal employment terms were inferred.

Edit `app/data/careers.json` to open, change or close roles. The page, select options and API allowlist all derive from that file. `applicationsOpen: false` removes a category from applications; remove individual roles to close them. General applications remain available.

The Group form posts to its own `/api/careers/apply` route. After validation, Group forwards the application server-to-server to Construction’s existing email service. That service retains the private Resend credentials and delivers to `careers@ubuildconstruction.ca`. The sender display name identifies U Build Group. No email credentials are needed on Group. Construction reads Group’s public `/api/careers/roles` feed, so job changes still have one source. If the role feed fails, applications fail clearly rather than accepting an unverified role.

The form accepts PDF, DOC and DOCX. The résumé limit is 3 MB and optional cover letter 1 MB, staying within Vercel's request-body limit including multipart overhead. Validation runs on the server. Attachment type checking includes the expected file signature but is not a malware scanner. The application and documents are emailed, not stored in a new application database. The existing provider/mailbox retention policies still apply.

Identical retries use a content-derived provider idempotency key. Resend controls its retention window. A honeypot filters basic automated submissions; this is not a distributed rate limiter. Add platform abuse protection if traffic requires it.

The form works through a native POST when JavaScript is unavailable. Normal enhanced submissions preserve data on errors and restore focus to feedback. For repeated delivery failures, applicants can use the displayed careers email.

Construction's `/careers` route permanently redirects to `https://www.ubuildgroup.ca/careers`; its navigation can retain the existing link. The old route is removed from Construction's sitemap. The existing Construction API remains the delivery service and also supports applicants who already loaded the old form. Its role validation reads the Group feed, and it deduplicates identical delivery retries. Deploy Group successfully before enabling the Construction redirect.

Validation uses a mocked email provider and synthetic documents. No test application was sent to the real careers inbox. Confirm inbox receipt with an authorized human test before treating end-to-end email delivery as verified.
