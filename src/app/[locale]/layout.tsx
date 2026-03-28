import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { OrganizationJsonLd, PersonJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEn = locale === 'en';

  return {
    metadataBase: new URL("https://rlconseil.net"),
    title: {
      default: isEn
        ? "RL Conseil | Fractional CTO & Digital Engineering — Paris"
        : "RL Conseil | CTO Externalisé & Ingénierie Digitale — Paris",
      template: "%s | RL Conseil",
    },
    description: isEn
      ? "RL Conseil supports leaders in their technical decisions. Fractional CTO, SaaS architecture, HDS, eIDAS, Factur-X compliance. 15+ years of expertise, Paris."
      : "RL Conseil accompagne les dirigeants dans leurs décisions techniques. CTO externalisé, architecture SaaS, conformité HDS, eIDAS, Factur-X. 15+ ans d'expertise, Paris.",
    authors: [{ name: siteConfig.founder.name, url: "https://rlconseil.net" }],
    creator: "RL Conseil",
    publisher: "RL Conseil",
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      url: `https://rlconseil.net/${locale}`,
      siteName: "RL Conseil",
      title: isEn
        ? "RL Conseil | Fractional CTO & Digital Engineering — Paris"
        : "RL Conseil | CTO Externalisé & Ingénierie Digitale — Paris",
      description: isEn
        ? "Fractional CTO for startups and SMBs. SaaS architecture, HDS/eIDAS/Factur-X compliance, full stack development. 15+ years of expertise."
        : "Direction technique externalisée pour startups et PME. Architecture SaaS, conformité HDS/eIDAS/Factur-X, développement full stack. 15+ ans d'expertise.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isEn
            ? "RL Conseil — Technical Leadership & Digital Engineering"
            : "RL Conseil — Direction Technique & Ingénierie Digitale",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "RL Conseil | Fractional CTO & Digital Engineering"
        : "RL Conseil | CTO Externalisé & Ingénierie Digitale",
      description: isEn
        ? "Fractional CTO. SaaS architecture, regulatory compliance, full stack development."
        : "Direction technique externalisée. Architecture SaaS, conformité réglementaire, développement full stack.",
      creator: "@ronylicha",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://rlconseil.net/${locale}/`,
      languages: {
        'fr': 'https://rlconseil.net/fr/',
        'en': 'https://rlconseil.net/en/',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <CursorGlow />
        <OrganizationJsonLd />
        <PersonJsonLd />
        <div className="no-print"><ScrollProgress /></div>
        <div className="no-print"><Header /></div>
        <main>{children}</main>
        <div className="no-print"><Footer /></div>
        <div className="no-print"><BackToTop /></div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
