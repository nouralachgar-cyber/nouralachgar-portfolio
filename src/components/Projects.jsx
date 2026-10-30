import React from 'react';
import './Projects.css';

const projects = [
  {
    id: 'matchmycv',
    title: 'MatchMyCV',
    category: 'AI & Automation',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    github: 'https://github.com/nouralachgar-cyber/ai-cv-analyzer',
    demo: '#',
    variant: 'a'
  },
  {
    id: 'edufanor',
    title: 'EduFanor',
    category: 'Education',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514',
    github: '#',
    demo: '#',
    variant: 'b'
  },
  {
    id: 'nebras',
    title: 'Nebras Coffee',
    category: 'Hospitality',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    github: '#',
    demo: '#',
    variant: 'c'
  },
  {
    id: 'bloom',
    title: 'BLOOM (Igeddigen)',
    category: 'E-commerce',
    tags: ['React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd',
    github: '#',
    demo: '#',
    variant: 'd'
  }
];

export default function Projects({ t }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="projects-section section-pad section-alt relative overflow-hidden"
    >
      <header className="projects-head">
        <div className="projects-eyebrow-row">
          <span className="section-index" aria-hidden="true" dir="ltr">
            {t.projects.index}
          </span>
          <span className="projects-eyebrow-dot" aria-hidden="true" />
          <span className="section-eyebrow">{t.projects.eyebrow}</span>
          <span className="hairline" aria-hidden="true" />
          <svg className="projects-eyebrow-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        <h2 id="projects-title" className="section-title projects-title">
          <span className="projects-title-line">
            <span className="projects-title-inner">{t.projects.heading}</span>
          </span>
          <span className="projects-title-line projects-title-line--accent">
            <span className="projects-title-inner">
              <em className="projects-title-accent">{t.projects.headingAccent}</em>
            </span>
          </span>
        </h2>

        <p className="body-copy projects-intro">{t.projects.subtext}</p>
      </header>

      <div className="projects-gallery">
        <div className="projects-wall-nav" role="group" aria-label={t.projects.indexNav}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card reveal-init"
              data-index={index}
              data-reveal
              style={{ '--reveal-delay': `${index * 120 + 200}ms` }}
            >
              {/* Large project image */}
              <div className="project-image" style={{
                backgroundImage: `url('${project.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <div className="project-overlay" />
              </div>

              {/* Project info - reveals on hover */}
              <div className="project-info">
                <span className="project-tag">{project.tags[0]}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{t.projects.descriptions[project.id]}</p>
                <div className="project-technologies">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tech inline-block px-2.5 py-0.5 rounded text-[0.55rem] font-medium transition-colors duration-300 hover:bg-cyan/10 hover:text-cyan dark:hover:bg-navy-deep/30 dark:hover:text-cyan">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link btn btn-primary mt-4"
                >
                  VIEW PROJECT
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}