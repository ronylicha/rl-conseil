"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const projectTypes = [
  { value: "", label: "Type de projet *" },
  { value: "cto-externalise", label: "CTO Externalisé" },
  { value: "saas", label: "Application SaaS sur mesure" },
  { value: "conformite", label: "Conformité (HDS, eIDAS, Factur-X)" },
  { value: "architecture", label: "Audit & Architecture technique" },
  { value: "performance", label: "Performance & Optimisation" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "autre", label: "Autre" },
];

const inputClasses = "w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-all";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://ronylicha.net/send_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)]">
              Construisons <span className="text-gradient">ensemble</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Que vous ayez besoin d&apos;un CTO externalisé, d&apos;une application SaaS sur mesure ou d&apos;une mise en conformité, RL Conseil met 15 ans d&apos;expérience à votre service.
            </p>
            <div className="space-y-4 pt-4">
              {[
                { icon: Mail, label: siteConfig.founder.email, href: `mailto:${siteConfig.founder.email}` },
                { icon: Phone, label: siteConfig.founder.phoneDisplay, href: `tel:${siteConfig.founder.phone.replace(/\s/g, '')}` },
                { icon: MapPin, label: siteConfig.founder.location, href: "#" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:shadow-md hover:shadow-[var(--color-accent)]/5 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center group-hover:bg-[var(--color-accent)]/20 transition-colors">
                    <item.icon size={18} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="text-sm text-[var(--color-text)]">{item.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/20 transition-all duration-500 text-center">
                <CheckCircle size={48} className="text-[var(--color-success)] mb-4" />
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] mb-2">Message reçu.</h3>
                <p className="text-[var(--color-text-muted)]">Nous revenons vers vous sous 24 heures.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5 hover:border-[var(--color-accent)]/20 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-5">
                  <input name="name" type="text" placeholder="Nom complet *" required className={inputClasses} />
                  <input name="email" type="email" placeholder="Email *" required className={inputClasses} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <input name="phone" type="tel" placeholder="Téléphone" className={inputClasses} />
                  <input name="company" type="text" placeholder="Entreprise" className={inputClasses} />
                </div>
                <select name="subject" required className={cn(inputClasses, "cursor-pointer")}>
                  {projectTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <textarea name="message" placeholder="Décrivez-nous votre projet *" required rows={5} maxLength={2000} className={cn(inputClasses, "resize-none")} />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="consent" required className="mt-1 accent-[var(--color-accent)]" />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    J&apos;accepte que mes données soient utilisées pour traiter ma demande conformément à la politique de confidentialité.
                  </span>
                </label>
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle size={16} /> Une erreur est survenue. Réessayez ou contactez-nous directement.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-dark)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] text-center mb-10">
            Questions <span className="text-gradient">fréquentes</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Quel est votre délai de réponse ?", a: "Nous nous engageons à répondre sous 24 heures ouvrées. Pour les urgences production, un numéro dédié est communiqué à nos clients sous contrat." },
              { q: "Le premier échange est-il payant ?", a: "Non. Les 30 premières minutes sont offertes et sans engagement. Elles nous permettent de comprendre vos enjeux et d'évaluer si notre expertise correspond." },
              { q: "Intervenez-vous uniquement à Paris ?", a: "Nous travaillons en 100% remote pour des clients en France et à l'international. Des rencontres physiques sont possibles sur Paris et région parisienne." },
              { q: "Quelles technologies maîtrisez-vous ?", a: "Laravel 12, React/Next.js, TypeScript, PostgreSQL, Redis, Docker, AWS. Nous choisissons toujours la technologie la plus adaptée au problème." },
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/20 transition-all"
              >
                <h3 className="font-semibold text-[var(--color-text)] text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
