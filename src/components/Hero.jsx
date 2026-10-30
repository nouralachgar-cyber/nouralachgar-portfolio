import React, { useEffect, useRef } from 'react';

const PARTICLES = [
  { top: '18%', left: '6%', delay: '0s', size: 5, accent: false },
  { top: '64%', left: '3%', delay: '1.4s', size: 3.5, accent: true },
  { top: '12%', left: '48%', delay: '0.8s', size: 4, accent: true },
  { top: '82%', left: '44%', delay: '2s', size: 3, accent: false },
  { top: '26%', left: '94%', delay: '1.1s', size: 4.5, accent: false },
  { top: '74%', left: '92%', delay: '2.4s', size: 3.5, accent: true },
];

/** Moroccan eight-point star outline — subtle architectural mark, not ornament */
function StarMark({ className = '' }) {
  return (
    <svg viewBox='0 0 120 120' fill='none' className={className} aria-hidden='true' focusable='false'>
      <rect x='24' y='24' width='72' height='72' stroke='currentColor' strokeWidth='1' opacity='0.55' />
      <rect
        x='24'
        y='24'
        width='72'
        height='72'
        stroke='currentColor'
        strokeWidth='1'
        opacity='0.35'
        transform='rotate(45 60 60)'
      />
      <circle cx='60' cy='60' r='4' fill='currentColor' opacity='0.6' />
    </svg>
  );
}

