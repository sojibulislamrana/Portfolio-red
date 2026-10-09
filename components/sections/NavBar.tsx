"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, socialLinks, siteConfig } from "@/data/navigation";
import clsx from "clsx";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="container-wide flex h-16 items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="font-mono text-sm font-bold tracking-widest text-white group-hover:text-red transition-colors duration-300">
              {siteConfig.initials}
            </span>
            <span className="hidden sm:block h-4 w-px bg-muted/30" />
            <span className="hidden sm:block font-mono text-[0.6rem] tracking-widest text-muted uppercase">
              {siteConfig.tagline}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: GitHub + availability */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center gap-1.5"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-wide text-muted">
              <span className="avail-dot" aria-hidden="true" />
              <span>{siteConfig.availability}</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={clsx(
                "block h-px w-6 bg-white transition-all duration-300",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-px w-6 bg-white transition-all duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "block h-px w-6 bg-white transition-all duration-300",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black flex flex-col justify-center px-8 transition-all duration-500",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-8 mb-12">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-left text-[clamp(2.5rem,10vw,5rem)] text-white/80 hover:text-red transition-colors duration-300 leading-none"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-muted hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2 font-mono text-xs text-muted mt-2">
            <span className="avail-dot" aria-hidden="true" />
            <span>{siteConfig.availability}</span>
          </div>
        </div>

        <div className="mt-auto pb-8 font-mono text-xs text-muted/40">
          {siteConfig.location}
        </div>
      </div>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.417 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
