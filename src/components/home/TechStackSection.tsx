"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const techCategories = [
  {
    label: "Frontend",
    techs: ["React 19", "Next.js 14", "Vue.js 3", "Nuxt.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "D3.js", "Sass/SCSS"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
  },
  {
    label: "Backend",
    techs: ["Laravel 12", "PHP 8.3", "Node.js", "Express", "Python", "Django", "FilamentPHP v3", "GraphQL", "REST API", "WebSocket"],
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20",
  },
  {
    label: "Bases de données",
    techs: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Vector DB", "Supabase", "Firebase Firestore"],
    gradient: "from-amber-500/20 to-yellow-500/20",
    border: "border-amber-500/20",
  },
  {
    label: "Cloud & Infra",
    techs: ["AWS", "Google Cloud", "OVHcloud", "Scaleway", "Vercel", "Cloudflare", "DigitalOcean"],
    gradient: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/20",
  },
  {
    label: "DevOps & CI/CD",
    techs: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI", "Nginx", "Apache", "Load Balancing", "SSL/TLS", "Terraform"],
    gradient: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/20",
  },
  {
    label: "Mobile & Temps Réel",
    techs: ["React Native", "Expo", "WebRTC", "PWA", "Push Notifications", "Socket.IO"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
  },
  {
    label: "IA & Outils",
    techs: ["Claude API", "OpenAI API", "LangChain", "MCP Protocol", "RAG", "Vector Search", "Embeddings"],
    gradient: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/20",
  },
  {
    label: "Conformité & Sécurité",
    techs: ["HDS", "eIDAS", "RGPD", "Factur-X", "NF525", "OWASP", "OAuth2", "JWT", "CORS", "CSP"],
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/20",
  },
];

export function TechStackSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Stack Technique"
          title="Technologies"
          highlight="maîtrisées"
          subtitle="Les outils que nous utilisons au quotidien pour livrer des solutions robustes."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} backdrop-blur-sm cursor-pointer transition-all`}
            >
              <h3 className="font-[family-name:var(--font-sub)] text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
                {cat.label}
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
