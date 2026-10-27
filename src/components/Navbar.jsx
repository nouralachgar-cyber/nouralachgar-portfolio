import React, { useEffect, useRef, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';

const sectionIds = ['about', 'skills', 'projects', 'contact'];

function Controls({ t, theme, lang, toggleTheme, toggleLang, compact = false }) {
  const themeLabel = theme === 'dark' ? t.a11y.toLight : t.a11y.toDark;

  return (
    <div className={`flex items-center ${compact ? 'gap-3' : 'gap-2.5'}`}>
      <button
        type="button"
        onClick={toggleLang}
        aria-label={t.a11y.switchLang}
        className="inline-flex h-[2.55rem] items-center gap-2 rounded-full border border-mocha-deep/15 bg-cream/55 px-3.5 text-[0.68rem] font-bold tracking-wide text-mocha-deep transition-all duration-300 hover:border-terracotta/60 hover:bg-terracotta/10 hover:text-terracotta-deep dark:border-cream/15 dark:bg-white/[0.04] dark:text-cream dark:hover:border-terracotta/55 dark:hover:bg-terracotta/15 dark:hover:text-terracotta-soft"
      >
        <Globe className="h-3.5 w-3.5 text-terracotta" aria-hidden="true" />
        <span className="whitespace-nowrap">{lang === 'en' ? 'العربية' : 'English'}</span>
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className="icon-btn"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-peach" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 text-mocha-brown" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default function Navbar({ theme, toggleTheme, lang, toggleLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progressRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuId = 'mobile-navigation';

  const navItems = [
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'contact', href: '#contact', label: t.nav.contact }
  ];

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

        setScrolled(scrollTop > 24);
        if (scrollTop < 120) {
          setActiveSection('');
        }

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative border-b backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'border-mocha-deep/10 bg-cream/90 shadow-[0_18px_40px_-35px_rgba(53,37,34,0.45)] dark:border-cream/10 dark:bg-mocha-dark/90'
            : 'border-transparent bg-cream/65 dark:bg-mocha-dark/65'
        }`}
      >
        <nav aria-label={t.a11y.primaryNav} className="shell">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-500 ${
              scrolled ? 'h-[4.25rem]' : 'h-[5.15rem]'
            }`}
          >
            <a
              href="#hero"
              onClick={() => {
                setActiveSection('');
                setMobileMenuOpen(false);
              }}
              className="group flex shrink-0 items-center gap-3 rounded-full"
              aria-label={t.a11y.home}
            >
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-mocha-deep text-cream shadow-[0_10px_24px_-14px_rgba(53,37,34,0.9)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 dark:bg-terracotta dark:text-mocha-ink">
                <span className="font-editorial font-latin-serif text-[1.35rem] leading-none">N</span>
                <span className="absolute inset-x-2 top-1 h-px bg-cream/20" aria-hidden="true" />
              </span>
              <span
                dir="ltr"
                className="font-editorial font-latin-serif text-[1.32rem] font-medium tracking-editorial text-mocha-deep dark:text-cream"
              >
                Noura
                <span className="text-terracotta-deep dark:text-terracotta-soft">.</span>
              </span>
            </a>

            <div className="hidden items-center rounded-full border border-mocha-deep/10 bg-white/30 p-1 lg:flex dark:border-cream/10 dark:bg-white/[0.025]">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex">
              <Controls
                t={t}
                theme={theme}
                lang={lang}
                toggleTheme={toggleTheme}
                toggleLang={toggleLang}
              />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls={menuId}
              aria-label={mobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              className="icon-btn lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-mocha-deep/5 dark:bg-cream/5">
          <span
            ref={progressRef}
            aria-hidden="true"
            className="block h-full w-full bg-gradient-to-r from-terracotta via-mocha-brown to-peach transition-transform duration-150 ease-out dark:from-terracotta dark:via-terracotta-soft dark:to-peach"
            style={{ transform: 'scaleX(0)', transformOrigin: lang === 'ar' ? 'right' : 'left' }}
          />
        </div>

        {mobileMenuOpen ? (
          <div id={menuId} className="lg:hidden">
            <div className="shell pb-5 pt-1">
              <div className="menu-panel max-h-[calc(100svh-6rem)] overflow-y-auto rounded-[1.75rem] border border-mocha-deep/10 bg-cream/95 p-3 shadow-[0_26px_60px_-30px_rgba(53,37,34,0.5)] backdrop-blur-2xl dark:border-cream/10 dark:bg-mocha-surface/95">
                <div className="grid gap-0.5">
                  {navItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => handleNavClick(item.id)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3 text-[0.98rem] font-semibold text-mocha-deep transition-colors duration-300 hover:bg-terracotta/10 hover:text-terracotta-deep dark:text-cream dark:hover:bg-terracotta/15 dark:hover:text-terracotta-soft"
                    >
                      <span>{item.label}</span>
                      <span
                        dir="ltr"
                        className="section-index transition-transform duration-300 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        {`0${index + 1}`}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 border-t border-mocha-deep/10 px-2 pt-4 dark:border-cream/10">
                  <Controls
                    t={t}
                    theme={theme}
                    lang={lang}
                    toggleTheme={toggleTheme}
                    toggleLang={toggleLang}
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
