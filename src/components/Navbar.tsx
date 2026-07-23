import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Volume2, VolumeX, Sun, Moon, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { LiveStatus } from './LiveStatus';

// ─── Shared live-status data hook ────────────────────────────────────────────
interface StatusData {
  text: string;
  dot: string;   // tailwind glow classes for the dot
  borderL: string; // border-l color class
}

function useStatusData() {
  const getStatus = (): StatusData => {
    const hour = parseInt(
      new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', hour: 'numeric', hour12: false }).format(new Date()),
      10
    );
    if (hour >= 8 && hour < 14) return { text: 'At CIC 🎓', dot: 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]', borderL: 'border-l-yellow-400' };
    if (hour >= 14 && hour < 17) return { text: 'Designing UIs 🎨', dot: 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]', borderL: 'border-l-cyan-400' };
    if (hour >= 17 && hour < 23) return { text: 'Coding Labs 💻', dot: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]', borderL: 'border-l-emerald-400' };
    return { text: 'Recharging ⚡', dot: 'bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.8)]', borderL: 'border-l-pink-400' };
  };

  const getTime = () =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
    }).format(new Date());

  const [status, setStatus] = useState<StatusData>(getStatus);
  const [time, setTime] = useState<string>(getTime);

  useEffect(() => {
    const id = setInterval(() => { setStatus(getStatus()); setTime(getTime()); }, 1000);
    return () => clearInterval(id);
  }, []);

  return { status, time };
}

