import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BusinessCard } from "@/components/carte/BusinessCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "carte" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://rlconseil.net/${locale}/carte/`,
      languages: {
        fr: "https://rlconseil.net/fr/carte/",
        en: "https://rlconseil.net/en/carte/",
      },
    },
  };
}

export default async function CartePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BusinessCard />;
}
