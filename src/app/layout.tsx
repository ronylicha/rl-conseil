import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";
import { siteConfig } from "@/data/site-config";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const sub = Outfit({
  subsets: ["latin"],
  variable: "--font-sub",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rlconseil.net"),
  title: {
    default: "RL Conseil | CTO Externalisé & Ingénierie Digitale — Paris",
    template: "%s | RL Conseil",
  },
  description: "RL Conseil accompagne les dirigeants dans leurs décisions techniques. CTO externalisé, architecture SaaS, conformité HDS, eIDAS, Factur-X. 15+ ans d'expertise, Paris.",
  keywords: [
    "CTO externalisé",
    "direction technique",
    "conseil digital",
    "Laravel",
    "React",
    "Next.js",
    "HDS",
    "eIDAS",
    "Factur-X",
    "facturation électronique",
    "SaaS",
    "Paris",
    "architecture logicielle",
    "conformité réglementaire",
    "développement web",
  ],
  authors: [{ name: siteConfig.founder.name, url: "https://rlconseil.net" }],
  creator: "RL Conseil",
  publisher: "RL Conseil",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://rlconseil.net",
    siteName: "RL Conseil",
    title: "RL Conseil | CTO Externalisé & Ingénierie Digitale — Paris",
    description: "Direction technique externalisée pour startups et PME. Architecture SaaS, conformité HDS/eIDAS/Factur-X, développement full stack. 15+ ans d'expertise.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RL Conseil — Direction Technique & Ingénierie Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RL Conseil | CTO Externalisé & Ingénierie Digitale",
    description: "Direction technique externalisée. Architecture SaaS, conformité réglementaire, développement full stack.",
    creator: "@ronylicha",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://rlconseil.net",
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
  verification: {},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('rl-theme') || 'dark';
                document.documentElement.classList.toggle('dark', t === 'dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable} ${sub.variable} ${mono.variable} antialiased`}>
        <ThemeProvider>
          <CursorGlow />
          <OrganizationJsonLd />
          <div className="no-print"><ScrollProgress /></div>
          <div className="no-print"><Header /></div>
          <main>{children}</main>
          <div className="no-print"><Footer /></div>
          <div className="no-print"><BackToTop /></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
