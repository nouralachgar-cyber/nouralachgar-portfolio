import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import HeroArt from './HeroArt';

export default function Hero({ t }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -top-24 end-[-12%] h-[30rem] w-[30rem] rounded-full bg-terracotta/10 blur-3xl dark:bg-terracotta/15" />
        <div className="absolute bottom-[-8rem] start-[-14%] h-[28rem] w-[28rem] rounded-full bg-peach/35 blur-3xl dark:bg-peach/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(235,197,173,0.2),transparent_38%)] dark:bg-[radial-gradient(circle_at_70%_35%,rgba(199,125,99,0.12),transparent_40%)]" />
      </div>

      <div className="shell relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 xl:gap-14">
        <div className="max-w-[38rem]">
          <div
            className="hero-fade flex items-center gap-3"
            style={{ '--hero-delay': '120ms' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full border border-terracotta/40" />
              <span className="relative m-auto h-1 w-1 rounded-full bg-terracotta" />
            </span>
            <span className="section-eyebrow">{t.hero.eyebrow}</span>
            <span className="h-px w-8 bg-terracotta/45" aria-hidden="true" />
          </div>

          <h1
            id="hero-title"
            aria-label={t.hero.heading}
            className="hero-title mt-6 sm:mt-7"
          >
            {t.hero.headingLines.map((line, lineIndex) => (
              <span
                key={line.map((word) => word.text).join(' ')}
                className="hero-line"
                aria-hidden="true"
              >
                {line.map((word, wordIndex) => (
                  <span key={`${word.text}-${wordIndex}`} className="hero-word-mask">
                    <span
                      className={`hero-word ${word.italic ? 'italic' : ''} ${
                        word.accent ? 'hero-accent' : ''
                      }`}
                      style={{ '--word-index': lineIndex * 3 + wordIndex }}
                    >
                      {word.text}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="hero-fade body-copy mt-7 max-w-[33rem] text-[1.02rem] sm:text-[1.08rem]"
            style={{ '--hero-delay': '900ms' }}
          >
            {t.hero.subtext}
          </p>

          <div
            className="hero-fade mt-9 flex flex-wrap items-center gap-3"
            style={{ '--hero-delay': '1020ms' }}
          >
            <a href="#projects" className="btn btn-primary group">
              <span>{t.hero.ctaPrimary}</span>
              <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost group">
              <Sparkles className="h-3.5 w-3.5 text-terracotta" aria-hidden="true" />
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          <a
            href="#about"
            className="hero-fade mt-12 hidden w-fit items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-mocha-brown/60 transition-colors duration-300 hover:text-terracotta-deep dark:text-peach/50 dark:hover:text-terracotta-soft md:inline-flex"
            style={{ '--hero-delay': '1180ms' }}
          >
            <span
              className="grid h-8 w-5 place-items-center rounded-full border border-mocha-brown/25 dark:border-peach/25"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            </span>
            {t.hero.scroll}
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-[35rem] lg:mx-0 lg:ps-2">
          <HeroArt t={t} />
        </div>
      </div>
    </section>
  );
}
