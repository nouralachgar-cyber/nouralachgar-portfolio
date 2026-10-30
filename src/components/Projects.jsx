import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GithubMark from './GithubMark';

const PROJECTS = [
  {
    id: 'matchmycv',
    title: 'MatchMyCV',
    category: 'AI & Automation',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1400&q=80',
    github: 'https://github.com/nouralachgar-cyber/ai-cv-analyzer',
    span: 'lg:col-span-7',
  },
  {
    id: 'edufanor',
    title: 'EduFanor',
    category: 'Education',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    github: '',
    span: 'lg:col-span-5',
  },
  {
    id: 'nebras',
    title: 'Nebras Coffee',
    category: 'Hospitality',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    github: '',
    span: 'lg:col-span-5',
  },
  {
    id: 'bloom',
    title: 'BLOOM (Igeddigen)',
    category: 'E-commerce',
    tags: ['React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1400&q=80',
    github: '',
    span: 'lg:col-span-7',
  },
];

function ProjectCard({ project, index, t }) {
  const href = project.github || 'https://github.com/nouralachgar-cyber';
  const isExternal = Boolean(project.github);

  return (
    <article
      className='project-card reveal-init h-full'
      data-reveal
      data-index={index}
      style={{ '--reveal-delay': index * 120 + 120 + 'ms' }}
    >
      <div className='project-media'>
        <img
          src={project.image}
          alt={`${project.title} — ${t.projects.previewAlt}`}
          loading='lazy'
          decoding='async'
        />
        <div className='project-overlay' aria-hidden='true' />

        {/* Floating index + category on media */}
        <span
          aria-hidden='true'
          className='absolute left-4 top-4 z-[2] rounded-md border border-ivory/25 bg-navy-primary/70 px-2 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-ivory/90 backdrop-blur-sm'
          dir='ltr'
        >
          0{index + 1}
        </span>
        <span className='absolute bottom-4 left-4 z-[2] inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-navy-primary/60 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-cyan backdrop-blur-sm'>
          {project.category}
        </span>

        {/* Hover accent glow */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700 group-hover:opacity-100'
          style={{
            boxShadow: 'inset 0 0 0 1px rgb(var(--accent-cyan-rgb) / 0.28), inset 0 -80px 120px -90px rgb(var(--accent-champagne-rgb) / 0.35)',
          }}
        />
      </div>

      <div className='flex flex-1 flex-col p-6 lg:p-7'>
        <h3 className='font-editorial text-[1.5rem] leading-tight text-ink lg:text-[1.7rem]'>
          {project.title}
        </h3>
        <p className='mt-2.5 text-[0.9rem] leading-relaxed text-muted'>
          {t.projects.descriptions[project.id]}
        </p>

        <div className='project-tags mt-5 lg:mt-6'>
          {project.tags.map((tag) => (
            <span key={tag} className='project-tech'>
              {tag}
            </span>
          ))}
        </div>

        {/* Visible action row (spans are decorative; the real link covers the card) */}
        <div className='mt-6 flex items-center gap-4 pt-1'>
          <span className='inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-300 group-hover:text-cyan'>
            {isExternal ? t.projects.viewGithub : t.projects.demo}
            <ArrowUpRight
              className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              strokeWidth={1.8}
              aria-hidden='true'
            />
          </span>
          <span className='h-px flex-1 bg-ink/10 dark:bg-ivory/10' aria-hidden='true' />
          <GithubMark className='h-4 w-4 text-muted transition-colors duration-300 group-hover:text-cyan' aria-hidden='true' />
        </div>
      </div>

      {/* Full-card stretched link (single focus target) */}
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        aria-label={`${project.title} — ${isExternal ? t.projects.viewGithub : t.projects.viewDemo}`}
        className='absolute inset-0 z-[5] rounded-[1.2rem]'
      />
    </article>
  );
}

export default function Projects({ t }) {
  return (
    <section
      id='projects'
      aria-labelledby='projects-title'
      className='section-alt section-pad relative overflow-hidden'
    >
      {/* Ambient geometry */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -top-24 right-0 hidden rotate-12 text-champagne/[0.12] lg:block'
      >
        <svg viewBox='0 0 200 200' width='260' height='260' fill='none' focusable='false'>
          <rect x='40' y='40' width='120' height='120' stroke='currentColor' strokeWidth='1' />
          <rect x='40' y='40' width='120' height='120' stroke='currentColor' strokeWidth='1' transform='rotate(45 100 100)' />
        </svg>
      </div>

      <div className='shell relative'>
        <div className='flex items-center gap-4' data-reveal style={{ '--reveal-delay': '40ms' }}>
          <span className='section-index' dir='ltr'>{t.projects.index}</span>
          <span className='section-eyebrow'>{t.projects.eyebrow}</span>
          <span className='hairline' aria-hidden='true' data-reveal='line' style={{ '--reveal-delay': '240ms' }} />
        </div>

        <h2 id='projects-title' className='section-title mt-5' data-reveal='mask' style={{ '--reveal-delay': '100ms' }}>
          {t.projects.heading}{' '}
          <em className='accent-italic'>{t.projects.headingAccent}</em>
        </h2>

        <p className='body-copy mt-5 max-w-xl' data-reveal style={{ '--reveal-delay': '200ms' }}>
          {t.projects.subtext}
        </p>

        <div
          className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7 lg:pt-4'
          data-reveal
          aria-label={t.projects.galleryLabel}
        >
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={'group ' + project.span}>
              <ProjectCard project={project} index={index} t={t} />
            </div>
          ))}
        </div>

        <div className='mt-12 flex flex-wrap items-center justify-between gap-4' data-reveal style={{ '--reveal-delay': '200ms' }}>
          <p className='caption-small'>{t.projects.projectLabel} — 04</p>
          <a
            href='https://github.com/nouralachgar-cyber'
            target='_blank'
            rel='noreferrer'
            className='group inline-flex items-center gap-3 rounded-full border border-ink/12 px-5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan dark:border-ivory/15'
          >
            {t.projects.more}
            <GithubMark className='h-3.5 w-3.5' aria-hidden='true' />
          </a>
        </div>
      </div>
    </section>
  );
}
