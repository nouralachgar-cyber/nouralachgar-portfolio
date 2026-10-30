import React, { useEffect, useRef, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';

const sectionIds = ['about', 'skills', 'projects', 'contact'];

function Controls({ t, theme, toggleTheme, toggleLang, compact }) {
  const themeLabel = theme === 'dark' ? t.a11y.toLight : t.a11y.toDark;

  const controlClass =
    'group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-paper/60 text-muted transition-all duration-300 ' +
    'hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan ' +
    'dark:border-ivory/15 dark:bg-ivory/[0.04]';

  return (
    <div className={'flex items-center ' + (compact ? 'gap-2.5' : 'gap-2')}>
      <button
        type='button'
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className={controlClass}
      >
        {theme === 'dark' ? (
          <Sun size={17} strokeWidth={1.8} aria-hidden='true' />
        ) : (
          <Moon size={17} strokeWidth={1.8} aria-hidden='true' />
        )}
      </button>

      <button
        type='button'
        onClick={toggleLang}
        aria-label={t.a11y.switchLang}
        title={t.a11y.switchLang}
        className={controlClass}
      >
        <Globe size={17} strokeWidth={1.8} aria-hidden='true' />
      </button>
    </div>
  );
}

export default function Navbar({ theme, toggleTheme, toggleLang, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
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

    function handleScroll() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || 0;
        setScrolled(scrollTop > 24);

        const documentHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const progress =
          documentHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / documentHeight))
            : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = 'scaleX(' + progress + ')';
        }

        if (scrollTop < 120) {
          setActiveSection((current) => (current ? '' : current));
        }

        ticking = false;
      });
    }

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
      { root: null, rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMobileMenuOpen((open) => {
          if (open && menuButtonRef.current) {
            menuButtonRef.current.focus();
          }
          return false;
        });
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleNavClick() {
    setMobileMenuOpen(false);
  }

  const navFrame = scrolled
    ? 'mx-auto max-w-6xl rounded-2xl border border-ink/10 bg-paper/80 shadow-[0_18px_40px_-30px_rgba(7,17,31,0.55)] backdrop-blur-xl dark:border-ivory/10'
    : 'mx-auto max-w-none border-b border-transparent bg-paper/40 backdrop-blur-md dark:bg-ivory/[0.02]';

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-500 sm:px-5'>
      <nav className={navFrame + ' transition-all duration-500'} aria-label={t.a11y.primaryNav}>
        <div
          className={
            'mx-auto flex h-[68px] items-center justify-between px-4 sm:px-7 ' +
            (scrolled ? 'lg:h-[64px]' : 'lg:h-[72px]')
          }
        >
          {/* Brand */}
          <a href='#hero' className='group flex items-center gap-3' aria-label={t.a11y.home} onClick={handleNavClick}>
            <span className='relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-champagne/40 bg-navy-primary text-ivory shadow-[0_0_24px_rgba(76,201,240,0.18)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105'>
              <span className='font-editorial text-lg leading-none'>N</span>
              <span
                aria-hidden='true'
                className='absolute -bottom-1 -left-1 h-1.5 w-1.5 rounded-full bg-terracotta'
              />
            </span>

            <span className='hidden sm:block'>
              <span className='block font-editorial text-base leading-none text-ink'>
                Noura Lachgar
              </span>
              <span className='mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-muted'>
                Portfolio
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className='hidden items-center gap-7 lg:flex'>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={
                    'group relative py-2 text-sm font-medium transition-colors duration-300 ' +
                    (isActive
                      ? 'text-ink'
                      : 'text-muted hover:text-ink dark:text-ivory/65 dark:hover:text-ivory')
                  }
                >
                  {item.label}
                  <span
                    aria-hidden='true'
                    className={
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-cyan transition-transform duration-300 ' +
                      (isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')
                    }
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop controls */}
          <div className='hidden lg:block'>
            <Controls
              t={t}
              theme={theme}

              toggleTheme={toggleTheme}
              toggleLang={toggleLang}
              compact={true}
            />
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type='button'
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
            aria-label={mobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            className='flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/60 text-ink transition-all duration-300 hover:border-cyan/50 hover:text-cyan dark:border-ivory/15 dark:bg-ivory/[0.04] dark:text-ivory lg:hidden'
          >
            {mobileMenuOpen ? (
              <X size={20} strokeWidth={1.8} aria-hidden='true' />
            ) : (
              <Menu size={20} strokeWidth={1.8} aria-hidden='true' />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id={menuId}
          className={
            'overflow-hidden transition-all duration-300 lg:hidden ' +
            (mobileMenuOpen
              ? 'max-h-[520px] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0')
          }
          aria-hidden={!mobileMenuOpen}
        >
          <div className='border-t border-ink/10 px-5 pb-6 pt-4 dark:border-ivory/10'>
            <div className='flex flex-col'>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={
                      'flex items-center justify-between border-b border-ink/10 py-4 text-base font-medium transition-colors duration-300 dark:border-ivory/10 ' +
                      (isActive ? 'text-ink' : 'text-muted dark:text-ivory/70')
                    }
                  >
                    <span>{item.label}</span>
                    <span
                      className={
                        'h-1.5 w-1.5 rounded-full transition-all duration-300 ' +
                        (isActive ? 'scale-100 bg-cyan' : 'scale-0 bg-transparent')
                      }
                      aria-hidden='true'
                    />
                  </a>
                );
              })}

              <div className='flex items-center justify-between pt-5'>
                <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-muted'>
                  {t.nav.settings}
                </span>
                <Controls
                  t={t}
                  theme={theme}

                  toggleTheme={toggleTheme}
                  toggleLang={toggleLang}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden rounded-b-2xl' aria-hidden='true'>
          <div
            ref={progressRef}
            className='h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-violet to-terracotta transition-transform duration-150'
          />
        </div>
      </nav>
    </header>
  );
}
