import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, STIX_Two_Text } from "next/font/google";
import "./globals.css";

const stix = STIX_Two_Text({
  variable: "--font-stix",
  subsets: ["latin", "latin-ext", "greek"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Computability Interros",
    template: "%s · Computability Interros",
  },
  description: "Ten practice interros for the 1CS computability course, with full corrections.",
};

// Colors the phone's browser bar like the page background.
export const viewport: Viewport = {
  themeColor: "#f2f0eb",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${stix.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
