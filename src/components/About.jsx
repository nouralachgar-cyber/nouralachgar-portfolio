import React from 'react';
import { Compass, Layers, MapPin, Terminal } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function About({ t }) {
  const qualityEntries = Object.entries(t.about.qualities);

  const metaCards = [
    { icon: MapPin, label: t.about.meta.basedInLabel, value: t.about.meta.basedIn, accent: 'text-terracotta' },
    { icon: Layers, label: t.about.meta.focusLabel, value: t.about.meta.focus, accent: 'text-cyan' },
    { icon: Terminal, label: t.about.meta.stackLabel, value: t.about.meta.stack, accent: 'text-violet' },
    { icon: Compass, label: t.about.meta.approachLabel, value: t.about.meta.approach, accent: 'text-champagne' },
  ];

  return (
    <section
      id='about'
      aria-labelledby='about-title'
      className='section-pad relative overflow-hidden'
    >
      {/* Vertical architectural accent */}
      <div
        aria-hidden='true'
        className='absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-terracotta/0 via-terracotta/25 to-terracotta/0 lg:block'
      />

      <div className='shell relative'>
        <SectionHeading
          id='about-title'
          index={t.about.index}
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          accent={t.about.headingAccent}
          description={t.about.text}
        />

        {/* Editorial statement */}
        <div
          className='mt-16 max-w-3xl lg:mt-20'
          data-reveal
          style={{ '--reveal-delay': '120ms' }}
        >
          <span aria-hidden='true' className='block font-editorial text-5xl leading-none text-terracotta/50'>
            “
          </span>
          <p className='about-statement -mt-2'>{t.about.quote}</p>
        </div>

        {/* Signature */}
        <div
          className='mt-10 flex items-center gap-4'
          data-reveal
          style={{ '--reveal-delay': '220ms' }}
        >
          <span className='h-px w-10 bg-terracotta/50' aria-hidden='true' />
          <span className='font-editorial text-xl italic text-ink'>
            {t.about.signature}
          </span>
          <span className='text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted'>
            {t.about.signatureRole}
          </span>
        </div>

        {/* Metadata cards */}
        <div className='mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16'>
          {metaCards.map((card, index) => (
            <article
              key={card.label}
              className='about-card group'
              data-reveal
              style={{ '--reveal-delay': 120 + index * 90 + 'ms' }}
            >
              <div className='mb-4 flex items-center justify-between'>
                <card.icon
                  className={card.accent + ' h-[18px] w-[18px]'}
                  strokeWidth={1.7}
                  aria-hidden='true'
                />
                <span
                  aria-hidden='true'
                  className='text-[0.55rem] font-bold tabular-nums tracking-[0.2em] text-ink/25 dark:text-ivory/20'
                >
                  0{index + 1}
                </span>
              </div>
              <p className='text-[0.6rem] font-bold uppercase tracking-[0.22em] text-muted'>
                {card.label}
              </p>
              <p className='mt-2 text-[0.95rem] font-medium leading-snug text-ink'>
                {card.value}
              </p>
            </article>
          ))}
        </div>

        {/* Qualities — preserved translated content as tag row */}
        <ul
          className='mt-10 flex flex-wrap items-center gap-2.5'
          data-reveal
          style={{ '--reveal-delay': '320ms' }}
          aria-label={t.about.eyebrow}
        >
          {qualityEntries.map(([key, label]) => (
            <li
              key={key}
              className='inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper/50 px-4 py-2 text-[0.7rem] font-medium text-muted transition-colors duration-300 hover:border-champagne/50 hover:text-ink dark:border-ivory/10'
            >
              <span className='h-1 w-1 rounded-full bg-champagne' aria-hidden='true' />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
