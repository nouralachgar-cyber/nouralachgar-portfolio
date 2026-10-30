import React, { useState } from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';

const CONTACT_EMAIL = 'nlachgar12@gmail.com';
const GITHUB_URL = 'https://github.com/nouralachgar-cyber';

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
    const body = encodeURIComponent(
      `${trimmedMessage}\n\n— ${trimmedName}\n${trimmedEmail}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('success');
  };

  const errorText = (field) =>
    errors[field] && (
      <p className='mt-1.5 text-[0.7rem] font-medium text-terracotta' role='alert'>
        {errors[field]}
      </p>
    );

  return (
    <section
      id='contact'
      aria-labelledby='contact-title'
      className='section-pad relative overflow-hidden'
    >
      {/* Dramatic closing atmosphere */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 100%, var(--glow-violet), transparent 70%), radial-gradient(ellipse 55% 45% at 10% 90%, var(--glow-cyan), transparent 70%)',
        }}
      />

      <div className='shell relative'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16'>
          {/* Left — headline + direct actions */}
          <div>
            <div className='flex items-center gap-4' data-reveal style={{ '--reveal-delay': '40ms' }}>
              <span className='section-index' dir='ltr'>{t.contact.index}</span>
              <span className='section-eyebrow'>{t.contact.eyebrow}</span>
              <span className='hairline' aria-hidden='true' data-reveal='line' style={{ '--reveal-delay': '240ms' }} />
            </div>

            <h2 id='contact-title' className='section-title mt-5' data-reveal='mask' style={{ '--reveal-delay': '100ms' }}>
              {t.contact.heading}{' '}
              <em className='accent-italic'>{t.contact.headingAccent}</em>
            </h2>

            <p
              className='mt-16 font-editorial text-[clamp(1.35rem,2.6vw,1.9rem)] italic leading-snug text-ink/85'
              data-reveal
              style={{ '--reveal-delay': '200ms' }}
            >
              “{t.hero.signal}”
            </p>

            <p className='body-copy mt-5 max-w-md' data-reveal style={{ '--reveal-delay': '260ms' }}>
              {t.contact.direct}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={t.a11y.email}
                className='font-semibold text-cyan underline decoration-cyan/30 underline-offset-4 transition-colors duration-300 hover:decoration-cyan/80'
              >
                {CONTACT_EMAIL}
              </a>
            </p>

            {/* Availability + socials */}
            <div
              className='mt-9 flex flex-wrap items-center gap-3'
              data-reveal
              style={{ '--reveal-delay': '340ms' }}
            >
              <span className='inline-flex items-center gap-2.5 rounded-full border border-cyan/35 bg-cyan/[0.06] px-4 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-cyan'>
                <span className='hero-eyebrow-dot' aria-hidden='true' />
                {t.contact.availability}
              </span>

              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noreferrer'
                aria-label={t.a11y.viewGithub}
                className='inline-flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan dark:border-ivory/15'
              >
                GitHub
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={t.a11y.email}
                className='inline-flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:text-violet dark:border-ivory/15'
              >
                <Mail className='h-3.5 w-3.5' strokeWidth={1.8} aria-hidden='true' />
                {t.contact.emailLabel}
              </a>
            </div>
          </div>

          {/* Right — form card */}
          <div className='surface-card relative p-6 sm:p-8 lg:p-9' data-reveal style={{ '--reveal-delay': '220ms' }}>
            <div className='mb-6 flex items-center justify-between gap-4'>
              <h3 className='font-editorial text-[1.4rem] text-ink'>
                {t.contact.formTitle}
              </h3>
              <Sparkles className='h-4 w-4 shrink-0 text-violet' strokeWidth={1.7} aria-hidden='true' />
            </div>

            <p className='mb-7 text-[0.78rem] leading-relaxed text-muted'>
              {t.contact.formNote}
            </p>

            <form onSubmit={handleSubmit} noValidate className='space-y-5'>
              <div>
                <label
                  htmlFor='contact-name'
                  className='mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted'
                >
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

              <div>
                <label
                  htmlFor='contact-email'
                  className='mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted'
                >
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

              <div>
                <label
                  htmlFor='contact-message'
                  className='mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted'
                >
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
                  className='contact-input min-h-[120px] resize-y'
                />
                {errorText('message')}
              </div>

              <button type='submit' className='btn btn-primary mt-2 w-full'>
                <Send className='h-4 w-4' strokeWidth={1.8} aria-hidden='true' />
                {status === 'success' ? t.contact.sending : t.contact.send}
              </button>

              {status === 'success' && (
                <p className='rounded-lg border border-cyan/30 bg-cyan/[0.07] px-4 py-3 text-[0.75rem] leading-relaxed text-cyan' role='status'>
                  {t.contact.success} {t.contact.successHint}{' '}
                  <span dir='ltr'>{CONTACT_EMAIL}</span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
