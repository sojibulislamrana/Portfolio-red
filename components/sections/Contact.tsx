"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { siteConfig, socialLinks } from "@/data/navigation";

gsap.registerPlugin(ScrollTrigger);

const ctaWords = ["LET'S", "BUILD", "SOMETHING", "MEANINGFUL."];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll(".cta-word");
      if (words) {
        gsap.fromTo(
          words,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        linksRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-black-soft section-padding overflow-hidden"
      aria-label="Contact"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/30 to-transparent" />

      {/* Background red radial glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse at center bottom, #F40C3F, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-wide">
        <SectionLabel index="04" label="Contact" className="mb-12" light />

        {/* Oversized CTA words — each on its own overflow-hidden row */}
        <div ref={wordsRef} className="mb-16 lg:mb-20">
          {ctaWords.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className={`cta-word font-display leading-none ${
                  i === 1
                    ? "text-red"
                    : i === 3
                    ? "text-white/90"
                    : "text-white"
                }`}
                style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)" }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>

        {/* Links row */}
        <div
          ref={linksRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-10 sm:gap-0"
        >
          {/* Primary email CTA */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-muted/40 tracking-widest uppercase">
              Start a conversation
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-3 font-sans text-lg sm:text-xl text-white hover:text-red transition-colors duration-300"
              aria-label={`Send email to ${siteConfig.name}`}
            >
              <span className="border-b border-white/20 group-hover:border-red/60 pb-0.5 transition-colors duration-300">
                {siteConfig.email}
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-muted/40 tracking-widest uppercase">
              Find me online
            </span>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-mono text-sm text-muted/60 hover:text-white transition-colors duration-300"
                  aria-label={`${link.label} profile`}
                >
                  <span className="h-px w-4 bg-current opacity-30 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" />
                  <span>{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
