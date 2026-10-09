"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    icon: "01",
    text: "Building web applications that balance design clarity with engineering rigour.",
  },
  {
    icon: "02",
    text: "Learning through implementation — writing real code against real constraints.",
  },
  {
    icon: "03",
    text: "Exploring Linux and terminal-first workflows as a daily development discipline.",
  },
  {
    icon: "04",
    text: "Understanding systems beyond the UI: networking, processes, data structures.",
  },
  {
    icon: "05",
    text: "Contributing to and learning from the open-source ecosystem.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLParagraphElement>(null);
  const statementsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Heading reveal — slides from left
      gsap.fromTo(
        headingRef.current,
        { xPercent: -8, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Philosophy paragraph — clip reveal line by line
      gsap.fromTo(
        philosophyRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Statement items — staggered reveal
      const items = statementsRef.current?.querySelectorAll("li");
      if (items) {
        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: statementsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-black section-padding overflow-hidden"
      aria-label="About"
    >
      {/* Subtle red glow top-right */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #F40C3F, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-wide">
        <SectionLabel index="01" label="About" className="mb-12" />

        {/* Large editorial heading — partially bleeds left */}
        <div ref={headingRef} className="mb-16 lg:mb-20 overflow-hidden">
          <h2
            className="font-display text-display-xl text-white leading-none"
            style={{ marginLeft: "clamp(-1rem, -2vw, -3rem)" }}
          >
            THE <span style={{ color: "var(--color-red)" }}>DETAILS</span>
            <br />
            MATTER.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — philosophy */}
          <div className="flex flex-col gap-8">
            <p
              ref={philosophyRef}
              className="text-muted text-lg lg:text-xl leading-relaxed"
            >
              I care about the details users notice, the architecture developers
              maintain, and the fundamentals that make software reliable.
            </p>

            <div className="rule" />

            <p className="text-muted/70 leading-relaxed">
              I work with modern frontend technologies while continuously
              strengthening my understanding of backend systems, algorithms,
              Linux, and software engineering. I&apos;m not building a
              r&eacute;sum&eacute; &mdash; I&apos;m building an understanding.
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted/40 tracking-widest">Stack</span>
                <span className="h-px flex-1 bg-white/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Linux"].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.65rem] tracking-wide px-2.5 py-1 border border-white/10 text-muted/70 hover:border-red/40 hover:text-white transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — statements timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs text-muted/40 tracking-widest uppercase">
                What I focus on
              </span>
              <span className="h-px flex-1 bg-white/5" />
            </div>

            <ul ref={statementsRef} className="flex flex-col">
              {statements.map((s, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-5 py-5 border-b border-white/5 last:border-b-0 hover:border-red/20 transition-colors duration-300"
                >
                  <span className="font-mono text-[0.6rem] text-red/50 tracking-widest mt-1 shrink-0 group-hover:text-red transition-colors duration-300">
                    {s.icon}
                  </span>
                  <p className="text-muted/70 text-sm leading-relaxed group-hover:text-muted transition-colors duration-300">
                    {s.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
