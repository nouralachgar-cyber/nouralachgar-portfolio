import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';
import { translations } from './i18n';

function readStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function getInitialTheme() {
  const storedTheme = readStoredValue('theme');

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

function getInitialLang() {
  return readStoredValue('lang') === 'ar' ? 'ar' : 'en';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [lang, setLang] = useState(getInitialLang);
  const t = translations[lang];

  useScrollReveal();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#2A1D1A' : '#FAF3EA');
    }

    try {
      window.localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const isArabic = lang === 'ar';

    root.lang = lang;
    root.dir = isArabic ? 'rtl' : 'ltr';
    document.title = t.meta.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t.meta.description);
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', t.meta.title);
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', t.meta.description);
    }

    try {
      window.localStorage.setItem('lang', lang);
    } catch {}
  }, [lang, t.meta.description, t.meta.title]);

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  const toggleLang = () => setLang((current) => (current === 'en' ? 'ar' : 'en'));

  return (
    <div className="relative min-h-screen bg-cream text-mocha-deep transition-colors duration-500 dark:bg-mocha-dark dark:text-cream">
      <a href="#main-content" className="skip-link">
        {t.a11y.skip}
      </a>

      <div className="grain" aria-hidden="true" />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        t={t}
      />

      <main id="main-content" tabIndex={-1}>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}
