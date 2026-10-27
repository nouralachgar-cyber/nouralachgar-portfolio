import React, { useState } from 'react';
import { ArrowUpRight, Check, Mail, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CONTACT_EMAIL = 'nlachgar12@gmail.com';

const GithubIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'h-4 w-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

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

      const firstInvalidField = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => {
        document.getElementById(`contact-${firstInvalidField}`)?.focus();
      });

      return;
    }

    const subject = encodeURIComponent(`${t.contact.mailSubject} ${trimmedName}`);
    const body = encodeURIComponent(
      `${trimmedMessage}\n\n— ${trimmedName}\n${trimmedEmail}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setErrors({});
    setStatus('success');
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-pad relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -end-24 top-1/3 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-terracotta/10 blur-3xl dark:bg-terracotta/10" />
        <div className="absolute -start-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-peach/25 blur-3xl dark:bg-peach/5" />
      </div>

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-title"
              index={t.contact.index}
              eyebrow={t.contact.eyebrow}
              heading={t.contact.heading}
              accent={t.contact.headingAccent}
              description={t.contact.subtext}
            />

            <div
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-terracotta/25 bg-terracotta/10 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-terracotta-deep dark:border-terracotta/30 dark:bg-terracotta/10 dark:text-terracotta-soft"
              data-reveal
              style={{ '--reveal-delay': '240ms' }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta/50" />
                <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-terracotta" />
              </span>
              {t.contact.availability}
            </div>

            <div
              className="mt-10 border-t border-mocha-brown/10 pt-7 dark:border-peach/10"
              data-reveal
              style={{ '--reveal-delay': '300ms' }}
            >
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-mocha-brown/55 dark:text-peach/45">
                {t.contact.direct}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group mt-2 inline-flex max-w-full items-center gap-2 font-editorial font-latin-serif text-[1.15rem] leading-snug text-mocha-deep transition-colors duration-300 hover:text-terracotta-deep dark:text-cream dark:hover:text-terracotta-soft sm:text-[1.3rem]"
              >
                <span dir="ltr" className="break-all">
                  {CONTACT_EMAIL}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div
              className="mt-9"
              data-reveal
              style={{ '--reveal-delay': '360ms' }}
            >
              <p className="section-eyebrow">{t.contact.socials}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/nouralachgar-cyber"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.a11y.viewGithub}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-mocha-brown/12 bg-cream/45 px-4 py-2.5 text-[0.7rem] font-bold text-mocha-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/45 hover:text-terracotta-deep dark:border-peach/10 dark:bg-white/[0.025] dark:text-cream dark:hover:border-terracotta/45 dark:hover:text-terracotta-soft"
                >
                  <GithubIcon />
                  GitHub
                  <ArrowUpRight
                    className="h-3 w-3 opacity-45 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.a11y.viewLinkedin}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-mocha-brown/12 bg-cream/45 px-4 py-2.5 text-[0.7rem] font-bold text-mocha-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/45 hover:text-terracotta-deep dark:border-peach/10 dark:bg-white/[0.025] dark:text-cream dark:hover:border-terracotta/45 dark:hover:text-terracotta-soft"
                >
                  <LinkedinIcon />
                  LinkedIn
                  <ArrowUpRight
                    className="h-3 w-3 opacity-45 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="surface-card relative overflow-hidden p-6 sm:p-8 lg:p-9"
              data-reveal
              style={{ '--reveal-delay': '160ms' }}
            >
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/60 to-transparent"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="font-editorial text-[1.7rem] leading-tight text-mocha-deep dark:text-cream">
                    {t.contact.formTitle}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.8rem] leading-relaxed text-mocha-brown/75 dark:text-peach/55">
                    {t.contact.formNote}
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-7 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      {t.contact.name}
                      <span className="ms-1 text-terracotta" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={handleChange('name')}
                      placeholder={t.contact.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="field-input"
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="field-error" role="alert">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      {t.contact.email}
                      <span className="ms-1 text-terracotta" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      onChange={handleChange('email')}
                      placeholder={t.contact.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="field-input"
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="field-error" role="alert">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="field-label">
                    {t.contact.message}
                    <span className="ms-1 text-terracotta" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={values.message}
                    onChange={handleChange('message')}
                    placeholder={t.contact.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="field-input resize-y"
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="field-error" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div role="status" aria-live="polite">
                  {status === 'success' ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-terracotta/25 bg-terracotta/10 px-4 py-3 text-[0.8rem] leading-relaxed text-mocha-deep dark:text-cream">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                      <span>
                        {t.contact.success}{' '}
                        <span className="text-mocha-brown/80 dark:text-peach/70">
                          {t.contact.successHint}{' '}
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="text-link"
                            dir="ltr"
                          >
                            {CONTACT_EMAIL}
                          </a>
                        </span>
                      </span>
                    </div>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-primary group w-full">
                  <Send
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span>{t.contact.send}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
