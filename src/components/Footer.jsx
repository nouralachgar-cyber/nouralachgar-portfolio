import React from 'react';
import { ArrowUp } from 'lucide-react';

const year = new Date().getFullYear();

export default function Footer({ t }) {
  const navItems = [
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'contact', href: '#contact', label: t.nav.contact }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-navy-subtle bg-navy-primary">
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/20 to-transparent"
        aria-hidden="true"
      />

      <div className="shell py-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          {/* Logo + tagline */}
          <div className="max-w-xs reveal-init" style={{ '--reveal-delay': '40ms' }}>
            <a href="#hero" className="group inline-flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-terracotta text-cream dark:bg-terracotta dark:text-mocha-ink">
                <span className="font-editorial font-latin-serif text-lg leading-none">N</span>
              </span>
              <span
                dir="ltr"
                className="font-editorial font-latin-serif text-xl text-navy-deep dark:text-ivory transition-colors duration-300 group-hover:text-terracotta-deep"
              >
                Noura
                <span className="text-terracotta-deep dark:text-terracotta-soft">.</span>
              </span>
            </a>
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted/60 dark:text-muted/45">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav
            aria-label={t.a11y.footerNav}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.68rem] font-semibold reveal-init"
            style={{ '--reveal-delay': '120ms' }}
          >
            {navItems.map((item) => (
              <a key={item.id} href={item.href} className="footer-link transition-colors duration-300 hover:text-terracotta-deep dark:hover:text-terracotta-soft">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <a
            href="#hero"
            aria-label={t.a11y.backToTop}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-terracotta/15 px-4 py-2.5 text-[0.6rem] font-bold uppercase tracking-wider text-muted/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/45 hover:text-terracotta-deep dark:border-navy-subtle dark:text-ivory/60 dark:hover:border-terracotta/45 dark:hover:text-terracotta-soft reveal-init"
            style={{ '--reveal-delay': '200ms' }}
          >
            {t.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>

        {/* Footer bottom */}
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row gap-3 justify-between text-[0.65rem] text-muted/50 dark:text-muted/40 reveal-init"
          style={{ '--reveal-delay': '260ms' }}
        >
          <p>
            <span dir="ltr">© {year} Noura Lachgar.</span>{' '}
            <span>{t.footer.rights}</span>
          </p>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-terracotta" aria-hidden="true" />
            <span>{t.hero.signal}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}