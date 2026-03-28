import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://rlconseil.net/${locale}/contact/`,
      languages: {
        fr: "https://rlconseil.net/fr/contact/",
        en: "https://rlconseil.net/en/contact/",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://rlconseil.net" },
          { name: "Contact", url: "https://rlconseil.net/contact" },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            q: "Quel est votre délai de réponse ?",
            a: "Nous nous engageons à répondre sous 24 heures ouvrées.",
          },
          {
            q: "Le premier échange est-il payant ?",
            a: "Non. Les 30 premières minutes sont offertes et sans engagement.",
          },
          {
            q: "Intervenez-vous uniquement à Paris ?",
            a: "Nous travaillons en 100% remote pour des clients en France et à l'international.",
          },
          {
            q: "Quelles technologies maîtrisez-vous ?",
            a: "Laravel 12, React/Next.js, TypeScript, PostgreSQL, Redis, Docker, AWS.",
          },
        ]}
      />
      <ContactHero />
      <ContactForm />
    </>
  );
}
