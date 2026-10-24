import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { IBM_Plex_Mono, IBM_Plex_Sans, STIX_Two_Text } from "next/font/google";
import ThemePicker from "@/components/ThemePicker";
import { THEME_BOOT_SCRIPT } from "@/lib/theme-boot";
import "./globals.css";

const stix = STIX_Two_Text({
  variable: "--font-stix",
  subsets: ["latin", "latin-ext", "greek"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Computability Mock Interros",
    template: "%s · Computability Mock Interros",
  },
  description: "Ten practice papers for the 1CS computability interro, with full corrections.",
};

// Colors the phone's browser bar like the page background.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e6df" },
    { media: "(prefers-color-scheme: dark)", color: "#14161b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the boot script may set data-theme on <html> before React hydrates.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${stix.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-boot" strategy="beforeInteractive">
          {THEME_BOOT_SCRIPT}
        </Script>
        <header className="site-header">
          <Link href="/" className="brand">
            Computability Mock Interros
          </Link>
          <div className="header-right">
            <nav aria-label="Main">
              <Link href="/" className="nav-papers">
                Papers
              </Link>
              <Link href="/formulas">Formula sheet</Link>
            </nav>
            <ThemePicker />
          </div>
        </header>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
