export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Expertise", href: "/#services" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Parcours", href: "/parcours" },
  { label: "Contact", href: "/contact", isCta: true },
] as const;

export const footerLinks = {
  expertise: {
    title: "Expertise",
    links: [
      { label: "Architecture Technique", href: "/#services" },
      { label: "Développement Full Stack", href: "/#services" },
      { label: "Produits SaaS", href: "/#services" },
      { label: "CTO Externalisé", href: "/#services" },
    ],
  },
  navigation: {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Réalisations", href: "/#realisations" },
      { label: "Parcours", href: "/parcours" },
      { label: "CV", href: "/cv" },
      { label: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/cgv" },
      { label: "CGU", href: "/cgu" },
      { label: "Confidentialité", href: "/politique-confidentialite" },
    ],
  },
} as const;
