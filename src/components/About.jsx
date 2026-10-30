import React from 'react';
import { Code, Palette, Globe, UserCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function About({ t }) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad relative overflow-hidden"
    >
      {/* Abstract terracotta accent bar */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-terracotta/10"
        style={{ background: 'rgba(201, 130, 98, 0.08)' }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          id="about-title"
          index={t.about.index}
          eyebrow={t.about.eyebrow}
          heading={t.about.heading}
          accent={t.about.headingAccent}
          description={t.about.text}
        />

        {/* Editorial statement - large central text */}
        <div className="mt-16 lg:mt-20 max-w-2xl mx-auto text-center reveal-init" data-reveal>
          <p
            className="about-statement font-editorial leading-relaxed mb-6"
          >
            I don't just build interfaces. I create digital experiences.
          </p>
          <p
            className="text-[1.05rem] md:text-[1.1rem] lg:text-[1.2rem] text-terracotta/40 max-w-2xl mx-auto"
          >
            {t.about.text}
          </p>
        </div>

        {/* Qualities / focus areas - asymmetric grid */}
        <div className="mt-16 lg:mt-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Code, title: t.about.qualities.curious },
            { icon: Palette, title: t.about.qualities.detail },
            { icon: Globe, title: t.about.qualities.learning },
            { icon: UserCheck, title: t.about.qualities.ux }
          ].map((item, _index) => (
            <article
              key={item.title}
              className="group rounded-xl border transition-all duration-300 hover:border-terracotta/20 hover:bg-navy-secondary/50 dark:border-terracotta/30 dark:hover:border-terracotta/40 dark:hover:bg-navy-deep/20 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="h-5 w-5 rounded-full bg-terracotta/10 flex items-center justify-center"
                  style={{
                    background: 'rgba(201, 130, 98, 0.1)',
                  }}
                >
                  <item.icon className="h-3 w-3 text-terracotta" />
                </span>
                <span className="text-[0.7rem] font-semibold text-navy-deep dark:text-ivory">
                  {item.title}
                </span>
              </div>
              <p className="text-[0.8rem] leading-relaxed text-terracotta/50 dark:text-muted">
                {item.description || 'Focused on creating meaningful digital experiences.'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}