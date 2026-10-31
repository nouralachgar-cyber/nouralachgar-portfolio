import React, { useEffect, useRef } from 'react';

const PARTICLES = [
  { top: '16%', left: '5%', delay: '0s', size: 4, accent: false },
  { top: '68%', left: '4%', delay: '1.6s', size: 3, accent: true },
  { top: '12%', left: '52%', delay: '0.9s', size: 3.5, accent: true },
  { top: '84%', left: '46%', delay: '2.2s', size: 2.5, accent: false },
  { top: '24%', left: '95%', delay: '1.2s', size: 3.5, accent: false },
  { top: '72%', left: '93%', delay: '2.6s', size: 3, accent: true },
];

/** Moroccan eight-point star outline — an architectural mark, not decoration. */
function StarMark({ className = '' }) {
  return (
    <svg
      viewBox='0 0 120 120'
      fill='none'
      className={className}
      aria-hidden='true'
      focusable='false'
    >
      <rect x='26' y='26' width='68' height='68' stroke='currentColor' strokeWidth='1' />
      <rect
        x='26'
        y='26'
        width='68'
        height='68'
        stroke='currentColor'
        strokeWidth='1'
        opacity='0.6'
        transform='rotate(45 60 60)'
      />
      <circle cx='60' cy='60' r='3' fill='currentColor' />
    </svg>
  );
}

function HeroHeadline({ t }) {
  const lines = t.hero.headingLines;

  return (
    <h1
      id='hero-title'
      className='hero-headline'
      aria-label={t.hero.heading}
      data-reveal='mask'
    >
      {lines.map((parts, lineIndex) => (
        <span key={lineIndex} className='hero-line-mask'>
          <span
            className='hero-line'
            style={{ '--line-i': lineIndex }}
            aria-hidden='true'
          >
            {parts.map((part, partIndex) => (
              <React.Fragment key={`${lineIndex}-${partIndex}`}>
                {part.italic ? (
                  <em>{part.text}</em>
                ) : part.accent ? (
                  <span className='hero-word-accent'>{part.text}</span>
                ) : (
                  <span>{part.text}</span>
                )}
                {partIndex < parts.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ t }) {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);

  // Subtle pointer parallax on the portrait — motion-safe, fine pointers only.
  useEffect(() => {
    const area = sectionRef.current;
    const target = parallaxRef.current;

    if (!area || !target) return undefined;
    if (typeof window.matchMedia !== 'function') return undefined;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return undefined;

    let frame = 0;

    const apply = (x, y) => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        target.style.setProperty('--px', x.toFixed(2));
        target.style.setProperty('--py', y.toFixed(2));
      });
    };

    const onPointerMove = (event) => {
      const rect = area.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * -2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * -2));
      apply(x * 9, y * 9);
    };

    const onPointerLeave = () => apply(0, 0);

    area.addEventListener('pointermove', onPointerMove);
    area.addEventListener('pointerleave', onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      area.removeEventListener('pointermove', onPointerMove);
      area.removeEventListener('pointerleave', onPointerLeave);
      target.style.removeProperty('--px');
      target.style.removeProperty('--py');
    };
  }, []);

  return (
    <section id='hero' ref={sectionRef} className='hero' aria-labelledby='hero-title'>
      {/* Architectural atmosphere */}
      <div className='hero-grid-bg' aria-hidden='true' />
      <div className='hero-glow hero-glow--cyan' aria-hidden='true' />
      <div className='hero-glow hero-glow--violet' aria-hidden='true' />
      <div className='hero-axis hidden lg:block' aria-hidden='true' />

      <div className='pointer-events-none absolute inset-0 z-0' aria-hidden='true'>
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className='hero-particle'
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.accent ? '10s' : '8s',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.accent
                ? 'rgb(var(--accent-terracotta-rgb) / 0.75)'
                : 'rgb(var(--accent-cyan-rgb) / 0.6)',
            }}
          />
        ))}
      </div>

      <div className='shell'>
        <div className='hero-inner'>
          {/* ——— Editorial copy ——— */}
          <div className='hero-copy'>
            <p className='hero-eyebrow'>
              <span className='hero-eyebrow-dot' aria-hidden='true' />
              <span>{t.hero.eyebrow}</span>
              <span className='hero-eyebrow-divider' aria-hidden='true' />
              <span className='hero-eyebrow-status'>{t.hero.availability}</span>
            </p>

            <HeroHeadline t={t} />

            <p className='hero-subtext hero-fade' style={{ '--fade-i': 0 }}>
              {t.hero.subtext}
            </p>

            <div className='hero-actions hero-fade' style={{ '--fade-i': 1 }}>
              <a href='#projects' className='btn btn-primary'>
                {t.hero.ctaPrimary}
                <span className='btn-arrow' aria-hidden='true'>
                  →
                </span>
              </a>
              <a href='#contact' className='btn btn-ghost'>
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className='hero-meta hero-fade' style={{ '--fade-i': 2 }}>
              <span className='hero-meta-role'>{t.hero.role}</span>
              <span className='hero-meta-sep' aria-hidden='true' />
              <span>{t.hero.location}</span>
              <span className='hero-meta-sep' aria-hidden='true' />
              <span dir='ltr'>{t.hero.signal}</span>
            </div>
          </div>

          {/* ——— Controlled portrait composition ——— */}
          <div className='hero-visual'>
            <div className='hero-parallax' ref={parallaxRef}>
              <div className='hero-portrait-wrap'>
                <div className='hero-portrait-halo' aria-hidden='true' />
                <div className='hero-orbit' aria-hidden='true' />

                <div className='hero-portrait-frame'>
                  <img
                    src='/noura.png'
                    alt={t.hero.portraitAlt}
                    width={1086}
                    height={1448}
                    loading='eager'
                    decoding='async'
                    fetchPriority='high'
                    className='hero-portrait-photo'
                  />
                  <div className='hero-portrait-tint' aria-hidden='true' />
                  <div className='hero-portrait-veil' aria-hidden='true' />
                </div>

                <div className='hero-float-chip hero-float-chip--identity'>
                  <span className='hero-chip-avatar' aria-hidden='true'>
                    N
                  </span>
                  <span className='hero-chip-copy'>
                    <span dir='ltr' className='hero-chip-name'>
                      {t.hero.name}
                    </span>
                    <span className='hero-chip-role'>{t.hero.role}</span>
                  </span>
                </div>

                <div className='hero-float-chip hero-float-chip--signal'>
                  <span
                    aria-hidden='true'
                    className='h-1.5 w-1.5 rounded-full bg-violet'
                  />
                  {t.hero.signal}
                </div>

                <StarMark className='hero-star' />
              </div>
            </div>
          </div>
        </div>

        <div className='hero-foot'>
          <a
            href='#about'
            className='scroll-indicator'
            aria-label={t.hero.scroll}
          >
            <span className='scroll-indicator-line' aria-hidden='true' />
            {t.hero.scroll}
          </a>

          <p className='hero-coords' dir='ltr'>
            31.7917° N · 7.0926° W
            <br />
            Casablanca — Morocco
          </p>
        </div>
      </div>

      <div className='hero-fade-bottom' aria-hidden='true' />
    </section>
  );
}
