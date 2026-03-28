"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClasses = "w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] focus:shadow-md focus:shadow-[var(--color-accent)]/5 hover:border-[var(--color-accent)]/20 transition-all duration-300";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const t = useTranslations("contact");

  const projectTypes = [
    { value: "", label: t("form.projectTypes.placeholder") },
    { value: "cto-externalise", label: t("form.projectTypes.ctoExternalise") },
    { value: "saas", label: t("form.projectTypes.saas") },
    { value: "conformite", label: t("form.projectTypes.conformite") },
    { value: "architecture", label: t("form.projectTypes.architecture") },
    { value: "performance", label: t("form.projectTypes.performance") },
    { value: "maintenance", label: t("form.projectTypes.maintenance") },
    { value: "autre", label: t("form.projectTypes.autre") },
  ];

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
              {t("form.sectionTitle")} <span className="text-gradient">{t("form.sectionTitleHighlight")}</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {t("form.sectionDescription")}
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
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-text)] mb-2">{t("form.success.title")}</h3>
                <p className="text-[var(--color-text-muted)]">{t("form.success.description")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-5 hover:border-[var(--color-accent)]/20 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-5">
                  <input name="name" type="text" placeholder={t("form.fields.fullName")} required className={inputClasses} />
                  <input name="email" type="email" placeholder={t("form.fields.email")} required className={inputClasses} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <input name="phone" type="tel" placeholder={t("form.fields.phone")} className={inputClasses} />
                  <input name="company" type="text" placeholder={t("form.fields.company")} className={inputClasses} />
                </div>
                <select name="subject" required className={cn(inputClasses, "cursor-pointer")}>
                  {projectTypes.map((pt) => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
                <textarea name="message" placeholder={t("form.fields.message")} required rows={5} maxLength={2000} className={cn(inputClasses, "resize-none")} />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="consent" required className="mt-1 accent-[var(--color-accent)]" />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {t("form.consent")}
                  </span>
                </label>
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle size={16} /> {t("form.error")}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-dark)] hover:shadow-lg hover:shadow-[var(--color-accent)]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === "loading" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      {t("form.submit")}
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
            {t("faq.title")} <span className="text-gradient">{t("faq.titleHighlight")}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(["responseTime", "firstMeeting", "location", "technologies"] as const).map((key, i) => {
              const faq = { q: t(`faq.items.${key}.question`), a: t(`faq.items.${key}.answer`) };
              return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/20 hover:shadow-md hover:shadow-[var(--color-accent)]/5 hover:-translate-y-0.5 transition-all duration-300 shimmer-hover"
              >
                <h3 className="font-semibold text-[var(--color-text)] text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.a}</p>
              </motion.div>
            );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
