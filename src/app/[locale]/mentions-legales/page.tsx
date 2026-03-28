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
    title: t("mentionsLegales.metadata.title"),
    description: isEn
      ? "Legal notice for RL Conseil — Publisher, hosting provider, and intellectual property information."
      : "Mentions légales de RL Conseil — Éditeur, hébergeur et informations sur la propriété intellectuelle.",
    alternates: {
      canonical: `https://rlconseil.net/${locale}/mentions-legales/`,
      languages: {
        fr: "https://rlconseil.net/fr/mentions-legales/",
        en: "https://rlconseil.net/en/mentions-legales/",
      },
    },
  };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const ml = t.raw("mentionsLegales") as {
    pageTitle: string;
    lastUpdated: string;
    sections: Record<string, { title: string; content: string }>;
  };

  return (
    <LegalLayout title={ml.pageTitle} lastUpdated={ml.lastUpdated}>
      {Object.values(ml.sections).map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {section.content.split("\n\n").map((block, i) => (
            <p key={i}>
              {block.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      ))}
    </LegalLayout>
  );
}
