export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    title: "CTO Externalisé",
    company: "Qr Communication",
    location: "Paris, France",
    period: "Sept 2025 — Aujourd'hui",
    duration: "Actuel",
    isCurrent: true,
    description: "Direction technique de 10 applications SaaS en production. Définition de la stratégie technique, choix d'architecture et pilotage de la qualité logicielle.",
    achievements: [
      "Architecture et supervision de 10 plateformes SaaS simultanées",
      "99.9% de disponibilité maintenue sur les environnements critiques",
      "Mise en place de pipelines CI/CD et culture DevOps",
    ],
    skills: ["Laravel 12", "React", "Docker", "AWS"],
  },
  {
    title: "Président",
    company: "Phoenix Consulting Company",
    location: "Levallois-Perret, France",
    period: "Avril 2023 — Aujourd'hui",
    duration: "Actuel",
    isCurrent: true,
    description: "Conseil en transformation digitale pour PME et ETI. Spécialisation dans la mise en conformité réglementaire technique.",
    achievements: [
      "Accompagnement à la certification HDS pour applications e-santé",
      "Intégration de la signature électronique certifiée eIDAS",
      "Préparation à la facturation électronique obligatoire 2026",
    ],
    skills: ["HDS", "eIDAS", "RGPD", "Factur-X"],
  },
  {
    title: "DSI & Gérant",
    company: "Or-Formation Services",
    location: "Paris, France",
    period: "Sept 2021 — Avril 2023",
    duration: "1 an 8 mois",
    isCurrent: false,
    description: "Refonte intégrale de l'infrastructure IT. Conception et déploiement d'outils internes sur mesure, digitalisation des processus métiers.",
    achievements: [
      "Migration cloud avec réduction des coûts IT de 40%",
      "Développement d'un ERP interne adapté aux besoins spécifiques",
    ],
    skills: ["PHP/Symfony", "Vue.js", "MySQL", "Management"],
  },
  {
    title: "Directeur des Opérations",
    company: "Or-Formation Services",
    location: "Paris, France",
    period: "Nov 2015 — Oct 2021",
    duration: "6 ans",
    isCurrent: false,
    description: "Direction opérationnelle complète. Pilotage de la stratégie de croissance et développement de partenariats stratégiques.",
    achievements: [
      "Croissance du chiffre d'affaires de 300% sur la période",
      "Construction d'un réseau de 15+ partenariats stratégiques",
    ],
    skills: ["Leadership", "Partenariats", "Stratégie"],
  },
  {
    title: "Associé Gérant & Co-fondateur",
    company: "Professional Marketing & Communication",
    location: "Jérusalem, Israël",
    period: "Août 2009 — Nov 2015",
    duration: "6 ans 3 mois",
    isCurrent: false,
    description: "Création et développement d'une agence digitale à vocation internationale. Conception de sites web et stratégie digitale pour des clients en France, en Israël et aux États-Unis.",
    achievements: [
      "Conception et livraison de 50+ sites web en full stack",
      "Portefeuille clients dans 3 pays",
      "Certification Symfony 2 (SensioLabs)",
    ],
    skills: ["Symfony", "PHP", "JavaScript", "MySQL"],
  },
];

export const education = [
  {
    title: "Licence en Économie",
    institution: "Université Paris 8",
    period: "2008 — 2009",
    description: "Spécialisation en économie appliquée, analyse des marchés et stratégie d'entreprise.",
  },
  {
    title: "BTS Comptabilité et Gestion",
    institution: "C.U.G.I",
    period: "2005 — 2007",
    description: "Formation en comptabilité et gestion d'entreprise. Maîtrise des fondamentaux financiers.",
  },
];

export const certifications = [
  { title: "Symfony 2 — Niveau Expert", issuer: "SensioLabs", date: "Juillet 2015" },
  { title: "Symfony 1 — Niveau Professionnel", issuer: "SensioLabs", date: "Juillet 2015" },
];
