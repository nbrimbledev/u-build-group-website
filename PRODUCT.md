# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are prospective clients and community representatives in Manitoba who need to determine which U Build Group company is suited to their project or community.

Job seekers use the Careers page to find roles with U Build Group and apply to its shared team.

Partners and procurement reviewers may also use the site to understand the relationship between the companies and confirm the Group's corporate credibility. They are supporting audiences rather than the homepage's first priority.

## Product Purpose

U Build Group is the parent-company website for a portfolio of Manitoba construction and development companies. It gives visitors a concise overview of the Group, helps them select the appropriate company, and routes them to that company's website for detailed services and contact.

A successful visit establishes confidence in the Group and ends with the visitor entering one of its company websites.

## Positioning

The site provides one clear entry point into companies with distinct mandates:

- U Build Construction Division serves construction needs across Manitoba outside Everett's specialized focus.
- Everett Construction Group focuses on northern, remote, and First Nations communities.
- U Build Developments will cover the Group's property ownership, leasing, and development activity when it launches.

The Group website explains this relationship without competing with the operating companies for project inquiries or detailed service content.

## Operating Context

Visitors may arrive knowing U Build Group without knowing which company they need. The company gateway is therefore the central workflow. Each active company route opens its separate website, where the visitor can evaluate services and make contact.

The Group does not use a general project inquiry form. Shared office contact details remain available in the footer for corporate context. Careers has its own application form on the Group website because employees work for U Build Group across its companies, as confirmed by the user.

## Capabilities and Constraints

- The public site will live at `ubuildgroup.ca`.
- The site must provide clear routes to all three company identities.
- U Build Construction Division and Everett Construction Group link to their existing websites.
- U Build Developments remains a visible placeholder with a confirmed 2026 launch commitment until its separate site is available.
- Detailed project portfolios, testimonials, construction credentials, and service delivery content belong primarily on the operating-company websites.
- Statistics currently present on the Group site are reported by U Build Construction Division and must not be presented as Group-wide totals.
- The shared office email is `info@ubuildconstruction.ca`. The Group site does not collect general project inquiries through a form.
- The Group owns the Careers role list and application form. Employees support its companies as project needs change.
- Careers initially lists eight roles verified against the live Construction careers page on 28 September 2026, grouped by trade. Apply selects the exact trade and role in the form on the same page; general applications are also available.
- Applications continue to reach `careers@ubuildconstruction.ca`. The form accepts a required résumé up to 3 MB and an optional cover letter up to 1 MB. Functional details and deployment requirements are recorded in `docs/careers.md`.

## Brand Commitments

- The parent brand is written `U Build Group`, with a space between “U” and “Build.”
- The operating company is written `U Build Construction Division`, with a space between “U” and “Build.”
- The property company is written `U Build Developments`.
- `Everett Construction Group` retains its distinct company name.
- The Group and its operating companies should remain visually recognizable as related companies without making their websites feel interchangeable.
- Existing company and Group marks are the source assets. The Group's current three-building symbol is stored at `public/brand/ubuild-group-buildings.svg`.

## Evidence on Hand

- Group mark: `public/brand/u-mark-blue.svg`
- Group three-building symbol: `public/brand/ubuild-group-buildings.svg`
- Everett marks: `public/brand/everett-logo.svg` and `public/brand/everett-mark.svg`
- Shared office details and public social links: `app/site-data.ts`
- Company descriptions and routes: `app/components/DivisionGateway.tsx`
- U Build Construction Division logo: `public/brand/u-build-construction-logo.png`
- U Build Developments logo: `public/brand/u-build-developments-logo-2026.png`
- U Build Construction Division statistics: `app/site-data.ts`
- U Build Construction Division project imagery used as a quiet hero backdrop: `public/project-carousel/`
- A Manitoba service-area map is available at `public/manitoba-map.html`.
- U Build Developments owns the commercial building at 9158 Quarry Road, Stony Mountain, Manitoba R0C 3A0. Current tenants are Tim Hortons, Esso and Stony Mountain Convenience.

No Group-level testimonials, case studies, client list, or independently verified Group-wide performance statistics are currently on hand. Future work must not fabricate them.

## Product Principles

- Help visitors choose a company quickly and confidently.
- Use the Group site to establish corporate credibility while leaving detailed service claims to each company.
- Preserve the distinct mandate and identity of every company.
- Label future companies and unverified information honestly.
