export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: NavLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/radiumSodium",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sojibul-islam-rana",
    external: true,
  },
];

export const siteConfig = {
  name: "Sojibul Islam Rana",
  initials: "SIR",
  role: "Frontend & MERN Stack Developer",
  tagline: "Terminal-First Developer",
  location: "Bangladesh",
  email: "sojibulislamrana.dev@gmail.com",
  github: "https://github.com/radiumSodium",
  linkedin: "https://www.linkedin.com/in/sojibul-islam-rana",
  availability: "Available for opportunities",
  heroHeadline: ["TERMINAL", "FIRST", "DEVELOPER"],
  heroSub:
    "I build thoughtful digital experiences with clean code, deliberate interactions, and an obsession with the details.",
};
