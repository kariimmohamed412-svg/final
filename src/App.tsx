import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useSpotlight } from './hooks/useSpotlight';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { GitHubStatsWidget } from './components/GitHubStatsWidget';
import { LighthouseStats } from './components/LighthouseStats';
import { Timeline } from './components/Timeline';
import { ContactForm } from './components/ContactForm';
import { SimpleSplash } from './components/SimpleSplash';
import { CommandPalette } from './components/CommandPalette';
import { EasterEgg } from './components/EasterEgg';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Trigger Stripe mouse spotlight effect
  useSpotlight();

  // Force scroll to top on refresh and disable default scroll memory
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Global hotkeys: Cmd+K / Ctrl+K & secret key sequence "kmos"
  useEffect(() => {
    let typedBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen(prev => !prev);
        return;
      }

      // Ignore buffer if focus is inside an input/textarea
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')) {
        return;
      }

      // Secret sequence buffer ("kmos")
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > 10) {
        typedBuffer = typedBuffer.slice(-10);
      }

      if (typedBuffer.endsWith('kmos')) {
        setIsEasterEggOpen(true);
        typedBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section using IntersectionObserver (zero scroll lag)
  useEffect(() => {
    const sections = ['hero', 'tech-stack', 'project-workspace', 'lighthouse-stats', 'timeline', 'github', 'contact-form'];

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 35, rotateX: 2, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-inherit text-slate-900 dark:text-zinc-100 overflow-x-hidden transition-colors duration-500">
      {/* ── Minimalist Intro Splash Screen ── */}
      <AnimatePresence mode="wait">
        {isLoading && <SimpleSplash onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* ── Command Palette CMD+K ── */}
      <CommandPalette
        open={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
      />

      {/* ── Secret Terminal Easter Egg Modal ── */}
      <EasterEgg
        open={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* ── Aurora Backdrop Blobs ── */}
      <div className="aurora-container">
        <div className="aurora-blob blob-violet" />
        <div className="aurora-blob blob-cyan" />
        <div className="aurora-blob blob-pink" />
      </div>

      {/* ── Floating Navbar ── */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* ── Full-width Edge-to-Edge Main Content ── */}
      <main className="relative z-10 w-full px-3 md:px-5 pt-28 pb-24 flex flex-col gap-16 transform-gpu">

        {/* Module 1 — Hero & Identity */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
          className="transform-gpu"
        >
          <Hero />
        </motion.div>

        {/* Section divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 2 — Tech Stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <TechStack />
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 3 — Project Workspace */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <ProjectWorkspace />
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 4 — Lighthouse Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <LighthouseStats />
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 5 — Academic Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <Timeline />
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 6 — GitHub Activity (positioned directly before Contact) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <GitHubStatsWidget />
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

        {/* Module 7 — Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={revealVariants}
        >
          <ContactForm />
        </motion.div>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/5 dark:border-white/5 text-sm font-mono text-slate-500 dark:text-zinc-400 gap-3 transition-colors duration-500">
          <span>
            © 2026 <span className="text-slate-800 dark:text-zinc-200 font-extrabold tracking-wider">KINETIX UI</span> · Next-Gen Front-end Development Co.
          </span>
          <span className="text-center">
            React · TypeScript · Tailwind · Framer Motion · Vite
          </span>
          <button
            onClick={() => setIsEasterEggOpen(true)}
            className="hover:text-[var(--accent-hex,#22d3ee)] transition-colors duration-200 cursor-pointer"
            title="Click or type 'kmos' to launch terminal"
          >
            host: kinetix-ui (type 'kmos')
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;
