import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CvView } from "@/components/cv/CvView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://rlconseil.net/${locale}/cv/`,
      languages: {
        fr: "https://rlconseil.net/fr/cv/",
        en: "https://rlconseil.net/en/cv/",
      },
    },
  };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CvView />;
}
