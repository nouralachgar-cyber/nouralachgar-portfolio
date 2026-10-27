import { useLayoutEffect } from 'react';

const revealSelector = '[data-reveal]';

export default function useScrollReveal() {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll(revealSelector));
    if (!elements.length) return undefined;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const pending = [];

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isAlreadyVisible = rect.top < viewportHeight * 0.96 && rect.bottom > 0;

      element.classList.add('reveal-init');

      if (isAlreadyVisible) {
        element.classList.add('is-visible');
      } else {
        pending.push(element);
      }
    });

    if (!pending.length) return undefined;

    let observer;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -7% 0px', threshold: 0.08 }
      );

      pending.forEach((element) => observer.observe(element));
    } catch {
      pending.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    return () => observer.disconnect();
  }, []);
}
