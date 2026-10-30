import React from 'react';
import Hero3D from './Hero3D';

export default function Hero({ t }) {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-hidden pt-20 bg-navy-primary"
    >
      {/* Grain layer */}
      <div className="grain-layer fixed inset-0 pointer-events-none" aria-hidden="true" />

      {/* Cyan glow - left side */}
      <div
        className="hero-cyan-glow absolute top-0 left-0 w-[300px] h-[300px] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-60"
      />

      {/* Violet glow - right side */}
      <div
        className="hero-violet-glow absolute bottom-0 right-0 w-[200px] h-[200px] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-50"
      />

      {/* 3D canvas - subtle background */}
      <Hero3D className="absolute inset-0 pointer-events-none" />

      {/* Portrait composition - right side */}
      <div
        className="hero-portrait-wrapper absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <div className="hero-portrait-base relative">
          <img
            src="/noura.png"
            alt={t.hero.portraitAlt}
            className="hero-portrait-image absolute pointer-events-none"
          />
          <div
            className="hero-portrait-glow-cyan absolute inset-0 pointer-events-none"
          />
          <div
            className="hero-portrait-glow-violet absolute inset-0 pointer-events-none"
          />
          {/* Geometric object */}
          <div
            className="hero-geo-object absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-navy-subtle rotate-6 opacity-70"
          />
          {/* Floating code element */}
          <div
            className="hero-code-absolute top-6 left-6 text-cyan/60 text-xs font-mono opacity-80"
          >
            <span>function</span>
            <span>build</span>
            <span>connect</span>
          </div>
        </div>
      </div>

      {/* Editorial typography composition - left side */}
      <div className="hero-text-wrapper absolute left-0 top-1/2 -translate-y-1/2 px-4 md:px-6 max-w-xl direction-ltr">
        <p
          className="hero-ebrewbury text-champagne mb-4"
        >
          {t.hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          aria-label={t.hero.heading}
          className="hero-heading font-medium leading-none mb-6 break-normal"
        >
          <span className="block">
            I build the web
          </span>
          <span className="block">
            beyond the screen.
          </span>
        </h1>

        <p
          className="hero-subtext text-muted/60 mb-8"
        >
          {t.hero.subtext}
        </p>

        {/* CTA BUTTONS */}
        <div className="hero-cta flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href="#projects"
            className="btn btn-primary"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Name and role */}
        <div className="hero-meta mt-8 flex items-center justify-center gap-2">
          <span className="text-muted/50 text-[0.65rem] font-semibold tracking-wider">
            {t.hero.name}
          </span>
          <span className="text-muted/40 text-[0.55rem]">
            {t.hero.role}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-terracotta/30 to-transparent"
        aria-label="Scroll down"
      />
    </section>
  );
}