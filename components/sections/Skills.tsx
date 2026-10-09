"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import skills from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      const cols = gridRef.current?.querySelectorAll(".skill-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "expo.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // All unique tech names for the marquee ticker
  const allTech = skills.flatMap((g) => g.items.map((i) => i.name));

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-black section-padding overflow-hidden"
      aria-label="Technical capabilities"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="container-wide">
        <SectionLabel index="03" label="Capabilities" className="mb-12" />

        <h2
          ref={headingRef}
          className="font-display text-display-lg text-white leading-none mb-16 lg:mb-20"
        >
          HOW I<br />
          <span style={{ color: "var(--color-red)" }}>BUILD</span>
        </h2>

        {/* Three-column skill grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5"
        >
          {skills.map((group, gi) => (
            <div
              key={group.id}
              className={`skill-col flex flex-col p-8 lg:p-10 ${
                gi < skills.length - 1 ? "md:border-r border-b md:border-b-0 border-white/5" : ""
              }`}
            >
              {/* Ghost category title */}
              <div
                className="skill-category-title mb-6 select-none"
                aria-hidden="true"
              >
                {group.label}
              </div>

              {/* Category heading */}
              <h3 className="font-mono text-xs tracking-widest text-muted/60 uppercase mb-6">
                {group.category}
              </h3>

              {/* Skill list */}
              <ul className="flex flex-col gap-3">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        skill.level === "strong"
                          ? "text-white/80 group-hover:text-white"
                          : "text-muted/50 group-hover:text-muted"
                      }`}
                    >
                      {skill.name}
                    </span>
                    {skill.level === "learning" && skill.note && (
                      <span className="font-mono text-[0.55rem] tracking-widest text-red/50 uppercase shrink-0">
                        {skill.note}
                      </span>
                    )}
                    {skill.level === "strong" && (
                      <span className="h-px flex-1 max-w-[2rem] bg-white/10 group-hover:bg-red/30 transition-colors duration-300" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-white/30" />
            <span className="font-mono text-[0.6rem] text-muted/50 tracking-widest uppercase">
              Established
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.6rem] text-red/50 tracking-widest uppercase">
              Active
            </span>
            <span className="font-mono text-[0.6rem] text-muted/30">/</span>
            <span className="font-mono text-[0.6rem] text-red/50 tracking-widest uppercase">
              Growing
            </span>
            <span className="font-mono text-[0.6rem] text-muted/30 ml-1">
              = learning
            </span>
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div
        ref={marqueeRef}
        className="mt-20 border-t border-b border-white/5 py-4 overflow-hidden"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[...allTech, ...allTech].map((tech, i) => (
            <span
              key={i}
              className="font-mono text-xs text-muted/25 tracking-widest uppercase px-6 shrink-0"
            >
              {tech}
              <span className="ml-6 text-red/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
