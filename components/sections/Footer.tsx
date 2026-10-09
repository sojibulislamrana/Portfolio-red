"use client";

import { siteConfig, socialLinks } from "@/data/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="container-wide py-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-muted uppercase">
              {siteConfig.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[0.6rem] text-muted/50 tracking-wide">
                {siteConfig.location}
              </span>
              <span className="h-px w-4 bg-muted/30" />
              <span className="font-mono text-[0.6rem] text-muted/50 tracking-wide">
                {siteConfig.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted/60 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-xs text-muted/60 hover:text-red transition-colors duration-300 tracking-wide"
            >
              Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="rule mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[0.6rem] text-muted/40 tracking-widest">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6rem] text-muted/30 tracking-widest">
            Designed &amp; built by{" "}
            <span className="text-muted/50">{siteConfig.initials}</span>
          </p>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red/60 to-transparent" />
    </footer>
  );
}
