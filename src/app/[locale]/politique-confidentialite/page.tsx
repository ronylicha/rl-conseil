import { LegalLayout } from "@/components/legal/LegalLayout";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const isEn = locale === "en";

  return {
    title: t("confidentialite.metadata.title"),
    description: isEn
      ? "Privacy Policy of RL Conseil — how we collect, use, and protect your personal data in compliance with GDPR."
      : "Politique de Confidentialité de RL Conseil — collecte, utilisation et protection de vos données personnelles conformément au RGPD.",
    alternates: {
      canonical: `https://rlconseil.net/${locale}/politique-confidentialite/`,
      languages: {
        fr: "https://rlconseil.net/fr/politique-confidentialite/",
        en: "https://rlconseil.net/en/politique-confidentialite/",
      },
    },
  };
}

export default async function PolitiqueConfidentialite({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const conf = t.raw("confidentialite") as {
    pageTitle: string;
    lastUpdated: string;
    sections: Record<string, { title: string; content: string }>;
  };

  return (
    <LegalLayout title={conf.pageTitle} lastUpdated={conf.lastUpdated}>
      {Object.values(conf.sections).map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <p>
            {section.content.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      ))}
    </LegalLayout>
  );
}
