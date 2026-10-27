import React from 'react';
import { BookOpen, Code, Compass, UserCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function About({ t }) {
  const qualities = [
    { icon: Compass, title: t.about.qualities.curious },
    { icon: Code, title: t.about.qualities.detail },
    { icon: BookOpen, title: t.about.qualities.learning },
    { icon: UserCheck, title: t.about.qualities.ux }
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-pad section-alt relative overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -end-6 top-8 select-none font-editorial font-latin-serif text-[19rem] leading-none text-mocha-brown/[0.035] dark:text-cream/[0.025] lg:text-[25rem]"
      >
        N
      </span>

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="about-title"
              index={t.about.index}
              eyebrow={t.about.eyebrow}
              heading={t.about.heading}
              accent={t.about.headingAccent}
            />

            <div
              className="mt-10 flex items-center gap-4 lg:mt-14"
              data-reveal
              style={{ '--reveal-delay': '180ms' }}
            >
              <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-mocha-brown/20 bg-cream/60 dark:border-peach/20 dark:bg-white/[0.035]">
                <span className="font-editorial font-latin-serif text-2xl text-mocha-deep dark:text-cream">N</span>
                <span
                  className="absolute inset-1 rounded-full border border-dashed border-terracotta/35"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0">
                <p className="font-editorial text-lg text-mocha-deep dark:text-cream">
                  {t.about.signature}
                </p>
                <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-mocha-brown/55 dark:text-peach/45">
                  {t.about.signatureRole}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p
              className="body-copy max-w-2xl text-[1.04rem] sm:text-[1.1rem]"
              data-reveal
              style={{ '--reveal-delay': '120ms' }}
            >
              {t.about.text}
            </p>

            <blockquote
              className="relative mt-8 max-w-2xl ps-6 sm:ps-8"
              data-reveal
              style={{ '--reveal-delay': '200ms' }}
            >
              <span
                className="absolute bottom-0 start-0 top-0 w-px bg-gradient-to-b from-terracotta/70 via-terracotta/30 to-transparent"
                aria-hidden="true"
              />
              <p className="about-quote font-editorial text-[1.3rem] leading-[1.5] text-mocha-deep dark:text-cream/90 sm:text-[1.5rem]">
                {t.about.quote}
              </p>
            </blockquote>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3.5 sm:grid-cols-2">
              {qualities.map((quality, index) => {
                const Icon = quality.icon;

                return (
                  <article
                    key={quality.title}
                    className="group rounded-[1.35rem] border border-mocha-brown/10 bg-cream/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:bg-white/70 dark:border-peach/10 dark:bg-white/[0.025] dark:hover:border-terracotta/40 dark:hover:bg-white/[0.055]"
                    data-reveal
                    style={{ '--reveal-delay': `${240 + index * 80}ms` }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Icon
                        className="h-5 w-5 text-terracotta transition-transform duration-300 group-hover:-rotate-6"
                        aria-hidden="true"
                      />
                      <span className="section-index" aria-hidden="true" dir="ltr">
                        {`0${index + 1}`}
                      </span>
                    </div>
                    <h3 className="mt-7 text-[0.82rem] font-semibold leading-snug text-mocha-deep dark:text-cream">
                      {quality.title}
                    </h3>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
