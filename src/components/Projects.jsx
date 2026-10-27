import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Asterisk, MoveHorizontal } from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const projects = [
  {
    id: 'matchmycv',
    title: 'MatchMyCV',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    github: 'https://github.com/nouralachgar-cyber/ai-cv-analyzer',
    demo: '#',
    variant: 'a'
  },
  {
    id: 'edufanor',
    title: 'EduFanor',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514',
    github: '#',
    demo: '#',
    variant: 'b'
  },
  {
    id: 'nebras',
    title: 'Nebras Coffee',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    github: '#',
    demo: '#',
    variant: 'c'
  },
  {
    id: 'bloom',
    title: 'BLOOM (Igeddigen)',
    tags: ['React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd',
    github: '#',
    demo: '#',
    variant: 'd'
  }
];

const imageQuery = '?q=82&auto=format&fit=crop';
const pad = (value) => String(value).padStart(2, '0');

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function Projects({ t }) {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollFrameRef = useRef(0);
  const progressFillRef = useRef(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startLeft: 0,
    rtl: false,
    pointerId: null
  });

  const [inView, setInView] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(() =>
    projects.map(() => prefersReducedMotion() || typeof IntersectionObserver === 'undefined')
  );

  const total = pad(projects.length);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || inView) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIndexes = [];

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          if (!Number.isNaN(index)) visibleIndexes.push(index);
          observer.unobserve(entry.target);
        });

        if (!visibleIndexes.length) return;

        setRevealed((current) => {
          const next = [...current];
          let changed = false;

          visibleIndexes.forEach((index) => {
            if (next[index]) return;
            next[index] = true;
            changed = true;
          });

          return changed ? next : current;
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -4% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const syncRail = useCallback(() => {
    if (scrollFrameRef.current) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      const rail = railRef.current;
      if (!rail) return;

      const railRect = rail.getBoundingClientRect();
      const railCenter = railRect.left + railRect.width / 2;
      let closest = 0;
      let smallest = Infinity;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - railCenter);
        if (distance < smallest) {
          smallest = distance;
          closest = index;
        }
      });

      setActive((current) => (current === closest ? current : closest));

      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const progress = maxScroll > 0 ? Math.min(1, Math.abs(rail.scrollLeft) / maxScroll) : 0;

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
      }
    });
  }, []);

  useEffect(() => {
    const kickoff = window.requestAnimationFrame(syncRail);

    const handleResize = () => syncRail();

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(kickoff);
      window.removeEventListener('resize', handleResize);
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = 0;
      }
    };
  }, [syncRail, t]);

  useEffect(() => {
    const stopDrag = () => {
      const drag = dragRef.current;
      const rail = railRef.current;

      if (!drag.active) return;

      drag.active = false;
      if (rail) rail.classList.remove('is-dragging');

      if (drag.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 120);
      }
    };

    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);

    return () => {
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
    };
  }, []);

  const goToProject = useCallback((index) => {
    const target = Math.max(0, Math.min(projects.length - 1, index));
    const rail = railRef.current;
    const card = cardsRef.current[target];

    if (!rail || !card) return;

    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left + cardRect.width / 2 - (railRect.left + railRect.width / 2);

    rail.scrollBy({
      left: offset,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });

    setActive(target);
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target.closest('a, button')) return;

    const rail = railRef.current;
    if (!rail) return;

    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startLeft: rail.scrollLeft,
      rtl: window.getComputedStyle(rail).direction === 'rtl',
      pointerId: event.pointerId
    };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    const rail = railRef.current;

    if (!drag.active || !rail) return;

    const delta = event.clientX - drag.startX;

    if (!drag.moved) {
      if (Math.abs(delta) < 7) return;
      drag.moved = true;
      rail.classList.add('is-dragging');

      try {
        rail.setPointerCapture(event.pointerId);
      } catch {}
    }

    event.preventDefault();
    rail.scrollLeft = drag.rtl ? drag.startLeft + delta : drag.startLeft - delta;
  };

  const handleRailClickCapture = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const handleTiltMove = (event) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
    if (railRef.current?.classList.contains('is-dragging')) return;

    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty('--plate-rx', `${(-py * 4.6).toFixed(2)}deg`);
    node.style.setProperty('--plate-ry', `${(px * 5.4).toFixed(2)}deg`);
    node.style.setProperty('--plate-mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty('--plate-my', `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const handleTiltLeave = (event) => {
    const node = event.currentTarget;
    node.style.setProperty('--plate-rx', '0deg');
    node.style.setProperty('--plate-ry', '0deg');
    node.style.setProperty('--plate-mx', '50%');
    node.style.setProperty('--plate-my', '50%');
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className={`projects-section section-pad section-alt relative overflow-hidden ${
        inView ? 'is-inview' : ''
      }`}
    >
      <div className="projects-ambient" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="shell projects-shell">
        <header className="projects-head">
          <div className="projects-eyebrow-row">
            <span className="section-index" aria-hidden="true" dir="ltr">
              {t.projects.index}
            </span>
            <span className="projects-eyebrow-dot" aria-hidden="true" />
            <span className="section-eyebrow">{t.projects.eyebrow}</span>
            <span className="hairline" aria-hidden="true" />
            <Asterisk className="projects-eyebrow-mark" aria-hidden="true" />
          </div>

          <div className="projects-head-grid">
            <h2 id="projects-title" className="section-title projects-title">
              <span className="projects-title-line">
                <span className="projects-title-inner" style={{ '--line-index': 0 }}>
                  {t.projects.heading}
                </span>
              </span>
              <span className="projects-title-line projects-title-line--accent">
                <span className="projects-title-inner" style={{ '--line-index': 1 }}>
                  <em className="projects-title-accent">{t.projects.headingAccent}</em>
                </span>
              </span>
            </h2>

            <div className="projects-head-aside">
              <p className="body-copy projects-intro">{t.projects.subtext}</p>

              <div className="projects-head-meta" aria-hidden="true">
                <span className="projects-head-counter" dir="ltr">
                  {pad(active + 1)} <span>/</span> {total}
                </span>
                <span className="projects-head-meta-line" />
                <span className="projects-head-meta-label">{t.projects.indexNav}</span>
              </div>
            </div>
          </div>
        </header>

        <div
          className="projects-gallery"
          style={{ '--projects-watermark': `"${t.projects.index}"` }}
        >
          <div className="projects-wall-head">
            <span className="projects-wall-label">
              <MoveHorizontal aria-hidden="true" />
              {t.projects.indexNav}
            </span>

            <div className="projects-wall-nav" role="group" aria-label={t.projects.indexNav}>
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className="projects-index"
                  aria-current={active === index ? 'true' : undefined}
                  aria-label={`${t.projects.indexNav}: ${project.title}`}
                  onClick={() => goToProject(index)}
                >
                  <span className="projects-index-num" dir="ltr">
                    {pad(index + 1)}
                  </span>
                  <span className="projects-index-title">
                    <bdi>{project.title}</bdi>
                  </span>
                </button>
              ))}
            </div>

            <div className="projects-wall-controls">
              <span className="projects-wall-live" aria-hidden="true" dir="ltr">
                {pad(active + 1)}
                <span className="projects-wall-live-line" />
                {total}
              </span>

              <button
                type="button"
                className="projects-arrow"
                aria-label={t.projects.prev}
                disabled={active === 0}
                onClick={() => goToProject(active - 1)}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="projects-arrow"
                aria-label={t.projects.next}
                disabled={active === projects.length - 1}
                onClick={() => goToProject(active + 1)}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="projects-rail"
            ref={railRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label={t.projects.galleryLabel}
            aria-describedby="projects-gallery-hint"
            onScroll={syncRail}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onClickCapture={handleRailClickCapture}
          >
            {projects.map((project, index) => {
              const hasGithub = project.github !== '#';
              const hasDemo = project.demo !== '#';
              const hasLinks = hasGithub || hasDemo;
              const imageSrc = `${project.image}${imageQuery}`;

              return (
                <article
                  key={project.id}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  data-index={index}
                  aria-labelledby={`project-title-${project.id}`}
                  className={`project-plate project-plate--${project.variant} ${
                    index % 2 === 1 ? 'project-plate--flip' : ''
                  } ${active === index ? 'is-active' : ''} ${
                    revealed[index] ? 'is-revealed' : ''
                  }`}
                >
                  <div className="plate-visual">
                    <span className="plate-ghost-index" aria-hidden="true" dir="ltr">
                      {pad(index + 1)}
                    </span>

                    <div className="plate-echo" aria-hidden="true">
                      <img
                        src={`${imageSrc}&w=800`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        onError={(event) => {
                          event.currentTarget.style.opacity = '0';
                        }}
                      />
                    </div>

                    <div
                      className="plate-print"
                      onPointerMove={handleTiltMove}
                      onPointerLeave={handleTiltLeave}
                    >
                      <div className="plate-image">
                        <span className="plate-fallback" aria-hidden="true">
                          {project.title.charAt(0)}
                        </span>

                        <img
                          src={`${imageSrc}&w=1400`}
                          srcSet={`${imageSrc}&w=800 800w, ${imageSrc}&w=1400 1400w, ${imageSrc}&w=1800 1800w`}
                          sizes="(min-width: 1024px) 58vw, 78vw"
                          alt={`${project.title} — ${t.projects.previewAlt}`}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          onError={(event) => {
                            event.currentTarget.style.opacity = '0';
                          }}
                        />
                      </div>

                      <span className="plate-glare" aria-hidden="true" />

                      <div className="plate-caption" aria-hidden="true">
                        <span>
                          <bdi>{project.tags[0]}</bdi>
                        </span>
                        <span dir="ltr">
                          {pad(index + 1)} / {total}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="plate-info">
                    <p className="plate-kicker">
                      <span>{t.projects.projectLabel}</span>
                      <span dir="ltr">{pad(index + 1)}</span>
                    </p>

                    <h3 id={`project-title-${project.id}`} className="plate-title">
                      <bdi>{project.title}</bdi>
                    </h3>

                    <p className="plate-desc">{t.projects.descriptions[project.id]}</p>

                    <ul className="plate-tags" aria-label={t.projects.techLabel}>
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <bdi>{tag}</bdi>
                        </li>
                      ))}
                    </ul>

                    {hasLinks ? (
                      <div className="plate-actions">
                        {hasGithub ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="plate-action"
                            aria-label={`${t.projects.viewGithub}: ${project.title}`}
                          >
                            <span className="plate-action-icon">
                              <GithubIcon />
                            </span>
                            <span className="plate-action-label">{t.projects.github}</span>
                          </a>
                        ) : null}

                        {hasDemo ? (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="plate-action"
                            aria-label={`${t.projects.viewDemo}: ${project.title}`}
                          >
                            <span className="plate-action-icon">
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="plate-action-label">{t.projects.demo}</span>
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="projects-wall-foot">
            <div className="projects-progress" aria-hidden="true">
              <span className="projects-progress-count">{pad(active + 1)}</span>
              <span className="projects-progress-track">
                <span className="projects-progress-fill" ref={progressFillRef} />
              </span>
              <span className="projects-progress-count">{total}</span>
            </div>

            <p className="projects-wall-hint" id="projects-gallery-hint">
              <MoveHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              {t.projects.hint}
            </p>

            <a
              href="https://github.com/nouralachgar-cyber"
              target="_blank"
              rel="noreferrer"
              className="projects-wall-more"
            >
              <span>{t.projects.more}</span>
              <span className="projects-wall-more-icon">
                <GithubIcon className="h-4 w-4" />
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
