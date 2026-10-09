"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import projects, { Project } from "@/data/projects";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      const rows = listRef.current?.querySelectorAll(".project-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.13,
            ease: "expo.out",
            scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-black-soft section-padding overflow-hidden"
      aria-label="Selected work"
    >
      {/* Section border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <SectionLabel index="02" label="Selected Work" className="mb-5" />
            <h2
              ref={headingRef}
              className="font-display text-display-lg text-white leading-none"
            >
              WHAT I&apos;VE
              <br />
              <span style={{ color: "var(--color-red)" }}>BUILT</span>
            </h2>
          </div>
          <p className="text-muted/60 text-sm max-w-xs leading-relaxed">
            Projects shaped by genuine problems, built with care for the code
            behind them — not just the interface.
          </p>
        </div>

        <ol ref={listRef} className="flex flex-col">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Individual project row ─────────────────────────────────────────────── */
function ProjectRow({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLLIElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouch) return;
    if (!previewRef.current) return;

    if (hovered) {
      gsap.to(previewRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: "expo.out",
      });
    } else {
      gsap.to(previewRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.3,
        ease: "expo.in",
      });
    }
  }, [hovered, isTouch]);

  const statusLabel: Record<Project["status"], string> = {
    live: "Live",
    wip: "In Progress",
    research: "Research",
  };

  const statusColor: Record<Project["status"], string> = {
    live: "text-green-400",
    wip: "text-yellow-400/70",
    research: "text-blue-400/70",
  };

  return (
    <li
      ref={rowRef}
      className="project-row group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-8 sm:py-10 pr-0 sm:pr-[clamp(200px,25vw,380px)]">
        {/* Index */}
        <span className="font-mono text-xs text-muted/30 tracking-widest shrink-0 w-10">
          {project.index}
        </span>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display text-display-sm text-white/90 group-hover:text-white leading-none transition-colors duration-300 mb-2"
          >
            {project.title}
          </h3>
          <p className="text-muted/60 text-sm leading-relaxed max-w-xl group-hover:text-muted/80 transition-colors duration-300">
            {project.description}
          </p>
        </div>

        {/* Meta right */}
        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-4 sm:gap-2 shrink-0 sm:ml-8">
          <span
            className={clsx(
              "font-mono text-[0.6rem] tracking-widest uppercase",
              statusColor[project.status]
            )}
          >
            {statusLabel[project.status]}
          </span>
          <span className="font-mono text-[0.6rem] text-muted/30 tracking-widest">
            {project.year}
          </span>
        </div>
      </div>

      {/* Stack tags — shown below on mobile, below title on hover on desktop */}
      <div className="flex flex-wrap gap-2 pb-6 sm:pb-8 sm:absolute sm:bottom-full sm:left-10 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300 sm:pointer-events-none">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[0.6rem] tracking-wide px-2 py-0.5 border border-white/10 text-muted/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pb-8 sm:pb-10 sm:absolute sm:bottom-0 sm:right-0 sm:pb-10 sm:pr-[clamp(200px,25vw,400px)] sm:left-auto">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted/50 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            aria-label={`Live demo of ${project.title}`}
          >
            <span>Live Demo</span>
            <ExternalIcon />
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted/50 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            aria-label={`Source code for ${project.title}`}
          >
            <span>Source</span>
            <ExternalIcon />
          </a>
        )}
      </div>

      {/* Hover preview — CSS composition (no broken image) */}
      <div
        ref={previewRef}
        className="project-preview hidden sm:block"
        aria-hidden="true"
        style={{ opacity: 0, transform: "translateY(-50%) translateX(20px)" }}
      >
        <ProjectPreview project={project} />
      </div>
    </li>
  );
}

/* ─── CSS-built project preview composition ──────────────────────────────── */
function ProjectPreview({ project }: { project: Project }) {
  const colors: Record<string, { bg: string; accent: string }> = {
    hallufix: { bg: "#1a0008", accent: "#F40C3F" },
    diacare: { bg: "#0d0d1a", accent: "#6366f1" },
    experiments: { bg: "#0a1a0a", accent: "#22c55e" },
  };

  const theme = colors[project.id] ?? { bg: "#1a0008", accent: "#F40C3F" };

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-4 border border-white/10"
      style={{ background: theme.bg }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: theme.accent }} />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="flex-1 h-px bg-white/5 ml-2" />
      </div>

      {/* Content area */}
      <div className="flex flex-col gap-2 my-3">
        {/* Fake code lines */}
        {[80, 65, 90, 55, 70].map((w, i) => (
          <div
            key={i}
            className="h-1 rounded-sm bg-white/10"
            style={{ width: `${w}%`, opacity: 0.4 + i * 0.08 }}
          />
        ))}
        <div className="mt-2 h-1 rounded-sm" style={{ width: "40%", background: theme.accent, opacity: 0.6 }} />
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between">
        <span
          className="font-mono text-[0.55rem] tracking-widest uppercase"
          style={{ color: theme.accent }}
        >
          {project.category}
        </span>
        <span className="font-mono text-[0.5rem] text-white/20 tracking-widest">
          {project.year}
        </span>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 8L8 2M8 2H3M8 2v5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
