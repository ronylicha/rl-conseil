import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ParcourseTimeline } from "@/components/parcours/ParcourseTimeline";
import { ParcourseHero } from "@/components/parcours/ParcourseHero";
import { EducationSection } from "@/components/parcours/EducationSection";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "parcours" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://rlconseil.net/${locale}/parcours/`,
      languages: {
        fr: "https://rlconseil.net/fr/parcours/",
        en: "https://rlconseil.net/en/parcours/",
      },
    },
  };
}

export default async function ParcoursPage({
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
          { name: "Parcours", url: "https://rlconseil.net/parcours" },
        ]}
      />
      <ParcourseHero />
      <ParcourseTimeline />
      <EducationSection />
      <CtaSection />
    </>
  );
}
