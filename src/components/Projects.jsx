import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import GithubMark from './GithubMark';

const GITHUB_PROFILE = 'https://github.com/nouralachgar-cyber';

const PROJECTS = [
  {
    id: 'matchmycv',
    title: 'MatchMyCV',
    category: 'AI & Automation',
    year: '2026',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    github: 'https://github.com/nouralachgar-cyber/ai-cv-analyzer',
    demo: '',
    art: 'cyan',
    featured: true,
  },
  {
    id: 'edufanor',
    title: 'EduFanor',
    category: 'Education',
    year: '2026',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/nouralachgar-cyber/EduFanor',
    demo: 'https://edu-fanor.vercel.app',
    art: 'blue',
  },
  {
    id: 'nebras',
    title: 'Nebras Coffee',
    category: 'Hospitality',
    year: '2026',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    github: '',
    demo: '',
    art: 'champagne',
  },
  {
    id: 'bloom',
    title: 'BLOOM (Igeddigen)',
    category: 'E-commerce',
    year: '2026',
    tags: ['React', 'Tailwind CSS'],
    github: 'https://github.com/nouralachgar-cyber/harawkan-tulips',
    demo: 'https://harawkan-tulips.vercel.app',
    art: 'violet',
  },
];

function ProjectCard({ project, index, t, featured = false }) {
  const description = t.projects.descriptions[project.id];

  return (
    <article
      className={'project-card' + (featured ? ' project-card--feature' : '')}
      data-reveal
      style={{ '--reveal-delay': 120 + index * 90 + 'ms' }}
    >
      <div className='project-media'>
        <div className={`project-art project-art--${project.art}`} aria-hidden='true'>
          <span className='project-art-grid' />
          <span className='project-art-orbit' />
          <span className='project-art-type'>{project.title}</span>
        </div>
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

        <div className='project-actions'>
          {project.github ? (
            <a
              href={project.github}
              target='_blank'
              rel='noreferrer'
              className='project-action project-action--github'
              aria-label={`${project.title}: ${t.projects.viewGithub}`}
            >
              <GithubMark className='h-4 w-4' />
              <span>{t.projects.github}</span>
            </a>
          ) : (
            <span className='project-action project-action--unavailable' aria-disabled='true'>
              {t.projects.github} — unavailable
            </span>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target='_blank'
              rel='noreferrer'
              className='project-action project-action--demo'
              aria-label={`${project.title}: ${t.projects.viewDemo}`}
            >
              <ExternalLink className='h-4 w-4' strokeWidth={1.8} />
              <span>{t.projects.demo}</span>
            </a>
          ) : (
            <span className='project-action project-action--unavailable' aria-disabled='true'>
              {t.projects.demo} — unavailable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ t }) {
  const trackRef = useRef(null);
  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.project-card');
    const distance = card ? card.getBoundingClientRect().width + 24 : 420;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

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

        <div className='projects-track-wrap mt-10 lg:mt-12'>
          <div
            ref={trackRef}
            className='projects-track'
            aria-label={t.projects.galleryLabel}
          >
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                t={t}
                featured={index === 0}
              />
            ))}
          </div>
        </div>

        <div className='projects-foot' data-reveal style={{ '--reveal-delay': '160ms' }}>
          <p className='projects-count' dir='ltr'>
            © 2026 / 04
          </p>
          <div className='projects-controls'>
            <button type='button' className='icon-btn' onClick={() => scrollTrack(-1)} aria-label={t.projects.prev}>
              <ArrowLeft className='h-4 w-4' aria-hidden='true' />
            </button>
            <button type='button' className='icon-btn' onClick={() => scrollTrack(1)} aria-label={t.projects.next}>
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            </button>
            <a href={GITHUB_PROFILE} target='_blank' rel='noreferrer' className='projects-link'>
              {t.projects.more}
              <GithubMark className='h-3.5 w-3.5' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
