import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts are loaded on the server and exposed as CSS variables. We use them in
// globals.css (--font-geist-sans, --font-geist-mono). No client-side flash.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header: semantic <header> for accessibility and SEO. Padding and
            text size work on mobile first; we can add breakpoints later. */}
        <header className="border-b border-neutral-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="text-lg font-semibold text-foreground sm:text-xl">
              Internet Kenya
            </Link>
          </div>
        </header>

        {/* Main content: flex-1 so the layout fills the viewport and footer
            stays at the bottom when content is short. */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>

        {/* Footer: minimal for now. Same responsive padding as header. */}
        <footer className="border-t border-neutral-200 px-4 py-4 sm:px-6 sm:py-5">
          <div className="mx-auto max-w-6xl text-sm text-neutral-600">
            © {new Date().getFullYear()} Internet Kenya. Find and sign up for the best internet in your area.
          </div>
        </footer>
      </body>
    </html>
  );
}
