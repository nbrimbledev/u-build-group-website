"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { HeroProjectCarousel } from "./HeroProjectCarousel";

const companies = [
  {
    name: "U Build Construction Division",
    type: "Construction company",
    focus: "Commercial and public construction projects across Manitoba.",
    href: "https://www.ubuildconstruction.ca",
    accent: "construction",
    status: "Visit company site",
    mark: "/brand/u-build-construction-logo.png",
  },
  {
    name: "Everett Construction Group",
    type: "Indigenous owned and operated",
    focus: "Construction for northern, remote and First Nations communities.",
    href: "https://www.everettconstructiongroup.ca/",
    accent: "everett",
    status: "Visit company site",
    mark: "/brand/everett-logo.svg",
  },
  {
    name: "U Build Developments",
    type: "Future company",
    focus: "Commercial property ownership and leasing, including 9158 Quarry Road in Stony Mountain.",
    href: null,
    accent: "properties",
    status: "Coming 2026",
    mark: "/brand/u-build-developments-logo-2026.png",
  },
] as const;

const companyVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 190, damping: 24, delay: index * 0.06 },
  }),
};

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function DivisionGateway() {
  const reduceMotion = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const artBoundsRef = useRef<DOMRect | null>(null);
  const buildingsXValue = useMotionValue(0);
  const buildingsYValue = useMotionValue(0);
  const buildingsX = useSpring(buildingsXValue, { stiffness: 90, damping: 20, mass: 0.65 });
  const buildingsY = useSpring(buildingsYValue, { stiffness: 90, damping: 20, mass: 0.65 });
  const buildingsStyle = useMemo(
    () => ({ x: buildingsX, y: buildingsY }),
    [buildingsX, buildingsY],
  );

  return (
    <section className="portfolio-gateway" id="companies" aria-labelledby="gateway-title">
      <header className="portfolio-header">
        <a className="portfolio-brand" href="#top" aria-label="U Build Group home">
          <span className="portfolio-brand-mark">
            <Image src="/brand/u-mark-blue.svg" alt="" width={44} height={44} priority />
          </span>
          <span>U Build <b>Group</b></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#group">The group</a>
          <a href="#reach">Where we operate</a>
          <a href="/team">Meet the team</a>
        </nav>
        <a className="portfolio-phone" href="tel:+12049771956">(204) 977-1956</a>
      </header>

      <div className="portfolio-hero" id="top">
        <HeroProjectCarousel />
        <div className="portfolio-hero-copy">
          <h1 id="gateway-title">Manitoba companies, working from one foundation.</h1>
          <span>Choose the company whose focus fits your location and project.</span>
          <a className="company-jump" href="#company-routes">
            Choose a company
            <DownArrowIcon />
          </a>
        </div>
        <motion.div
          ref={artRef}
          className="portfolio-hero-art"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") artBoundsRef.current = event.currentTarget.getBoundingClientRect();
          }}
          onPointerMove={(event) => {
            if (reduceMotion || event.pointerType !== "mouse") return;
            const bounds = artBoundsRef.current;
            if (!bounds) return;
            const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
            buildingsXValue.set(relativeX * 18);
            buildingsYValue.set(relativeY * 14);
          }}
          onPointerLeave={() => {
            artBoundsRef.current = null;
            buildingsXValue.set(0);
            buildingsYValue.set(0);
          }}
          aria-hidden="true"
        >
          <motion.span className="hero-buildings-motion" style={buildingsStyle}>
            <Image
              className="hero-buildings"
              src="/brand/ubuild-group-buildings.svg"
              alt=""
              width={822}
              height={468}
              priority
            />
          </motion.span>
        </motion.div>
      </div>

      <div className="company-bands" id="company-routes" aria-label="U Build Group companies">
        {companies.map((company, index) => {
          const content = (
            <>
              <span className="company-icon-frame" aria-hidden="true">
                <Image src={company.mark} alt="" width={176} height={104} />
              </span>
              <span className="company-band-copy">
                <small>{company.type}</small>
                <strong>{company.name}</strong>
                <span>{company.focus}</span>
              </span>
              <span className="company-band-action">
                {company.status}
                {company.href ? (
                  <>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                    <ExternalLinkIcon />
                  </>
                ) : null}
              </span>
            </>
          );

          return company.href ? (
            <motion.a
              className={`company-band is-${company.accent}`}
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={index}
              variants={companyVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              key={company.name}
            >
              {content}
            </motion.a>
          ) : (
            <motion.article
              className={`company-band is-${company.accent} is-pending`}
              custom={index}
              variants={companyVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              key={company.name}
            >
              {content}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
