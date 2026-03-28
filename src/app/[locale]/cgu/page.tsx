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
    title: t("cgu.metadata.title"),
    description: isEn
      ? "Terms of Use for RL Conseil website — rules and conditions governing access and use of rlconseil.net."
      : "Conditions Générales d'Utilisation du site RL Conseil — règles et conditions régissant l'accès et l'utilisation de rlconseil.net.",
    alternates: {
      canonical: `https://rlconseil.net/${locale}/cgu/`,
      languages: {
        fr: "https://rlconseil.net/fr/cgu/",
        en: "https://rlconseil.net/en/cgu/",
      },
    },
  };
}

export default async function CGU({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const cgu = t.raw("cgu") as {
    pageTitle: string;
    lastUpdated: string;
    sections: Record<string, { title: string; content: string }>;
  };

  return (
    <LegalLayout title={cgu.pageTitle} lastUpdated={cgu.lastUpdated}>
      {Object.values(cgu.sections).map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </LegalLayout>
  );
}
