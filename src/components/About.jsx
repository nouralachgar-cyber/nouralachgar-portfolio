import React from 'react';
import { Compass, Layers, MapPin, Terminal } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function About({ t }) {
  const qualityEntries = Object.entries(t.about.qualities);

  const metaCards = [
    { icon: MapPin, label: t.about.meta.basedInLabel, value: t.about.meta.basedIn },
    { icon: Layers, label: t.about.meta.focusLabel, value: t.about.meta.focus },
    { icon: Terminal, label: t.about.meta.stackLabel, value: t.about.meta.stack },
    { icon: Compass, label: t.about.meta.approachLabel, value: t.about.meta.approach },
  ];

  return (
    <section id='about' aria-labelledby='about-title' className='section section--muted'>
      <span className='section-rule top-0' aria-hidden='true' />
      <div className='geo-field' aria-hidden='true' />

      <div className='shell relative'>
        <SectionHeading
          id='about-title'
          index={t.about.index}
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          accent={t.about.headingAccent}
        />

        <div className='about-grid'>
          {/* Editorial statement + supporting copy */}
          <div data-reveal style={{ '--reveal-delay': '120ms' }}>
            <span className='about-quote-mark' aria-hidden='true'>
              “
            </span>
            <p className='about-statement'>{t.about.quote}</p>

            <p className='about-body' data-reveal style={{ '--reveal-delay': '200ms' }}>
              {t.about.text}
            </p>

            <div className='about-signature' data-reveal style={{ '--reveal-delay': '260ms' }}>
              <span className='about-signature-rule' aria-hidden='true' />
              <span className='about-signature-name'>{t.about.signature}</span>
              <span className='caption-small'>{t.about.signatureRole}</span>
            </div>

            <ul
              className='about-qualities'
              data-reveal
              style={{ '--reveal-delay': '320ms' }}
              aria-label={t.about.eyebrow}
            >
              {qualityEntries.map(([key, label]) => (
                <li key={key} className='quality-pill'>
                  <span className='quality-dot' aria-hidden='true' />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata wall */}
          <div className='about-meta' data-reveal style={{ '--reveal-delay': '180ms' }}>
            {metaCards.map((card, index) => (
              <article key={card.label} className='about-card'>
                <div className='about-card-head'>
                  <card.icon
                    className='about-card-icon h-4 w-4'
                    strokeWidth={1.7}
                    aria-hidden='true'
                  />
                  <span className='about-card-num' aria-hidden='true'>
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <p className='meta-label'>{card.label}</p>
                  <p className='about-card-value mt-2'>{card.value}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
