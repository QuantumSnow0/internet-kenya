import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Footer } from "./components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root metadata. Used for <title>, <meta name="description">, and (when we add
// them) Open Graph etc. Child pages can override or extend via their own metadata.
export const metadata: Metadata = {
  title: {
    default: "Internet Kenya – Find & Sign Up for the Best Internet",
    template: "%s | Internet Kenya",
  },
  description:
    "Find the best internet in your area. Compare ISP plans by speed, price, and coverage—then sign up or request a connection. Location-first.",
};

// Status bar / address bar color on mobile (matches app background)
export const viewport = {
  themeColor: "#191c29",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msapplication-navbutton-color" content="#191c29" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${dmSans.variable} ${geistMono.variable} antialiased h-screen max-h-dvh flex flex-col overflow-hidden text-neutral-100 font-sans`}
      >
        <main className="flex-1 min-h-0 overflow-auto px-4 pt-0 sm:px-6 sm:pt-0">
          <div className="mx-auto max-w-6xl min-h-full">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
