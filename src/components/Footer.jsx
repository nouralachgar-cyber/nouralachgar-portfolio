import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import GithubMark from './GithubMark';

const GITHUB_URL = 'https://github.com/nouralachgar-cyber';
const LINKEDIN_URL = 'https://linkedin.com';
const CONTACT_EMAIL = 'nlachgar12@gmail.com';

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
    </svg>
  );
}
const year = new Date().getFullYear();

export default function Footer({ t }) {
  const navItems = [
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className='footer'>
      <div className='shell'>
        <div className='footer-top'>
          <div className='footer-brand' data-reveal style={{ '--reveal-delay': '40ms' }}>
            <a href='#hero' className='footer-brand-link' aria-label={t.a11y.home}>
              <span className='footer-brand-mark' aria-hidden='true'>
                N
              </span>
              <span dir='ltr' className='footer-brand-name'>
                Noura Lachgar<span className='text-champagne'>.</span>
              </span>
            </a>
            <p className='footer-tagline'>{t.footer.tagline}</p>
          </div>

          <nav
            aria-label={t.a11y.footerNav}
            className='footer-nav'
            data-reveal
            style={{ '--reveal-delay': '120ms' }}
          >
            {navItems.map((item) => (
              <a key={item.id} href={item.href} className='footer-nav-link'>
                {item.label}
              </a>
            ))}
          </nav>

          <div className='footer-actions' data-reveal style={{ '--reveal-delay': '200ms' }}>
            <a
              href={GITHUB_URL}
              target='_blank'
              rel='noreferrer'
              aria-label={t.a11y.viewGithub}
              className='icon-btn'
            >
              <GithubMark className='h-4 w-4' />
            </a>
            <a
              href={LINKEDIN_URL}
              target='_blank'
              rel='noreferrer'
              aria-label={t.a11y.viewLinkedin}
              className='icon-btn'
            >
              <LinkedinIcon className='h-4 w-4' />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t.a11y.email}
              className='icon-btn'
            >
              <Mail className='h-4 w-4' strokeWidth={1.7} aria-hidden='true' />
            </a>
            <a href='#hero' className='projects-link' aria-label={t.a11y.backToTop}>
              {t.footer.backToTop}
              <ArrowUp className='h-3.5 w-3.5' strokeWidth={1.8} aria-hidden='true' />
            </a>
          </div>
        </div>

        <div className='footer-bottom'>
          <p>
            <span dir='ltr'>© {year} Noura Lachgar.</span> {t.footer.rights}
          </p>
          <span className='footer-signal'>
            <span className='footer-signal-dot' aria-hidden='true' />
            {t.hero.signal}
          </span>
        </div>
      </div>
    </footer>
  );
}
