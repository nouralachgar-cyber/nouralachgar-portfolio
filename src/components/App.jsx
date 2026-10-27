import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const translations = {
  en: {
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    hero: {
      eyebrow: "HELLO, I'M NOURA",
      heading: "Building digital experiences with purpose.",
      subtext: "I create thoughtful, responsive web experiences by combining clean code, creative design, and attention to detail.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Let's Talk"
    },
    about: {
      eyebrow: "PHILOSOPHY",
      heading: "A little about how I build.",
      text: "I'm Noura, a web developer passionate about creating useful, thoughtful, and visually engaging digital experiences. I enjoy transforming ideas into responsive interfaces, learning new technologies, and improving my skills through practical projects.",
      qualities: {
        curious: "Curious by nature",
        detail: "Detail-oriented",
        learning: "Always learning",
        ux: "UX Focused"
      }
    },
    skills: { eyebrow: "EXPERTISE", heading: "Skills & Technologies", frontend: "Frontend", backend: "Backend", tools: "Tools" },
    projects: { eyebrow: "PORTFOLIO", heading: "Selected work.", subtext: "A selection of projects where I explore design, functionality, and practical problem-solving." },
    contact: { eyebrow: "GET IN TOUCH", heading: "Have an idea in mind?", subtext: "I'm always interested in exploring thoughtful web projects and new opportunities.", name: "Name", email: "Email", message: "Message", send: "Send Message" },
    footer: { tagline: "Thoughtful design. Meaningful code." }
  },
  ar: {
    nav: { about: 'عنـي', skills: 'المهارات', projects: 'المشاريع', contact: 'التواصل' },
    hero: {
      eyebrow: "مرحباً، أنا نورة",
      heading: "بناء تجارب رقمية بإتقان وهدف.",
      subtext: "أصمم وأطور واجهات ويب متجاوبة تجمع بين الكود النظيف، التصميم الإبداعي، والاهتمام بأدق التفاصيل.",
      ctaPrimary: "استكشف أعمالي",
      ctaSecondary: "تواصل معي"
    },
    about: {
      eyebrow: "منهجية العمل",
      heading: "نبذة عن فلسفتي في التطوير.",
      text: "أنا نورة، مطورة ويب شغوفة بإنشاء تجارب رقمية مفيدة، جذابة وأنيقة. أستمتع بتحويل الأفكار إلى واجهات سلسة، وتعلم التقنيات الحديثة وتطوير مهاراتي باستمرار من خلال التطبيق العملي.",
      qualities: {
        curious: "شغوفة بالاكتشاف",
        detail: "دقيقة في التفاصيل",
        learning: "تعلم مستمر",
        ux: "تركيز على تجربة المستخدم"
      }
    },
    skills: { eyebrow: "الخبرات التقنية", heading: "المهارات والتقنيات", frontend: "الواجهة الأمامية", backend: "الخلفية وقواعد البيانات", tools: "الأدوات" },
    projects: { eyebrow: "معرض الأعمال", heading: "أعمال مختارة.", subtext: "مجموعة من المشاريع التي استكشفت فيها التصميم والأداء وحل المشكلات العملية." },
    contact: { eyebrow: "تواصل معي", heading: "هل لديك فكرة مشروع؟", subtext: "أنا دائماً مهتمة بالمشاريع المميزة وفرص التعاون الجديدة.", name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة", send: "إرسال الرسالة" },
    footer: { tagline: "تصميم متقن. كود ذو قيمة." }
  }
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-cream text-mocha-deep dark:bg-mocha-dark dark:text-cream transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} t={t} />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}