function HeroHeadline({ t }) {
  const lines = t.hero.headingLines;

  return (
    <h1
      id='hero-title'
      aria-label={t.hero.heading}
      className='mt-6 font-editorial font-normal leading-[1.04] tracking-[-0.04em] text-ink'
      style={{ fontSize: 'clamp(2.9rem, 7.4vw, 5.9rem)' }}
    >
      {lines.map((parts, lineIndex) => (
        <span key={lineIndex} className='hero-line-mask'>
          <span
            className='hero-line'
            style={{ '--line-i': lineIndex }}
            aria-hidden='true'
          >
            {parts.map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {part.italic ? (
                  <em className='font-light italic text-violet/90'>{part.text}</em>
                ) : part.accent ? (
                  <span className='relative inline-block text-terracotta'>
                    {part.text}
                  </span>
                ) : (
                  <span>{part.text}</span>
                )}
                {' '}
              </React.Fragment>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ t }) {
  const portraitAreaRef = useRef(null);
  const parallaxTargetRef = useRef(null);

  // Subtle pointer parallax on the portrait (fine pointers, motion-safe only)
  useEffect(() => {
    const area = portraitAreaRef.current;
    const target = parallaxTargetRef.current;

    if (!area || !target) return undefined;

    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) return undefined;

    let frame = 0;

    const apply = (x, y) => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        target.style.setProperty('--px', String(x.toFixed(3)));
        target.style.setProperty('--py', String(y.toFixed(3)));
      });
    };

    const onPointerMove = (event) => {
      const rect = area.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * -1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * -1));
      apply(x * 10, y * 10);
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
    <section
      id='hero'
      aria-labelledby='hero-title'
      className='relative flex min-h-[100svh] items-center overflow-hidden bg-base pb-14 pt-28 md:pt-32'
    >
      {/* Architectural background — grid + glows + particles */}
      <div className='hero-grid-bg' aria-hidden='true' />
      <div className='hero-glow hero-glow--cyan -left-24 top-8 -translate-y-1/4 opacity-80' aria-hidden='true' />
      <div className='hero-glow hero-glow--violet -bottom-16 right-0 translate-y-1/3 opacity-70' aria-hidden='true' />
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className='hero-particle'
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.accent ? '9s' : '7s',
              width: p.size + 'px',
              height: p.size + 'px',
              background: p.accent
                ? 'rgb(var(--accent-terracotta-rgb) / 0.7)'
                : 'rgb(var(--accent-cyan-rgb) / 0.55)',
            }}
          />
        ))}
      </div>

      {/* Subtle geometric anchoring lines */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-ink/[0.05] lg:block' />
      <StarMark className='pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rotate-12 text-champagne/25 lg:h-44 lg:w-44' />

      <div className='shell relative z-[2] grid grid-cols-1 items-center gap-12 pt-6 lg:grid-cols-[1.18fr_0.82fr] lg:gap-8'>
        {/* ——— LEFT: editorial composition ——— */}
        <div ref={portraitAreaRef} className='max-w-2xl'>
          <p className='hero-eyebrow'>
            <span className='hero-eyebrow-dot' aria-hidden='true' />
            {t.hero.eyebrow}
            <span className='hidden h-4 w-px bg-ink/20 sm:block' aria-hidden='true' />
            <span className='hidden items-center gap-2 font-semibold text-cyan sm:flex'>
              {t.hero.availability}
            </span>
          </p>

          <HeroHeadline t={t} />

          <p className='hero-fade mt-6 max-w-lg text-[1.02rem] leading-relaxed text-muted' style={{ '--fade-i': 0 }}>
            {t.hero.subtext}
          </p>

          <div className='hero-fade mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center' style={{ '--fade-i': 1 }}>
            <a href='#projects' className='btn btn-primary'>
              {t.hero.ctaPrimary}
              <span aria-hidden='true'>→</span>
            </a>
            <a href='#contact' className='btn btn-ghost'>
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Role / location meta row */}
          <div
            className='hero-fade mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted dark:border-ivory/10'
            style={{ '--fade-i': 2 }}
          >
            <span className='text-champagne'>{t.hero.role}</span>
            <span aria-hidden='true' className='h-1 w-1 rounded-full bg-terracotta' />
            <span>{t.hero.location}</span>
            <span aria-hidden='true' className='h-1 w-1 rounded-full bg-terracotta' />
            <span dir='ltr' className='font-mono text-[0.6rem] tracking-normal text-cyan/90'>
              design × code
            </span>
          </div>
        </div>

        {/* ——— RIGHT: portrait composition (controlled ~40% width) ——— */}
        <div className='relative mx-auto w-full max-w-sm lg:max-w-none pt-6 lg:pt-0'>
          <div
            ref={parallaxTargetRef}
            className='hero-portrait-wrap'
          >
            <div
              style={{
                transform: 'translate3d(calc(var(--px, 0) * 1px), calc(var(--py, 0) * 1px), 0)',
              }}
            >
              {/* Offset architectural echo of the arch */}
              <div
                aria-hidden='true'
                className='hero-portrait-backdrop bg-cyan/[0.04]'
                style={{
                  top: '-4%',
                  insetInlineEnd: '-7%',
                  transform: 'translate3d(calc(var(--px, 0) * -0.8px), calc(var(--py, 0) * -0.8px), 0)',
                }}
              />

              {/* Canvas frame */}
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

              {/* Offset panel drawn behind */}
              <div aria-hidden='true' className='hero-portrait-panel' />

              {/* Floating identity chip */}
              <div
                className='hero-float-chip'
                style={{
                  bottom: '8%',
                  insetInlineStart: '-9%',
                  animationDelay: '0.6s',
                }}
              >
                <span className='grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-primary font-editorial text-xs text-ivory'>
                  N
                </span>
                <span className='flex flex-col'>
                  <span dir='ltr' className='font-editorial text-[0.74rem] normal-case tracking-normal font-medium text-ink'>
                    {t.hero.name}
                  </span>
                  <span className='mt-0.5 text-[0.55rem] text-muted normal-case tracking-normal'>
                    {t.hero.role}
                  </span>
                </span>
              </div>

              {/* Floating signal chip */}
              <div
                className='hero-float-chip'
                style={{
                  top: '4%',
                  insetInlineEnd: '-6%',
                  animationDelay: '1.8s',
                }}
              >
                <span className='h-1.5 w-1.5 rounded-full bg-violet' aria-hidden='true' />
                {t.hero.signal}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className='mt-10 hidden lg:flex lg:justify-center lg:opacity-90'>
            <a
              href='#about'
              className='scroll-indicator transition-colors duration-300 hover:text-cyan'
              aria-label={t.hero.scroll}
            >
              <span className='scroll-indicator-line' aria-hidden='true' />
              {t.hero.scroll}
            </a>
          </div>
        </div>
      </div>

      {/* Ambient bottom fade into next section */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[color:var(--bg-primary)]'
      />
    </section>
  );
}
