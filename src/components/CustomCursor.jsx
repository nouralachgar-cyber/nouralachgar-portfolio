"use client";

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const dotRef = useRef(null);
  const linkRef = useRef(null);

  // Initialize cursor elements
  useEffect(() => {
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    
    dot.className = 'cursor-dot';
    outline.className = 'cursor-dot-outline';
    
    document.body.appendChild(dot);
    document.body.appendChild(outline);
    
    dotRef.current = dot;
    linkRef.current = outline;

    let timeout = 0;
    
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleEnter = () => {
      setExpanded(true);
      clearTimeout(timeout);
    };

    const handleLeave = () => {
      setExpanded(false);
      timeout = setTimeout(() => {
        setExpanded(false);
      }, 100);
    };

    // Hide on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 1;
    if (isTouchDevice) {
      dot.style.display = 'none';
      outline.style.display = 'none';
      return;
    }

    const onMouseMove = (e) => {
      updatePosition(e);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseleave', handleLeave);
      document.body.removeChild(dot);
      document.body.removeChild(outline);
    };
  }, []);

  return (
    <>
      <div
        style={{
          left: position.x,
          top: position.y,
          ...(expanded ? { width: '24px', height: '24px', borderWidth: '1px' } : { width: '8px', height: '8px' }),
          opacity: expanded ? 0.6 : 1,
        }}
        className="cursor-dot-outline"
      />
    </>
  );
}