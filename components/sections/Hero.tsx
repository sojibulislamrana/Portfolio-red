"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/data/navigation";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLDivElement>(null);
  const headline2Ref = useRef<HTMLDivElement>(null);
  const headline3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Red accent line draws in
      tl.fromTo(
        redLineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8 },
        0
      );

      // Headline lines stagger in from below, clipped
      tl.fromTo(
        [headline1Ref.current, headline2Ref.current, headline3Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 },
        0.2
      );

      // Sub text fades in
      tl.fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.8
      );

      // Meta row
      tl.fromTo(
        metaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.0
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end bg-black overflow-hidden"
      aria-label="Hero — introduction"
    >
      {/* Background grid lines — purely decorative */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F7F2ED 1px, transparent 1px), linear-gradient(to bottom, #F7F2ED 1px, transparent 1px)",
          backgroundSize: "clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)",
        }}
      />

      {/* Top-right binary decoration */}
      <div
        className="pointer-events-none absolute top-24 right-0 font-mono text-[0.5rem] text-white/5 leading-relaxed tracking-wider text-right pr-4 hidden lg:block"
        aria-hidden="true"
      >
        {binaryRows.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </div>

      {/* Red vertical accent — left edge */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red/40 to-transparent hidden lg:block"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="container-wide pb-16 lg:pb-20 pt-28 flex flex-col gap-0">

        {/* Section label */}
        <SectionLabel index="00" label="Introduction" className="mb-10 lg:mb-14" />

        {/* Headline — three oversized lines */}
        <div className="relative">
          {/* Red underline accent */}
          <div
            ref={redLineRef}
            className="absolute -top-3 left-0 h-0.5 w-24 bg-red"
            aria-hidden="true"
          />

          <div className="overflow-hidden">
            <div
              ref={headline1Ref}
              className="font-display text-display-2xl text-white leading-none"
            >
              TERMINAL
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={headline2Ref}
              className="font-display text-display-2xl leading-none"
              style={{ color: "var(--color-red)", WebkitTextStroke: "0" }}
            >
              -FIRST
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={headline3Ref}
              className="font-display text-display-2xl text-white/90 leading-none"
            >
              DEVELOPER
            </div>
          </div>
        </div>

        {/* Sub row */}
        <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0 justify-between">
          {/* Supporting statement */}
          <p
            ref={subRef}
            className="max-w-md text-muted text-base lg:text-lg leading-relaxed"
          >
            {siteConfig.heroSub}
          </p>

          {/* Meta — right aligned on large screens */}
          <div
            ref={metaRef}
            className="flex flex-col gap-3 lg:text-right"
          >
            <div className="flex items-center gap-3 lg:justify-end">
              <span className="font-mono text-xs text-muted/60 tracking-widest uppercase">
                {siteConfig.location}
              </span>
              <span className="h-px w-6 bg-muted/30" aria-hidden="true" />
              <span className="font-mono text-xs text-muted/60 tracking-widest uppercase">
                {siteConfig.role}
              </span>
            </div>

            <a
              href={`mailto:${siteConfig.email}`}
              className="group font-mono text-sm text-white/70 hover:text-red transition-colors duration-300 tracking-wide flex items-center gap-2 lg:justify-end"
              aria-label={`Email ${siteConfig.name}`}
            >
              <span>{siteConfig.email}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Bottom rule + scroll indicator */}
        <div
          ref={metaRef}
          className="mt-12 lg:mt-16 flex items-center justify-between"
        >
          <div className="rule flex-1 mr-8" />
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-3 font-mono text-[0.6rem] tracking-widest text-muted/40 uppercase"
            aria-hidden="true"
          >
            <ScrollArrow />
            <span>Scroll</span>
          </div>
        </div>
      </div>

      {/* Large background text — "SIR" watermark */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="font-display font-black text-white/[0.015] select-none leading-none"
          style={{ fontSize: "clamp(8rem, 30vw, 36rem)" }}
        >
          SIR
        </div>
      </div>
    </section>
  );
}

function ScrollArrow() {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden="true"
      className="animate-bounce"
    >
      <path
        d="M6 1v16M1 12l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Decorative binary art rows (purely visual)
const binaryRows = [
  "1 0 0 0 0 0 1   1 1 0 1 1 1 0",
  "1 0 1 0 1 1 1   1 1 0 1 1 1 1",
  "1 1 0 0 1 0 0   1 1 0 1 1 1 0",
  "1 0 1 0 1 0 0   1 1 0 1 0 0 0",
  "1 1 0 1 0 0 1   1 1 0 0 1 1 1",
  "1 1 1 0 0 1 1   1 1 0 1 1 1 1",
  "1 0 1 1 0 0 1   1 1 0 1 1 1 1",
  "1 1 1 0 1 0 1   1 1 1 0 0 1 0",
];
