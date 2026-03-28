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
    title: t("cgv.metadata.title"),
    description: isEn
      ? "Terms and Conditions of Sale for RL Conseil services — technical consulting, fractional CTO, and software development."
      : "Conditions Générales de Vente des prestations RL Conseil — conseil technique, CTO externalisé et développement logiciel.",
    alternates: {
      canonical: `https://rlconseil.net/${locale}/cgv/`,
      languages: {
        fr: "https://rlconseil.net/fr/cgv/",
        en: "https://rlconseil.net/en/cgv/",
      },
    },
  };
}

export default async function CGV({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const cgv = t.raw("cgv") as {
    pageTitle: string;
    lastUpdated: string;
    sections: Record<string, { title: string; content: string }>;
  };

  return (
    <LegalLayout title={cgv.pageTitle} lastUpdated={cgv.lastUpdated}>
      {Object.values(cgv.sections).map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </LegalLayout>
  );
}
