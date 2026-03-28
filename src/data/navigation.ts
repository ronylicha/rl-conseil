export const navLinks = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.expertise", href: "/#services" },
  { labelKey: "nav.portfolio", href: "/#realisations" },
  { labelKey: "nav.parcours", href: "/parcours" },
  { labelKey: "nav.contact", href: "/contact", isCta: true },
] as const;

export const footerLinks = {
  expertise: {
    titleKey: "footer.columns.expertise",
    links: [
      { labelKey: "footer.links.architectureTechnique", href: "/services#architecture-conception-technique" },
      { labelKey: "footer.links.developpementFullStack", href: "/services#developpement-full-stack" },
      { labelKey: "footer.links.produitsSaaS", href: "/services#produits-saas-sur-mesure" },
      { labelKey: "footer.links.ctoExternalise", href: "/services#cto-externalise" },
    ],
  },
  navigation: {
    titleKey: "footer.columns.navigation",
    links: [
      { labelKey: "footer.links.accueil", href: "/" },
      { labelKey: "footer.links.realisations", href: "/#realisations" },
      { labelKey: "footer.links.parcours", href: "/parcours" },
      { labelKey: "footer.links.cv", href: "/cv" },
      { labelKey: "footer.links.contact", href: "/contact" },
    ],
  },
  legal: {
    titleKey: "footer.columns.legal",
    links: [
      { labelKey: "footer.links.mentionsLegales", href: "/mentions-legales" },
      { labelKey: "footer.links.cgv", href: "/cgv" },
      { labelKey: "footer.links.cgu", href: "/cgu" },
      { labelKey: "footer.links.confidentialite", href: "/politique-confidentialite" },
    ],
  },
} as const;
