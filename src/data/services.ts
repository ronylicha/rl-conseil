export interface Service {
  icon: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
}

export const services: Service[] = [
  {
    icon: "Compass",
    title: "Architecture & Conception Technique",
    description: "Cadrage technique, choix de stack, modélisation de données et blueprints d'architecture avant la première ligne de code.",
    techStack: ["System Design", "UML", "API Design"],
    features: ["Audit de l'existant", "Architecture microservices", "Schémas de données", "Documentation technique"],
  },
  {
    icon: "Code",
    title: "Développement Full Stack",
    description: "Conception et réalisation d'applications web robustes, du back-end API au front-end interactif.",
    techStack: ["Laravel 12", "React", "PostgreSQL"],
    features: ["API RESTful et GraphQL", "Interfaces React/Next.js", "Tests automatisés et CI/CD", "Code review"],
  },
  {
    icon: "Rocket",
    title: "Produits SaaS sur mesure",
    description: "De l'idée au produit en production : multi-tenant, abonnements, onboarding, analytics embarqué.",
    techStack: ["Laravel", "Stripe", "Multi-tenant"],
    features: ["Architecture multi-tenant", "Gestion des abonnements", "Dashboard d'administration", "Analytics produit"],
  },
  {
    icon: "Scale",
    title: "Conformité & Réglementaire",
    description: "Mise en conformité technique avec les obligations françaises et européennes — sans compromis sur l'expérience utilisateur.",
    techStack: ["HDS", "eIDAS", "Factur-X"],
    features: ["Hébergement certifié HDS", "Signature électronique eIDAS", "Facturation Factur-X", "Protection RGPD"],
  },
  {
    icon: "Crown",
    title: "CTO Externalisé",
    description: "Direction technique à temps partagé : stratégie, recrutement, dette technique, montée en compétences de vos équipes.",
    techStack: ["Strategy", "Management", "DevOps"],
    features: ["Roadmap technique", "Recrutement et évaluation", "Réduction dette technique", "Processus de dev"],
  },
  {
    icon: "Gauge",
    title: "Performance & Optimisation",
    description: "Audit, profiling et optimisation de vos applications existantes pour des temps de réponse inférieurs à 200ms.",
    techStack: ["Core Web Vitals", "Redis", "CDN"],
    features: ["Audit de performance", "Optimisation cache", "Monitoring 24/7", "Amélioration continue"],
  },
];
