import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CONTACT_EMAIL = 'nlachgar12@gmail.com';

export default function Contact({ t }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues({ ...values, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
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

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-section section-pad relative overflow-hidden"
    >
      {/* Contact accent glow */}
      <div
        className="contact-glow absolute bottom-0 right-0 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="shell">
        <SectionHeading
          id="contact-title"
          index={t.contact.index}
          eyebrow={t.contact.eyebrow}
          heading={t.contact.heading}
          accent={t.contact.headingAccent}
          description={t.contact.subtext}
        />

        {/* CTA large statement */}
        <div className="mt-16 lg:mt-20 max-w-2xl mx-auto text-center reveal-init" data-reveal style={{ '--reveal-delay': '200ms' }}>
          <p className="cta-large font-editorial leading-tight mb-6">
            Let's build something memorable.
          </p>
          <p className="cta-subtext text-muted/60 max-w-2xl mx-auto">
            {t.contact.subtext}
          </p>
        </div>

        {/* Contact methods */}
        <div className="mt-16 lg:mt-24 grid gap-6 lg:grid-cols-2">
          {/* Email */}
          <div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-method group inline-flex items-center gap-3 rounded-full border border-terracotta/25 bg-terracotta/10 px-4 py-3 text-[0.75rem] font-bold uppercase tracking-wider text-terracotta-deep transition-colors duration-300 hover:text-terracotta-deep dark:border-navy-subtle dark:bg-navy-deep/10 dark:hover:border-terracotta/30 dark:hover:text-terracotta-soft"
            >
              <Mail className="h-4 w-4 text-terracotta" aria-hidden="true" />
              <span>Email me</span>
            </a>
          </div>

          {/* GitHub */}
          <div className="mt-6">
            <a
              href="https://github.com/nouralachgar-cyber"
              target="_blank"
              rel="noreferrer"
              className="contact-method group inline-flex items-center gap-2.5 rounded-full border border-navy-subtle/12 bg-navy-deep/15 px-4 py-2.5 text-[0.7rem] font-bold text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/45 hover:text-cyan dark:border-ivory/10 dark:bg-white/[0.025] dark:text-ivory dark:hover:border-cyan/45 dark:hover:text-cyan"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                aria-hidden="true"
                focusable="false"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="5.5" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* CTA card */}
        <div className="mt-16 lg:mt-24 surface-card p-6 lg:p-8 reveal-init" data-reveal style={{ '--reveal-delay': '360ms' }}>
          <h3 className="font-editorial text-[1.5rem] text-navy-deep dark:text-ivory mb-4">
            {t.contact.formTitle}
          </h3>
          <p className="text-muted/50 text-sm dark:text-muted/40 mb-6">
            {t.contact.formNote}
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            <div>
              <label htmlFor="contact-name" className="text-[0.65rem] font-medium uppercase tracking-wider text-muted/50 mb-2 block">
                {t.contact.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={handleChange('name')}
                placeholder={t.contact.namePlaceholder}
                className="w-full bg-navy-deep/20 border border-terracotta/20 rounded-none rounded-[0.5rem] px-4 py-3 text-[0.9rem] placeholder-terracotta/40 transition-colors duration-300 focus:border-cyan/45 focus:outline-none dark:bg-navy-deep/5 dark:border-terracotta/30 dark:placeholder-terracotta/30"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-[0.65rem] font-medium uppercase tracking-wider text-muted/50 mb-2 block">
                {t.contact.email}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={handleChange('email')}
                placeholder={t.contact.emailPlaceholder}
                className="w-full bg-navy-deep/20 border border-terracotta/20 rounded-none rounded-[0.5rem] px-4 py-3 text-[0.9rem] placeholder-terracotta/40 transition-colors duration-300 focus:border-cyan/45 focus:outline-none dark:bg-navy-deep/5 dark:border-terracotta/30 dark:placeholder-terracotta/30"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-[0.65rem] font-medium uppercase tracking-wider text-muted/50 mb-2 block">
                {t.contact.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={values.message}
                onChange={handleChange('message')}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-navy-deep/20 border border-terracotta/20 rounded-none rounded-[0.5rem] px-4 py-3 text-[0.9rem] placeholder-terracotta/40 resize-y transition-colors duration-300 focus:border-cyan/45 focus:outline-none dark:bg-navy-deep/5 dark:border-terracotta/30 dark:placeholder-terracotta/30"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              <span>{t.contact.send}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}