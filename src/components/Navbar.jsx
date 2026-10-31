import React, { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

const sectionIds = ['about', 'skills', 'projects', 'contact'];

function Controls({ t, theme, lang, toggleTheme, toggleLang, large = false }) {
  const themeLabel = theme === 'dark' ? t.a11y.toLight : t.a11y.toDark;
  const buttonClass = large ? 'icon-btn h-11 w-11' : 'icon-btn';

  return (
    <div className='flex items-center gap-2'>
      <button
        type='button'
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className={buttonClass}
      >
        {theme === 'dark' ? (
          <Sun size={16} strokeWidth={1.8} aria-hidden='true' />
        ) : (
          <Moon size={16} strokeWidth={1.8} aria-hidden='true' />
        )}
      </button>

      <button
        type='button'
        onClick={toggleLang}
        aria-label={t.a11y.switchLang}
        title={t.a11y.switchLang}
        className={buttonClass + ' text-[0.6rem] font-bold tracking-[0.08em]'}
      >
        <span dir='ltr'>{lang === 'en' ? 'AR' : 'EN'}</span>
      </button>
    </div>
  );
}

export default function Navbar({ theme, lang, toggleTheme, toggleLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const progressRef = useRef(null);
  const menuButtonRef = useRef(null);

  const menuId = 'mobile-navigation-menu';

  const navItems = [
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || 0;
        setScrolled(scrollTop > 24);

        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: '-28% 0px -52% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen((open) => {
          if (open && menuButtonRef.current) {
            menuButtonRef.current.focus();
          }
          return false;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={'nav-root' + (scrolled ? ' is-scrolled' : '')}>
      <nav className='nav-frame' aria-label={t.a11y.primaryNav}>
        <div className='nav-inner'>
          <a href='#hero' className='nav-brand' aria-label={t.a11y.home} onClick={closeMenu}>
            <span className='nav-brand-mark' aria-hidden='true'>
              N
              <span className='nav-brand-dot' />
            </span>
            <span className='nav-brand-text'>
              <span className='nav-brand-name' dir='ltr'>
                Noura Lachgar
              </span>
              <span className='nav-brand-role'>Portfolio</span>
            </span>
          </a>

          <div className='nav-links'>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={'nav-link' + (activeSection === item.id ? ' is-active' : '')}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className='nav-actions'>
            <Controls
              t={t}
              theme={theme}
              lang={lang}
              toggleTheme={toggleTheme}
              toggleLang={toggleLang}
            />
            <a href='#contact' className='nav-cta' onClick={closeMenu}>
              {t.nav.cta}
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type='button'
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
            aria-label={mobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            className='nav-burger'
          >
            {mobileMenuOpen ? (
              <X size={19} strokeWidth={1.8} aria-hidden='true' />
            ) : (
              <Menu size={19} strokeWidth={1.8} aria-hidden='true' />
            )}
          </button>
        </div>

        <div id={menuId} className={'nav-mobile' + (mobileMenuOpen ? ' is-open' : '')}>
          <div className='nav-mobile-inner'>
            <div className='nav-mobile-list'>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  aria-hidden={!mobileMenuOpen}
                  className={
                    'nav-mobile-link' + (activeSection === item.id ? ' is-active' : '')
                  }
                >
                  <span>{item.label}</span>
                  <span className='nav-mobile-link-dot' aria-hidden='true' />
                </a>
              ))}

              <div className='nav-mobile-footer'>
                <span className='nav-mobile-label'>{t.nav.settings}</span>
                <Controls
                  t={t}
                  theme={theme}
                  lang={lang}
                  toggleTheme={toggleTheme}
                  toggleLang={toggleLang}
                  large
                />
              </div>
            </div>
          </div>
        </div>

        <div className='nav-progress' aria-hidden='true'>
          <div ref={progressRef} className='nav-progress-bar' />
        </div>
      </nav>
    </header>
  );
}
