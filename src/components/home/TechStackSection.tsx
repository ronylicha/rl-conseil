"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

type CategoryKey =
  | "frontend"
  | "backend"
  | "databases"
  | "cloudInfra"
  | "devops"
  | "mobileRealtime"
  | "aiTools"
  | "complianceSecurity";

const techCategoryData: {
  key: CategoryKey;
  techs: string[];
  gradient: string;
  border: string;
}[] = [
  {
    key: "frontend",
    techs: ["React 19", "Next.js 14", "Vue.js 3", "Nuxt.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "D3.js", "Sass/SCSS"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
  },
  {
    key: "backend",
    techs: ["Laravel 12", "PHP 8.3", "Node.js", "Express", "Python", "Django", "FilamentPHP v3", "GraphQL", "REST API", "WebSocket"],
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20",
  },
  {
    key: "databases",
    techs: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Vector DB", "Supabase", "Firebase Firestore"],
    gradient: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/20",
  },
  {
    key: "cloudInfra",
    techs: ["AWS", "Google Cloud", "OVHcloud", "Scaleway", "Vercel", "Cloudflare", "DigitalOcean"],
    gradient: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/20",
  },
  {
    key: "devops",
    techs: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI", "Nginx", "Apache", "Load Balancing", "SSL/TLS", "Terraform"],
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/20",
  },
  {
    key: "mobileRealtime",
    techs: ["React Native", "Expo", "WebRTC", "PWA", "Push Notifications", "Socket.IO"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
  },
  {
    key: "aiTools",
    techs: ["Claude API", "OpenAI API", "LangChain", "MCP Protocol", "RAG", "Vector Search", "Embeddings"],
    gradient: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/20",
  },
  {
    key: "complianceSecurity",
    techs: ["HDS", "eIDAS", "RGPD", "Factur-X", "NF525", "OWASP", "OAuth2", "JWT", "CORS", "CSP"],
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/20",
  },
];

export function TechStackSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge={t("techStack.badge")}
          title={t("techStack.title")}
          highlight={t("techStack.highlight")}
          subtitle={t("techStack.subtitle")}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCategoryData.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} backdrop-blur-sm cursor-pointer transition-all`}
            >
              <h3 className="font-[family-name:var(--font-sub)] text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
                {t(`techStack.categories.${cat.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech, j) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
