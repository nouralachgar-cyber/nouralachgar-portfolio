import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import GithubMark from './GithubMark';

const GITHUB_URL = 'https://github.com/nouralachgar-cyber';
const CONTACT_EMAIL = 'nlachgar12@gmail.com';
const year = new Date().getFullYear();

export default function Footer({ t }) {
  const navItems = [
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className='bg-base relative overflow-hidden'>
      <span className='footer-edge absolute inset-x-0 top-0' aria-hidden='true' />

      <div className='shell py-10 lg:py-12'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
          {/* Brand + tagline */}
          <div className='max-w-xs' data-reveal style={{ '--reveal-delay': '40ms' }}>
            <a href='#hero' className='group inline-flex items-center gap-3' aria-label={t.a11y.home}>
              <span className='relative grid h-9 w-9 place-items-center rounded-full bg-navy-primary text-ivory'>
                <span className='font-editorial text-lg leading-none' aria-hidden='true'>
                  N
                </span>
                <span
                  className='absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-terracotta'
                  aria-hidden='true'
                />
              </span>
              <span
                dir='ltr'
                className='font-editorial text-xl text-ink transition-colors duration-300 group-hover:text-champagne'
              >
                Noura<span className='text-champagne'>.</span>
              </span>
            </a>
            <p className='mt-3 text-[0.72rem] leading-relaxed text-muted'>
              {t.footer.tagline}
            </p>
          </div>

          {/* Small navigation */}
          <nav
            aria-label={t.a11y.footerNav}
            className='flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.68rem] font-semibold text-muted'
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className='transition-colors duration-300 hover:text-cyan'
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Socials + back to top */}
          <div
            className='flex flex-wrap items-center gap-3'
            data-reveal
            style={{ '--reveal-delay': '200ms' }}
          >
            <a
              href={GITHUB_URL}
              target='_blank'
              rel='noreferrer'
              aria-label={t.a11y.viewGithub}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan dark:border-ivory/15'
            >
              <GithubMark className='h-4 w-4' aria-hidden='true' />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t.a11y.email}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:text-champagne dark:border-ivory/15'
            >
              <Mail className='h-4 w-4' strokeWidth={1.7} aria-hidden='true' />
            </a>
            <a
              href='#hero'
              aria-label={t.a11y.backToTop}
              className='group inline-flex items-center gap-2.5 rounded-full border border-ink/12 px-4 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/60 hover:text-champagne dark:border-ivory/15'
            >
              {t.footer.backToTop}
              <ArrowUp
                className='h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5'
                strokeWidth={1.8}
                aria-hidden='true'
              />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className='mt-8 flex flex-col justify-between gap-3 border-t border-ink/[0.08] pt-5 text-[0.66rem] text-muted dark:border-ivory/[0.08] lg:flex-row'
          data-reveal
          style={{ '--reveal-delay': '260ms' }}
        >
          <p>
            <span dir='ltr'>© {year} Noura Lachgar.</span> <span>{t.footer.rights}</span>
          </p>
          <span className='inline-flex items-center gap-2'>
            <span className='h-1 w-1 rounded-full bg-cyan' aria-hidden='true' />
            <span>{t.hero.signal}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
