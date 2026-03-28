import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaSection } from "@/components/home/CtaSection";
import { services } from "@/data/services";
import {
  Compass,
  Code,
  Rocket,
  Scale,
  Crown,
  Gauge,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: `https://rlconseil.net/${locale}/services/`,
      languages: {
        fr: "https://rlconseil.net/fr/services/",
        en: "https://rlconseil.net/en/services/",
      },
    },
  };
}

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Compass,
  Code,
  Rocket,
  Scale,
  Crown,
  Gauge,
};

const serviceKeys = [
  "architectureConception",
  "developpementFullStack",
  "produitsSaas",
  "conformite",
  "ctoExternalise",
  "performance",
] as const;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  const translatedServices = services.map((service, i) => {
    const key = serviceKeys[i];
    const rawFeatures = t.raw(`list.${key}.features`) as string[];
    return {
      ...service,
      title: t(`list.${key}.title`),
      description: t(`list.${key}.description`),
      features: rawFeatures,
    };
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://rlconseil.net" },
          { name: "Services", url: "https://rlconseil.net/services" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[var(--color-bg)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent)]/3 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            badge={t("hero.badge")}
            title={t("hero.title")}
            highlight={t("hero.highlight")}
            subtitle={t("hero.subtitle")}
          />
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-24 bg-[var(--color-bg-subtle)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-20">
            {translatedServices.map((service, i) => {
              const Icon = iconMap[service.icon] || Code;
              const slug = slugify(service.title);
              const isReversed = i % 2 === 1;

              return (
                <div
                  key={service.title}
                  id={slug}
                  className="scroll-mt-24"
                >
                  <div
                    className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-start`}
                  >
                    {/* Contenu */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                          <Icon
                            size={24}
                            className="text-[var(--color-accent)]"
                          />
                        </div>
                        <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[var(--color-text)]">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2
                              size={18}
                              className="text-[var(--color-accent)] mt-0.5 shrink-0"
                            />
                            <span className="text-[var(--color-text-muted)]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Card */}
                    <div className="lg:w-80 w-full">
                      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                        <h3 className="font-[family-name:var(--font-sub)] text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
                          {t("techCard.technologiesLabel")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Séparateur */}
                  {i < translatedServices.length - 1 && (
                    <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
