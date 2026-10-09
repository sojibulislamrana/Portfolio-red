import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: "#F40C3F",
          dim: "#8B0722",
          dark: "#4A0012",
        },
        black: {
          DEFAULT: "#160000",
          soft: "#1E0205",
        },
        white: {
          DEFAULT: "#F7F2ED",
        },
        muted: {
          DEFAULT: "#B9AAA7",
          dark: "#6B5C59",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 14vw, 16rem)", { lineHeight: "0.9" }],
        "display-xl": ["clamp(3rem, 10vw, 12rem)", { lineHeight: "0.92" }],
        "display-lg": ["clamp(2.5rem, 7vw, 8rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(2rem, 5vw, 6rem)", { lineHeight: "1" }],
        "display-sm": ["clamp(1.5rem, 3.5vw, 4rem)", { lineHeight: "1.05" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
        widest: "0.25em",
        widester: "0.4em",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
        "circ-out": "cubic-bezier(0, 0.55, 0.45, 1)",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
