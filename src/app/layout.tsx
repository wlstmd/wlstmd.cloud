import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wlstmd.cloud"),
  title: "Jinseung Yu — DevOps Engineer",
  description:
    "Jinseung Yu (wlstmd) — aspiring DevOps engineer. WorldSkills Korea 2025 Cloud Computing: Regional Silver, National 4th.",
  icons: { icon: "/images/logo.png" },
  openGraph: {
    title: "Jinseung Yu — DevOps Engineer",
    description: "Cloud labs, experiments, notes, and services.",
    url: "https://wlstmd.cloud",
    siteName: "wlstmd.cloud",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
