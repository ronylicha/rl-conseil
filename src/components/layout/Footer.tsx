import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { footerLinks } from "@/data/navigation";
import { Linkedin, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-bg-subtle)]">
      {/* Animated gradient separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-text)]">
                RL
              </span>
              <span className="w-px h-5 bg-[var(--color-accent)]" />
              <span className="font-[family-name:var(--font-sub)] text-xs tracking-widest text-[var(--color-text-muted)]">
                Conseil
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-4 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] inline-block mb-6">
              <Link href="/carte" className="flex items-center gap-3 group cursor-pointer">
                <img src="/profile-photo.jpg" alt="Rony Licha" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">Rony Licha</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Voir la carte de visite</p>
                </div>
              </Link>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Github, href: siteConfig.social.github },
                { icon: Twitter, href: siteConfig.social.twitter },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h4 className="font-[family-name:var(--font-sub)] text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name} — SASU · SIREN 101 783 421 · Paris
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
