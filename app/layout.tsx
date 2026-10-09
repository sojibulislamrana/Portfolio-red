import type { Metadata } from "next";
import { Barlow_Condensed, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const siteUrl = "https://sojibulislamrana.dev";

export const metadata: Metadata = {
  title: "Sojibul Islam Rana — Frontend & MERN Stack Developer",
  description:
    "Terminal-first developer building thoughtful web experiences with React, Next.js, TypeScript, and Node.js. Based in Bangladesh.",
  keywords: [
    "Sojibul Islam Rana",
    "Frontend Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Bangladesh",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sojibul Islam Rana", url: siteUrl }],
  creator: "Sojibul Islam Rana",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Sojibul Islam Rana — Frontend & MERN Stack Developer",
    description:
      "Terminal-first developer building thoughtful web experiences with React, Next.js, TypeScript, and Node.js.",
    siteName: "Sojibul Islam Rana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sojibul Islam Rana — Frontend & MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sojibul Islam Rana — Frontend & MERN Stack Developer",
    description:
      "Terminal-first developer building thoughtful web experiences with React, Next.js, TypeScript, and Node.js.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
