import React from 'react';
import { Code, Layout, Palette } from 'lucide-react';
import SectionHeading from './SectionHeading';

const skillCategories = [
  {
    key: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces built with care for layout, motion, and clarity.',
    colors: { bg: 'rgba(16, 27, 45, 0.6)', border: '1px solid rgba(201, 130, 98, 0.15)' },
    icons: [Layout, Code],
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'React Router', 'Framer Motion', 'Tailwind CSS']
  },
  {
    key: 'creative',
    title: 'Creative',
    subtitle: 'Animations and interactive experiences.',
    colors: { bg: 'rgba(139, 94, 246, 0.15)', border: '1px solid rgba(139, 94, 246, 0.2)' },
    icons: [Code],
    skills: ['GSAP', 'Animations', 'Three.js', 'Creative UI']
  },
  {
    key: 'tools',
    title: 'Tools',
    subtitle: 'A focused workflow from the first sketch to the final build.',
    colors: { bg: 'rgba(214, 167, 122, 0.1)', border: '1px solid rgba(214, 167, 122, 0.2)' },
    icons: [Palette],
    skills: ['Git', 'GitHub', 'Figma', 'VS Code']
  }
];

export default function Skills({ t }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          index={t.skills.index}
          eyebrow={t.skills.eyebrow}
          heading={t.skills.heading}
          accent={t.skills.headingAccent}
          description={t.skills.subtext}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div
              key={category.key}
              className="group rounded-xl border transition-all duration-300 hover:border-navy-subtle hover:bg-navy-deep/30"
              style={{
                borderColor: category.colors.border,
                background: category.colors.bg,
              }}
            >
              {/* Category header with subtle motion */}
              <div className="flex items-center gap-3 mb-4 reveal-init" data-reveal style={{ '--reveal-delay': `${index * 100}ms` }}>
                <span className="h-6 w-6 rounded-lg bg-navy-deep/30 flex items-center justify-center">
                  {category.key === 'frontend' && <Layout className="h-4 w-4 text-cyan" />}
                  {category.key === 'creative' && <Code className="h-4 w-4 text-violet" />}
                  {category.key === 'tools' && <Palette className="h-4 w-4 text-terracotta" />}
                </span>
                <div>
                  <h3 className="font-editorial text-[1.25rem] text-navy-deep dark:text-ivory">
                    {category.title}
                  </h3>
                  <p className="text-[0.75rem] text-muted/50 dark:text-muted/50">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Skills chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.65rem] font-medium transition-all duration-300 hover:border-cyan hover:bg-cyan/10 hover:text-cyan dark:hover:bg-navy-deep/30 dark:hover:text-cyan"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}