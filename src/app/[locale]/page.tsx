import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ComplianceBanner } from "@/components/home/ComplianceBanner";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LeadMagnetsSection } from "@/components/home/LeadMagnetsSection";
import { CtaSection } from "@/components/home/CtaSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ComplianceBanner />
      <WhyUsSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <PortfolioSection />
      <TestimonialsSection />
      <LeadMagnetsSection />
      <CtaSection />
    </>
  );
}
