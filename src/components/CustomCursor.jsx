import React, { useEffect, useRef } from 'react';

/**
 * Decorative dual cursor: an instant cyan dot and a lagging ring that
 * expands over interactive elements. The native cursor remains available;
 * both layers are hidden on coarse pointers via CSS.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let position = { x: -100, y: -100 };
    let ringPosition = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const render = () => {
      dot.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      ringPosition = {
        x: ringPosition.x + (position.x - ringPosition.x) * 0.18,
        y: ringPosition.y + (position.y - ringPosition.y) * 0.18,
      };
      render();
      frame = window.requestAnimationFrame(tick);
    };

    const onMouseMove = (event) => {
      position = { x: event.clientX, y: event.clientY };

      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringPosition = { ...position };
        frame = window.requestAnimationFrame(tick);
      }
    };

    const onOver = (event) => {
      const target = event.target;
      const interactive =
        target instanceof Element &&
        target.closest('a, button, [role="button"], input, textarea, select, label');

      ring.classList.toggle('is-active', Boolean(interactive));
    };

    const onMouseLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className='cursor-dot'
        style={{ opacity: 0 }}
        aria-hidden='true'
      />
      <div
        ref={ringRef}
        className='cursor-ring'
        style={{ opacity: 0, transitionProperty: 'width, height, border-color, background-color, opacity' }}
        aria-hidden='true'
      />
    </>
  );
}
