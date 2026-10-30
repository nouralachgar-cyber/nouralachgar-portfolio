import React from 'react';
import { Database, Layout, Sparkles, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';

const SKILL_GROUPS = [
  {
    key: 'frontend',
    icon: Layout,
    accent: 'text-cyan',
    chipAccent: 'hover:border-cyan/70 hover:bg-cyan/10 hover:text-cyan',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    key: 'backend',
    icon: Database,
    accent: 'text-violet',
    chipAccent: 'hover:border-violet/70 hover:bg-violet/10 hover:text-violet',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    key: 'tools',
    icon: Wrench,
    accent: 'text-terracotta',
    chipAccent: 'hover:border-terracotta/70 hover:bg-terracotta/10 hover:text-terracotta',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'GSAP', 'Three.js'],
  },
];

export default function Skills({ t }) {
  return (
    <section id='skills' aria-labelledby='skills-title' className='section-pad relative'>
      <div className='shell'>
        <SectionHeading
          id='skills-title'
          index={t.skills.index}
          eyebrow={t.skills.eyebrow}
          heading={t.skills.heading}
          accent={t.skills.headingAccent}
          description={t.skills.subtext}
        />

        <div className='mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16'>
          {SKILL_GROUPS.map((group, index) => {
            const groupCopy = t.skills.groups[group.key];

            return (
              <article
                key={group.key}
                className='skill-card flex flex-col'
                data-reveal
                style={{ '--reveal-delay': 100 + index * 110 + 'ms' }}
              >
                <div className='mb-5 flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='grid h-9 w-9 place-items-center rounded-lg border border-ink/10 bg-base dark:border-ivory/10'>
                      <group.icon className={group.accent + ' h-4 w-4'} strokeWidth={1.7} aria-hidden='true' />
                    </span>
                    <h3 className='font-editorial text-[1.2rem] leading-tight text-ink'>
                      {groupCopy.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden='true'
                    className='text-[0.55rem] font-bold tabular-nums tracking-[0.2em] text-ink/25 dark:text-ivory/20'
                  >
                    0{index + 1}
                  </span>
                </div>

                <p className='mb-5 text-[0.8rem] leading-relaxed text-muted'>
                  {groupCopy.description}
                </p>

                <ul className='skill-chips mt-auto flex flex-wrap gap-2'>
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <span className={'skill-chip ' + group.chipAccent}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Closing note */}
        <div
          className='mt-10 flex items-center gap-3'
          data-reveal
          style={{ '--reveal-delay': '360ms' }}
        >
          <span aria-hidden='true' className='h-px w-9 bg-gradient-to-r from-violet/70 to-transparent' />
          <p className='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted'>
            <Sparkles className='h-3.5 w-3.5 text-violet' strokeWidth={1.7} aria-hidden='true' />
            {t.skills.note}
          </p>
        </div>
      </div>
    </section>
  );
}
