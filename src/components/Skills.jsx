import React from 'react';
import { Layout, Server, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';

const categories = [
  {
    key: 'frontend',
    icon: Layout,
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'React Router']
  },
  {
    key: 'backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
  },
  {
    key: 'tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Vite', 'Figma', 'VS Code']
  }
];

export default function Skills({ t }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            id="skills-title"
            index={t.skills.index}
            eyebrow={t.skills.eyebrow}
            heading={t.skills.heading}
            accent={t.skills.headingAccent}
            description={t.skills.subtext}
            className="lg:col-span-8"
          />

          <div
            className="hidden justify-end pb-2 lg:col-span-4 lg:flex"
            data-reveal
            style={{ '--reveal-delay': '260ms' }}
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-mocha-brown/15 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-mocha-brown/60 dark:border-peach/15 dark:text-peach/50">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
              {t.skills.note}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const group = t.skills.groups[category.key];

            return (
              <article
                key={category.key}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-mocha-brown/10 bg-cream/45 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-terracotta/40 hover:shadow-[0_30px_60px_-50px_rgba(53,37,34,0.6)] dark:border-peach/10 dark:bg-white/[0.025] dark:hover:border-terracotta/40 dark:hover:bg-white/[0.045] sm:p-7 ${
                  index === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                data-reveal
                style={{ '--reveal-delay': `${index * 100}ms` }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-terracotta via-terracotta/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="section-index" aria-hidden="true" dir="ltr">
                      {`0${index + 1}`}
                    </span>
                    <h3 className="mt-3 font-editorial text-[1.55rem] leading-tight text-mocha-deep dark:text-cream">
                      {group.title}
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-terracotta/10 text-terracotta transition-all duration-500 group-hover:-rotate-6 group-hover:bg-terracotta/15 dark:bg-terracotta/15">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>

                <p className="body-copy mt-4 text-[0.84rem] leading-[1.75]">
                  {group.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
