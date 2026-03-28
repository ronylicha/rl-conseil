"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslations } from "next-intl";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const t = useTranslations("common");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-text)]">
              RL
            </span>
            <span className="w-px h-6 bg-[var(--color-accent)]" />
            <span className="font-[family-name:var(--font-sub)] text-sm tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
              Conseil
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isCta = "isCta" in link && link.isCta;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                    isCta
                      ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] ml-2"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface)] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[var(--color-accent)] after:transition-all after:duration-300",
                    pathname === link.href && !isCta && "text-[var(--color-accent)]"
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="ml-1 p-2.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
              aria-label={theme === "dark" ? t("aria.activerModeClair") : t("aria.activerModeSombre")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
              aria-label={t("aria.toggleTheme")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-all cursor-pointer"
              aria-label={t("aria.toggleMenu")}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => {
              const isCta = "isCta" in link && link.isCta;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-[family-name:var(--font-heading)] font-bold transition-colors",
                    isCta
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
