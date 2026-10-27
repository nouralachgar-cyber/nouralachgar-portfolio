import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroArt({ t }) {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion || window.innerWidth < 1024) {
      return undefined;
    }

    let frame = 0;

    const applyPosition = (x, y) => {
      if (frame) window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        stage.style.setProperty('--px', x.toFixed(3));
        stage.style.setProperty('--py', y.toFixed(3));
      });
    };

    const onPointerMove = (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      applyPosition(Math.max(-0.6, Math.min(0.6, x)), Math.max(-0.6, Math.min(0.6, y)));
    };

    const onPointerLeave = () => applyPosition(0, 0);

    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerleave', onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
      stage.style.removeProperty('--px');
      stage.style.removeProperty('--py');
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-art-stage hero-art-reveal relative mx-auto aspect-[10/11] w-full max-w-[33rem]"
    >
      <div className="hero-art-glow" aria-hidden="true" />

      <div className="hero-parallax hero-depth-1 absolute inset-[2%]" aria-hidden="true">
        <div className="hero-orbit-slow h-full w-full">
          <svg
            viewBox="0 0 620 660"
            className="h-full w-full"
            fill="none"
            focusable="false"
          >
            <ellipse
              cx="310"
              cy="330"
              rx="287"
              ry="313"
              stroke="#805044"
              strokeOpacity="0.2"
              strokeWidth="1.4"
              strokeDasharray="2 12"
            />
            <circle cx="522" cy="116" r="5" fill="#C77D63" opacity="0.65" />
            <circle cx="74" cy="500" r="3.5" fill="#805044" opacity="0.55" />
            <circle cx="128" cy="112" r="2.5" fill="#C77D63" opacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="portrait-backdrop hero-parallax hero-depth-1" aria-hidden="true">
        <span className="portrait-halo" />
        <span className="portrait-ring" />
        <span className="portrait-offset-arch" />
        <span className="portrait-accent portrait-accent-star" />
        <span className="portrait-accent portrait-accent-dot" />
        <span className="portrait-accent portrait-accent-dash" />
      </div>

      <div className="portrait-reveal">
        <div className="portrait-frame">
          <div className="portrait-photo">
            <img
              src="/noura.jpg"
              alt={t.hero.portraitAlt}
              width="1086"
              height="1448"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="portrait-image"
            />
            <span className="portrait-glow" aria-hidden="true" />
          </div>
          <span className="portrait-inner-line" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-parallax hero-depth-3 art-chip-anchor-primary">
        <div className="hero-float-reverse">
          <div className="art-chip">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-terracotta font-editorial font-latin-serif text-sm text-mocha-ink">
              N
            </span>
            <span className="min-w-0 text-start">
              <span dir="ltr" className="block font-editorial font-latin-serif text-[0.92rem] leading-tight">
                {t.hero.name}
              </span>
              <span className="art-chip-role mt-0.5 block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-cream/65">
                {t.hero.role}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-parallax hero-depth-2 art-chip-anchor-secondary">
        <div className="hero-float-slow">
          <div className="art-chip">
            <Sparkles className="h-4 w-4 text-terracotta" aria-hidden="true" />
            <span className="art-chip-signal text-[0.6rem] font-bold uppercase tracking-[0.16em]">
              {t.hero.signal}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-parallax hero-depth-1 art-kicker">
        <span>{t.hero.role}</span>
        <span className="h-8 w-px bg-mocha-brown/30 dark:bg-peach/25" />
        <span dir="ltr">2026</span>
      </div>
    </div>
  );
}
