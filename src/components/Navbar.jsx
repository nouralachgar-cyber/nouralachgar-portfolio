import React, { useEffect, useRef, useState } from 'react';
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';

const sectionIds = ['about', 'skills', 'projects', 'contact'];

function Controls(props) {
  const t = props.t;
  const theme = props.theme;
  const lang = props.lang;
  const toggleTheme = props.toggleTheme;
  const toggleLang = props.toggleLang;
  const compact = props.compact || false;

  const themeLabel =
    theme === 'dark' ? t.a11y.toLight : t.a11y.toDark;

  return (
    <div
      className={
        'flex items-center ' +
        (compact ? 'gap-3' : 'gap-2.5')
      }
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className={
          'group relative flex items-center justify-center rounded-full border transition-all duration-300 ' +
          (compact
            ? 'h-10 w-10'
            : 'h-11 w-11') +
          ' border-navy-subtle bg-ivory/20 text-muted hover:-translate-y-0.5 hover:border-navy/20 hover:bg-ivory dark:border-ivory/15 dark:bg-navy-dark/70 dark:text-ivory dark:hover:border-navy/20'
        }
      >
        {theme === 'dark' ? (
          <Sun
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        )}
      </button>

      <button
        type="button"
        onClick={toggleLang}
        aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        title={lang === 'en' ? 'العربية' : 'English'}
        className={
          'group relative flex items-center justify-center rounded-full border transition-all duration-300 ' +
          (compact
            ? 'h-10 w-10'
            : 'h-11 w-11') +
          ' border-navy-subtle bg-ivory/20 text-muted hover:-translate-y-0.5 hover:border-navy/20 hover:bg-ivory dark:border-ivory/15 dark:bg-navy-dark/70 dark:text-ivory dark:hover:border-navy/20'
        }
      >
        <Globe
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

function Navbar(props) {
  const theme = props.theme;
  const toggleTheme = props.toggleTheme;
  const lang = props.lang;
  const toggleLang = props.toggleLang;
  const t = props.t;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const progressRef = useRef(null);
  const menuButtonRef = useRef(null);

  const menuId = 'mobile-navigation-menu';

  const navItems = [
    {
      id: 'about',
      href: '#about',
      label: t.nav.about,
    },
    {
      id: 'skills',
      href: '#skills',
      label: t.nav.skills,
    },
    {
      id: 'projects',
      href: '#projects',
      label: t.nav.projects,
    },
    {
      id: 'contact',
      href: '#contact',
      label: t.nav.contact,
    },
  ];

  useEffect(function () {
    function handleScroll() {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        0;

      setScrolled(scrollTop > 24);

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? Math.min(
              1,
              Math.max(0, scrollTop / documentHeight)
            )
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform =
          'scaleX(' + progress + ')';
      }

      if (scrollTop < 120) {
        setActiveSection('');
      }
    }

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return function () {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(function () {
    const sections = sectionIds
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        const visibleEntries = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    return function () {
      observer.disconnect();
    };
  }, []);

  useEffect(function () {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);

        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function () {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, []);

  useEffect(function () {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleNavClick() {
    setMobileMenuOpen(false);
  }

  const headerClass =
    'fixed inset-x-0 top-0 z-50 transition-all duration-500 ' +
    (scrolled
      ? 'px-3 pt-3 sm:px-5'
      : 'px-0 pt-0');

  const navBackgroundClass =
    'mx-auto transition-all duration-500 ' +
    (scrolled
      ? 'max-w-6xl rounded-xl border border-navy-subtle bg-navy-secondary/80 shadow-sm shadow-navy/5 backdrop-blur-xl dark:border-ivory/10 dark:bg-navy-dark/85'
      : 'max-w-none border-b border-transparent bg-ivory/20 backdrop-blur-md dark:bg-navy-dark/80');

  return (
    <header className={headerClass}>
      <nav
        className={navBackgroundClass}
        aria-label="Primary navigation"
      >
        <div
          className={
            'mx-auto flex h-[76px] items-center justify-between px-5 sm:px-7 lg:px-9 ' +
            (scrolled
              ? 'lg:h-[70px]'
              : 'lg:h-[78px]')
          }
        >
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3"
            aria-label="Noura Lachgar - Home"
            onClick={handleNavClick}
          >
            <span
              className={
                'relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ' +
                'border-navy-subtle bg-navy-deep text-ivory ' +
                'group-hover:-rotate-3 group-hover:scale-105 ' +
                'dark:border-ivory/15 dark:bg-navy-deep dark:text-muted'
              }
            >
              <span className="font-serif text-lg font-semibold">
                N
              </span>
            </span>

            <span className="hidden sm:block">
              <span className="block font-serif text-base font-semibold leading-none text-muted dark:text-ivory">
                Noura Lachgar
              </span>

              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.28em] text-navy/60 dark:text-ivory/55">
                Portfolio
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(function (item) {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={
                    'group relative py-2 text-sm font-medium transition-colors duration-300 ' +
                    (isActive
                      ? 'text-navy-deep dark:text-ivory'
                      : 'text-muted hover:text-navy-deep dark:text-ivory/65 dark:hover:text-ivory')
                  }
                >
                  {item.label}

                  <span
                    className={
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left border-navy-deep transition-transform duration-300 dark:border-ivory ' +
                      (isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100')
                    }
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop controls */}
          <div className="hidden lg:block">
            <Controls
              t={t}
              theme={theme}
              lang={lang}
              toggleTheme={toggleTheme}
              toggleLang={toggleLang}
              compact={true}
            />
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={function () {
              setMobileMenuOpen(function (open) {
                return !open;
              });
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
            aria-label={
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            className={
              'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ' +
              'border-navy-subtle bg-ivory/20 text-muted ' +
              'hover:border-navy/20 hover:bg-ivory ' +
              'dark:border-ivory/15 dark:bg-navy-dark/70 dark:text-ivory dark:hover:border-navy/20'
            }
          >
            {mobileMenuOpen ? (
              <X
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id={menuId}
          className={
            'overflow-hidden transition-all duration-300 lg:hidden ' +
            (mobileMenuOpen
              ? 'max-h-[500px] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0')
          }
          aria-hidden={!mobileMenuOpen}
        >
          <div className="border-t border-navy-subtle px-5 pb-6 pt-4 dark:border-ivory/10">
            <div className="flex flex-col">
              {navItems.map(function (item) {
                const isActive =
                  activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className={
                      'flex items-center justify-between border-b py-4 text-base font-medium transition-colors duration-300 ' +
                      'border-navy-subtle dark:border-ivory/10 ' +
                      (isActive
                        ? 'text-navy-deep dark:text-ivory'
                        : 'text-muted hover:text-navy-deep dark:text-ivory/70 dark:hover:text-ivory')
                    }
                  >
                    <span>{item.label}</span>

                    <span
                      className={
                        'h-1.5 w-1.5 rounded-full transition-all duration-300 ' +
                        (isActive
                          ? 'scale-100 bg-navy-deep dark:bg-ivory'
                          : 'scale-0 bg-transparent')
                        }
                        aria-hidden="true"
                      />
                  </a>
                );
              })}

              <div className="flex items-center justify-between pt-5">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-navy/50 dark:text-ivory/45">
                  Settings
                </span>

                <Controls
                  t={t}
                  theme={theme}
                  lang={lang}
                  toggleTheme={toggleTheme}
                  toggleLang={toggleLang}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 border-navy-deep dark:border-ivory transition-transform duration-150"
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;