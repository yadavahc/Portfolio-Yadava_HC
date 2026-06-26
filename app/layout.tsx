import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yadava H C — Full Stack Developer & AI Builder",
  description:
    "Premium portfolio of Yadava H C — Full Stack Developer and AI application builder. Award-winning hackathon projects, AI-powered products, and a strong DSA foundation.",
  keywords: [
    "Yadava H C",
    "Full Stack Developer",
    "AI Developer",
    "Next.js",
    "Portfolio",
    "Bengaluru",
  ],
  authors: [{ name: "Yadava H C" }],
  openGraph: {
    title: "Yadava H C — Full Stack Developer & AI Builder",
    description:
      "Premium portfolio of Yadava H C — Full Stack Developer and AI application builder.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
