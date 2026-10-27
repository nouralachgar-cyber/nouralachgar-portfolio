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
    <footer className="relative overflow-hidden border-t border-mocha-brown/10 bg-cream dark:border-peach/10 dark:bg-mocha-dark">
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent"
        aria-hidden="true"
      />

      <div className="shell py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div
            className="max-w-xs"
            data-reveal
            style={{ '--reveal-delay': '40ms' }}
          >
            <a href="#hero" className="group inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mocha-deep text-cream dark:bg-terracotta dark:text-mocha-ink">
                <span className="font-editorial font-latin-serif text-lg leading-none">N</span>
              </span>
              <span
                dir="ltr"
                className="font-editorial font-latin-serif text-xl text-mocha-deep dark:text-cream"
              >
                Noura
                <span className="text-terracotta-deep dark:text-terracotta-soft">.</span>
              </span>
            </a>
            <p className="mt-4 text-[0.78rem] leading-relaxed text-mocha-brown/75 dark:text-peach/55">
              {t.footer.tagline}
            </p>
          </div>

          <nav
            aria-label={t.a11y.footerNav}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.72rem] font-semibold"
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
          >
            {navItems.map((item) => (
              <a key={item.id} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#hero"
            aria-label={t.a11y.backToTop}
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-mocha-brown/15 px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-mocha-brown/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/45 hover:text-terracotta-deep dark:border-peach/15 dark:text-peach/60 dark:hover:border-terracotta/45 dark:hover:text-terracotta-soft"
            data-reveal
            style={{ '--reveal-delay': '200ms' }}
          >
            {t.footer.backToTop}
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div
          className="mt-10 flex flex-col gap-3 border-t border-mocha-brown/10 pt-6 text-[0.68rem] text-mocha-brown/60 dark:border-peach/10 dark:text-peach/45 sm:flex-row sm:items-center sm:justify-between"
          data-reveal
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
