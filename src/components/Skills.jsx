import React from 'react';
import { Database, Layout, Sparkles, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';

const SKILL_GROUPS = [
  {
    key: 'frontend',
    icon: Layout,
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    key: 'backend',
    icon: Database,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    key: 'tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Three.js', 'Vite'],
  },
];

export default function Skills({ t }) {
  return (
    <section id='skills' aria-labelledby='skills-title' className='section'>
      <span className='section-rule top-0' aria-hidden='true' />

      <div className='shell'>
        <SectionHeading
          id='skills-title'
          index={t.skills.index}
          eyebrow={t.skills.eyebrow}
          heading={t.skills.heading}
          accent={t.skills.headingAccent}
          description={t.skills.subtext}
        />

        <div className='skills-grid'>
          {SKILL_GROUPS.map((group, index) => {
            const copy = t.skills.groups[group.key];

            return (
              <article
                key={group.key}
                className='skill-card'
                data-reveal
                style={{ '--reveal-delay': 100 + index * 110 + 'ms' }}
              >
                <div className='skill-card-head'>
                  <div className='skill-card-title-wrap'>
                    <span className='skill-card-icon'>
                      <group.icon
                        className='h-4 w-4'
                        strokeWidth={1.7}
                        aria-hidden='true'
                      />
                    </span>
                    <h3 className='skill-card-title'>{copy.title}</h3>
                  </div>
                  <span className='about-card-num' aria-hidden='true'>
                    0{index + 1}
                  </span>
                </div>

                <p className='skill-card-desc'>{copy.description}</p>

                <ul className='skill-chips' aria-label={copy.title}>
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <span className='skill-chip'>{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className='skills-note' data-reveal style={{ '--reveal-delay': '360ms' }}>
          <Sparkles className='h-3.5 w-3.5 text-violet' strokeWidth={1.7} aria-hidden='true' />
          {t.skills.note}
        </p>
      </div>
    </section>
  );
}
