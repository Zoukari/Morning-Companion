import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const fraunces = localFont({
  src: [
    { path: "../public/fonts/Fraunces.woff2", style: "normal" },
    { path: "../public/fonts/Fraunces-Italic.woff2", style: "italic" },
  ],
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});
const amiri = localFont({
  src: [
    { path: "../public/fonts/Amiri-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Amiri-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allah First",
  description: "Begin your day with Allah.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Allah First",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark">
      <body className={`${inter.variable} ${fraunces.variable} ${amiri.variable} font-sans`}>
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative", background: "var(--bg)" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
