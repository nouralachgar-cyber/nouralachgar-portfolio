import React from 'react';

/**
 * Shared section header: index chip, eyebrow, hairline, editorial title
 * and an optional lede. Reveal delays stay consistent across sections.
 */
export default function SectionHeading({
  id,
  index,
  eyebrow,
  heading,
  accent,
  description,
  className = '',
}) {
  return (
    <div className={className}>
      <div className='eyebrow-row' data-reveal style={{ '--reveal-delay': '40ms' }}>
        <span className='section-index' aria-hidden='true' dir='ltr'>
          {index}
        </span>
        <span className='section-eyebrow'>{eyebrow}</span>
        <span
          className='hairline'
          data-reveal='line'
          aria-hidden='true'
          style={{ '--reveal-delay': '240ms' }}
        />
      </div>

      <h2
        id={id}
        className='section-title mt-5'
        data-reveal
        style={{ '--reveal-delay': '100ms' }}
      >
        {heading}
        {accent ? (
          <>
            {' '}
            <em className='accent-italic'>{accent}</em>
          </>
        ) : null}
      </h2>

      {description ? (
        <p className='section-lede' data-reveal style={{ '--reveal-delay': '200ms' }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