// ─── Compact pill for the mobile top bar ─────────────────────────────────────
const MobileStatusPill: React.FC = () => {
  const { status, time } = useStatusData();

  return (
    <div className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-l-2 ${status.borderL} bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md whitespace-nowrap overflow-hidden min-w-0 flex-1 mx-2 sm:mx-3 transition-all duration-200 ease-in-out hover:bg-slate-200/80 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] cursor-pointer`}>
      {/* Pulsing dot */}
      <span className={`shrink-0 h-2 w-2 rounded-full animate-pulse ${status.dot}`} />

      {/* Status text */}
      <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-900 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-200 truncate leading-none">
        {status.text}
      </span>

      {/* Vertical divider */}
      <span className="shrink-0 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-200 leading-none text-[10px]">│</span>

      {/* Clock */}
      <Clock size={10} className="shrink-0 text-violet-600 dark:text-violet-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200" />
      <span className="shrink-0 text-[10px] sm:text-[11px] font-mono font-bold text-slate-900 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-200 tabular-nums leading-none">
        {time}
      </span>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enabled: audioEnabled, play: playAudio, toggle: toggleAudio } = useAudio();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const { scrollY } = useScroll();
  const backgroundColorDark = useTransform(scrollY, [0, 50], ['rgba(10,11,16,0.4)', 'rgba(10,11,16,0.92)']);
  const backgroundColorLight = useTransform(scrollY, [0, 50], ['rgba(250,250,250,0.5)', 'rgba(250,250,250,0.95)']);
  const backgroundColor = isDark ? backgroundColorDark : backgroundColorLight;
  const py = useTransform(scrollY, [0, 50], ['16px', '10px']);
  const borderBottomColorDark = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']);
  const borderBottomColorLight = useTransform(scrollY, [0, 50], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.07)']);
  const borderBottomColor = isDark ? borderBottomColorDark : borderBottomColorLight;
  const boxShadowDark = useTransform(scrollY, [0, 50], ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 40px rgba(0,0,0,0.45)']);
  const boxShadowLight = useTransform(scrollY, [0, 50], ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 30px rgba(0,0,0,0.07)']);
  const boxShadow = isDark ? boxShadowDark : boxShadowLight;

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'tech-stack', label: 'Stack' },
    { id: 'project-workspace', label: 'Projects' },
    { id: 'lighthouse-stats', label: 'Metrics' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact-form', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    playAudio('tab');
    setActiveSection(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLogoClick = () => { playAudio('click'); scrollTo('hero'); };
  const handleAudioToggle = (e: React.MouseEvent) => { e.stopPropagation(); toggleAudio(); };
  const handleThemeToggle = () => { playAudio('click'); toggleTheme(); };

  // High-contrast theme toggle styling
  const themeBtn = isDark
    ? 'bg-slate-900/80 border-slate-800/80 text-amber-300 hover:bg-slate-800/90 hover:border-amber-400/50 hover:shadow-[0_0_14px_rgba(251,191,36,0.25)] hover:text-amber-200'
    : 'bg-black/5 border-black/10 text-violet-600 hover:bg-violet-500/15 hover:border-violet-500/40 hover:shadow-[0_0_14px_rgba(124,58,237,0.2)]';

  // High-contrast audio toggle styling
  const audioBtn = audioEnabled
    ? 'bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border-cyan-500/50 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(6,182,212,0.4)]'
    : 'bg-slate-100/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]';

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ backgroundColor, paddingTop: py, paddingBottom: py, borderBottom: '1px solid', borderBottomColor, boxShadow }}
        className="fixed top-0 left-0 w-full z-[100] backdrop-blur-md transform-gpu"
      >
        <div className="w-full px-4 md:px-5 flex items-center">

          {/* ── Logo ── */}
          <div className="group shrink-0 flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)] transition-all duration-300">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="navKinetixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 28 22 V 78 M 28 50 L 68 22 M 42 40 L 72 78" 
                  stroke="url(#navKinetixGrad)" 
                  strokeWidth="14" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold font-mono tracking-wider text-slate-950 dark:text-white group-hover:text-cyan-400 transition-colors duration-200">KINETIX</span>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 dark:text-emerald-400 group-hover:text-emerald-300 transition-colors duration-200">UI</span>
            </div>
          </div>

          {/* ── MOBILE: compact pill (visible < md, hidden ≥ md) ── */}
          <div className="flex md:hidden flex-1 min-w-0">
            <MobileStatusPill />
          </div>

          {/* ── TABLET md–lg: flex spacer ── */}
          <div className="hidden md:flex lg:hidden flex-1" />

          {/* ── DESKTOP lg+: full LiveStatus ── */}
          <div className="hidden lg:flex flex-1 mx-4 xl:mx-6 items-center min-w-0 whitespace-nowrap overflow-hidden">
            <LiveStatus />
          </div>

          {/* ── Right controls ── */}
          <div className="shrink-0 flex items-center gap-2">

            {/* Desktop Nav Pills (≥ md) */}
            <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-black/5 dark:bg-slate-900/80 border border-black/8 dark:border-slate-800/80 backdrop-blur-md transition-colors duration-500">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-mono tracking-wide transition-all duration-200 ease-in-out ${activeSection === item.id
                      ? 'bg-gradient-to-r from-violet-600/40 to-cyan-500/40 text-white border border-white/20 shadow-[0_0_16px_rgba(124,58,237,0.3)] font-bold'
                      : 'text-slate-700 dark:text-slate-300 font-medium hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/90 border border-transparent hover:border-slate-300/80 dark:hover:border-slate-700/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Theme Toggle — hidden on mobile */}
            <motion.button
              onClick={handleThemeToggle}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              whileTap={{ scale: 0.88 }}
              className={`hidden md:flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 ease-in-out overflow-hidden ${themeBtn}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark
                  ? <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }} className="block"><Sun size={17} /></motion.span>
                  : <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }} className="block"><Moon size={17} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>

            {/* Audio Toggle — hidden on mobile */}
            <button
              onClick={handleAudioToggle}
              title={audioEnabled ? 'Mute Sounds / كتم الصوت' : 'Turn Sound On / تشغيل الصوت'}
              className={`hidden md:flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 ease-in-out ${audioBtn}`}
            >
              {audioEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>

            {/* Hamburger Toggle Button — mobile only */}
            <button
              className="md:hidden p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out"
              onClick={() => { playAudio('click'); setMobileOpen(o => !o); }}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-40 pt-20 pb-7 px-5 bg-white/97 dark:bg-[#08090f]/97 backdrop-blur-3xl border-b border-black/8 dark:border-slate-800/80 flex flex-col gap-5 shadow-2xl"
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-mono tracking-wide transition-all duration-200 ease-in-out ${activeSection === item.id
                      ? 'bg-gradient-to-r from-violet-600/30 to-cyan-500/30 text-white border border-white/20 shadow-[0_0_15px_rgba(124,58,237,0.25)] font-bold'
                      : 'text-slate-700 dark:text-slate-300 font-semibold hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-transparent hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Quick Actions at bottom */}
            <div className="flex items-center gap-3 pt-2 border-t border-black/6 dark:border-slate-800/80">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 flex-1">
                QUICK ACTIONS
              </span>

              <motion.button
                onClick={handleThemeToggle}
                whileTap={{ scale: 0.88 }}
                className={`p-2.5 rounded-xl border transition-all duration-200 ease-in-out overflow-hidden ${themeBtn}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark
                    ? <motion.span key="sun-m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block"><Sun size={17} /></motion.span>
                    : <motion.span key="moon-m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="block"><Moon size={17} /></motion.span>
                  }
                </AnimatePresence>
              </motion.button>

              <button onClick={handleAudioToggle} className={`p-2.5 rounded-xl border transition-all duration-200 ease-in-out ${audioBtn}`}>
                {audioEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
