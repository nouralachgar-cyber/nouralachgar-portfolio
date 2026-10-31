import React, { useState } from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';

const CONTACT_EMAIL = 'nlachgar12@gmail.com';
const GITHUB_URL = 'https://github.com/nouralachgar-cyber';
const LINKEDIN_URL = 'https://linkedin.com';

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
    </svg>
  );
}

export default function Contact({ t }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedMessage = values.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = t.contact.errors.name;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = t.contact.errors.email;
    }

    if (trimmedMessage.length < 10) {
      nextErrors.message = t.contact.errors.message;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      return;
    }

    const subject = encodeURIComponent(`${t.contact.mailSubject} ${trimmedName}`);
    const body = encodeURIComponent(`${trimmedMessage}\n\n— ${trimmedName}\n${trimmedEmail}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('success');
  };

  const errorText = (field) =>
    errors[field] ? (
      <p className='contact-error' role='alert'>
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id='contact' aria-labelledby='contact-title' className='section section--deep'>
      <span className='section-rule top-0' aria-hidden='true' />

      <div className='shell relative'>
        <div className='eyebrow-row' data-reveal style={{ '--reveal-delay': '40ms' }}>
          <span className='section-index' aria-hidden='true' dir='ltr'>
            {t.contact.index}
          </span>
          <span className='section-eyebrow'>{t.contact.eyebrow}</span>
          <span
            className='hairline'
            data-reveal='line'
            aria-hidden='true'
            style={{ '--reveal-delay': '240ms' }}
          />
        </div>

        <div className='contact-grid'>
          {/* Closing statement */}
          <div>
            <h2
              id='contact-title'
              className='contact-headline mt-5'
              data-reveal
              style={{ '--reveal-delay': '100ms' }}
            >
              {t.contact.heading}{' '}
              <em className='accent-italic'>{t.contact.headingAccent}</em>
            </h2>

            <p className='contact-signal' data-reveal style={{ '--reveal-delay': '160ms' }}>
              “{t.hero.signal}”
            </p>

            <p className='contact-direct' data-reveal style={{ '--reveal-delay': '220ms' }}>
              {t.contact.subtext}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className='contact-mail'
              aria-label={t.a11y.email}
              data-reveal
              style={{ '--reveal-delay': '280ms' }}
            >
              <Mail className='h-4 w-4' strokeWidth={1.7} aria-hidden='true' />
              <span dir='ltr'>{CONTACT_EMAIL}</span>
            </a>

            <div className='contact-pills' data-reveal style={{ '--reveal-delay': '340ms' }}>
              <span className='contact-pill contact-pill--status'>
                <span className='hero-eyebrow-dot' aria-hidden='true' />
                {t.contact.availability}
              </span>

              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noreferrer'
                aria-label={t.a11y.viewGithub}
                className='contact-pill'
              >
                GitHub
              </a>

              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noreferrer'
                aria-label={t.a11y.viewLinkedin || t.contact.linkedinLabel}
                className='contact-pill'
              >
                <LinkedinIcon className='h-3.5 w-3.5' />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Conversation form */}
          <div className='contact-card' data-reveal style={{ '--reveal-delay': '200ms' }}>
            <div className='contact-card-head'>
              <h3 className='contact-card-title'>{t.contact.formTitle}</h3>
              <Sparkles className='h-4 w-4 shrink-0' strokeWidth={1.7} aria-hidden='true' />
            </div>

            <p className='contact-card-note'>{t.contact.formNote}</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className='contact-field'>
                <label htmlFor='contact-name' className='contact-label'>
                  {t.contact.name}
                </label>
                <input
                  id='contact-name'
                  name='name'
                  type='text'
                  required
                  autoComplete='name'
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder={t.contact.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  className='contact-input'
                />
                {errorText('name')}
              </div>

              <div className='contact-field'>
                <label htmlFor='contact-email' className='contact-label'>
                  {t.contact.email}
                </label>
                <input
                  id='contact-email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  value={values.email}
                  onChange={handleChange('email')}
                  placeholder={t.contact.emailPlaceholder}
                  aria-invalid={Boolean(errors.email)}
                  className='contact-input'
                />
                {errorText('email')}
              </div>

              <div className='contact-field'>
                <label htmlFor='contact-message' className='contact-label'>
                  {t.contact.message}
                </label>
                <textarea
                  id='contact-message'
                  name='message'
                  rows={5}
                  required
                  value={values.message}
                  onChange={handleChange('message')}
                  placeholder={t.contact.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  className='contact-input contact-textarea'
                />
                {errorText('message')}
              </div>

              <button type='submit' className='contact-submit'>
                <Send className='h-4 w-4' strokeWidth={1.8} aria-hidden='true' />
                {status === 'success' ? t.contact.sending : t.contact.send}
              </button>

              {status === 'success' ? (
                <p className='contact-success' role='status'>
                  {t.contact.success} {t.contact.successHint}{' '}
                  <span dir='ltr'>{CONTACT_EMAIL}</span>
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
