import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import GithubMark from './GithubMark';

const GITHUB_PROFILE = 'https://github.com/nouralachgar-cyber';

const PROJECTS = [
  {
    id: 'matchmycv',
    title: 'MatchMyCV',
    category: 'AI & Automation',
    year: '2025',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80',
    github: 'https://github.com/nouralachgar-cyber/ai-cv-analyzer',
    featured: true,
  },
  {
    id: 'edufanor',
    title: 'EduFanor',
    category: 'Education',
    year: '2025',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    github: '',
  },
  {
    id: 'nebras',
    title: 'Nebras Coffee',
    category: 'Hospitality',
    year: '2024',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    github: '',
  },
  {
    id: 'bloom',
    title: 'BLOOM (Igeddigen)',
    category: 'E-commerce',
    year: '2024',
    tags: ['React', 'Tailwind CSS'],
    image:
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1400&q=80',
    github: '',
  },
];

function ProjectCard({ project, index, t, featured = false }) {
  const href = project.github || GITHUB_PROFILE;
  const hasSource = Boolean(project.github);
  const description = t.projects.descriptions[project.id];

  return (
    <article
      className={'project-card' + (featured ? ' project-card--feature' : '')}
      data-reveal
      style={{ '--reveal-delay': 120 + index * 90 + 'ms' }}
    >
      <div className='project-media'>
        <img
          src={project.image}
          alt={`${project.title} — ${t.projects.previewAlt}`}
          loading={featured ? 'eager' : 'lazy'}
          decoding='async'
        />
        <div className='project-overlay' aria-hidden='true' />

        <div className='project-media-top'>
          <span className='project-index' aria-hidden='true' dir='ltr'>
            0{index + 1}
          </span>
          {featured ? (
            <span className='project-badge'>
              <span className='project-badge-dot' aria-hidden='true' />
              {t.projects.featured}
            </span>
          ) : null}
        </div>

        <div className='project-media-bottom'>
          <span className='project-category'>{project.category}</span>
          <span className='project-year' dir='ltr'>
            {project.year}
          </span>
        </div>
      </div>

      <div className='project-body'>
        <div className='project-title-row'>
          <h3 className='project-title'>{project.title}</h3>
        </div>

        <p className='project-desc'>{description}</p>

        <div className='project-tags' aria-label={t.projects.techLabel}>
          {project.tags.map((tag) => (
            <span key={tag} className='project-tech'>
              {tag}
            </span>
          ))}
        </div>

        <div className='project-foot'>
          <span className='project-cta'>
            {hasSource ? t.projects.viewGithub : t.projects.viewCase}
            <ArrowUpRight className='h-3.5 w-3.5' strokeWidth={1.8} aria-hidden='true' />
          </span>
          <span className='project-foot-rule' aria-hidden='true' />
          <GithubMark className='project-gh h-4 w-4' aria-hidden='true' />
        </div>
      </div>

      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        aria-label={`${project.title} — ${hasSource ? t.projects.viewGithub : t.projects.viewCase}`}
        className='project-stretch-link'
      />
    </article>
  );
}

export default function Projects({ t }) {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id='projects' aria-labelledby='projects-title' className='section section--deep'>
      <span className='section-rule top-0' aria-hidden='true' />

      <svg
        viewBox='0 0 200 200'
        width='240'
        height='240'
        fill='none'
        aria-hidden='true'
        focusable='false'
        className='geo-mark absolute -top-16 right-0 hidden rotate-12 lg:block'
      >
        <rect x='40' y='40' width='120' height='120' stroke='currentColor' strokeWidth='1' />
        <rect
          x='40'
          y='40'
          width='120'
          height='120'
          stroke='currentColor'
          strokeWidth='1'
          transform='rotate(45 100 100)'
        />
      </svg>

      <div className='shell relative'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            <div className='eyebrow-row' data-reveal style={{ '--reveal-delay': '40ms' }}>
              <span className='section-index' aria-hidden='true' dir='ltr'>
                {t.projects.index}
              </span>
              <span className='section-eyebrow'>{t.projects.eyebrow}</span>
              <span
                className='hairline'
                data-reveal='line'
                aria-hidden='true'
                style={{ '--reveal-delay': '240ms' }}
              />
            </div>

            <h2
              id='projects-title'
              className='section-title mt-5'
              data-reveal
              style={{ '--reveal-delay': '100ms' }}
            >
              {t.projects.heading}{' '}
              <em className='accent-italic'>{t.projects.headingAccent}</em>
            </h2>

            <p className='section-lede' data-reveal style={{ '--reveal-delay': '200ms' }}>
              {t.projects.subtext}
            </p>
          </div>

          <p className='caption-small hidden shrink-0 md:block' data-reveal>
            {t.projects.projectLabel} — 04
          </p>
        </div>

        <div className='mt-10 lg:mt-12'>
          <ProjectCard project={featured} index={0} t={t} featured />
        </div>

        <div
          className='projects-grid projects-grid'
          aria-label={t.projects.galleryLabel}
        >
          {rest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} t={t} />
          ))}
        </div>

        <div className='projects-foot' data-reveal style={{ '--reveal-delay': '160ms' }}>
          <p className='projects-count' dir='ltr'>
            © 2024 — 2025 / 04
          </p>
          <a
            href={GITHUB_PROFILE}
            target='_blank'
            rel='noreferrer'
            className='projects-link'
          >
            {t.projects.more}
            <GithubMark className='h-3.5 w-3.5' aria-hidden='true' />
          </a>
        </div>
      </div>
    </section>
  );
}
