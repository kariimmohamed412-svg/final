import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Monitor, Play, Layers } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useAudio } from '../context/AudioContext';
import { playClickSound, playHoverSound } from '../utils/sound';
import { projects } from '../data/projectsData';

type CategoryFilter = 'All' | 'Frontend' | 'Full-Stack' | 'CS / Algorithms';

export const ProjectWorkspace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProjId, setActiveProjId] = useState<string>('devspace');
  const { play: playAudio } = useAudio();

  const categories: CategoryFilter[] = ['All', 'Frontend', 'Full-Stack', 'CS / Algorithms'];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const active = filteredProjects.find((p) => p.id === activeProjId) || filteredProjects[0] || projects[0];

  const handleTabClick = (cat: CategoryFilter) => {
    try {
      playClickSound();
      playAudio('tab');
    } catch {
      // Audio fallback
    }
    setSelectedCategory(cat);
    const firstInCat = projects.find((p) => cat === 'All' || p.category === cat);
    if (firstInCat) setActiveProjId(firstInCat.id);
  };

  const handleProjectSelect = (id: string) => {
    try {
      playClickSound();
      playAudio('click');
    } catch {
      // Audio fallback
    }
    setActiveProjId(id);
  };

  return (
    <section id="project-workspace" className="grid grid-cols-1 xl:grid-cols-12 gap-6 scroll-mt-24">
      {/* Module Header & Category Filters */}
      <div className="xl:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4 transition-colors duration-500">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5 transition-colors duration-500">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-400 to-violet-400" />
            Production Lab & Projects
          </h2>
          <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase transition-colors duration-500">ENGINEERING PROTOTYPES DISPLAY DECK</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 backdrop-blur-md transition-colors duration-500 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabClick(cat)}
              onMouseEnter={() => playHoverSound()}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-mono font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Left List of Projects (xl:col-span-5) */}
      <div className="xl:col-span-5 flex flex-col gap-3.5">
        {filteredProjects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => handleProjectSelect(proj.id)}
            onMouseEnter={() => playHoverSound()}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-2.5 ${active.id === proj.id
                ? 'glass-card border-violet-500/30 shadow-[0_0_25px_rgba(124,58,237,0.12)]'
                : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
              }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-base md:text-lg font-bold ${active.id === proj.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400' : 'text-slate-800 dark:text-zinc-200'}`}>
                {proj.name}
              </h3>
              <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 transition-colors duration-500">PROJ_{proj.id.toUpperCase()}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-zinc-300 font-sans line-clamp-2 leading-relaxed transition-colors duration-500">
              {proj.desc}
            </p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {proj.badges.slice(0, 3).map(b => (
                <span key={b} className="text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300 px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 rounded-md transition-colors duration-500">
                  {b}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Right macOS Browser Frame (xl:col-span-7) */}
      <div className="xl:col-span-7 flex flex-col glass-card rounded-2xl overflow-hidden min-h-[380px]">
        {/* Simulated macOS Window Top Bar */}
        <div className="bg-black/[0.03] dark:bg-white/[0.03] border-b border-black/5 dark:border-white/5 px-4 py-3 flex items-center justify-between transition-colors duration-500">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 rounded-lg text-xs font-mono text-slate-700 dark:text-zinc-400 w-72 justify-center transition-colors duration-500">
            <Monitor size={12} className="text-slate-400 dark:text-zinc-500" />
            <span className="truncate">{active ? active.url : 'workspace.io'}</span>
          </div>
          <div className="w-10 flex justify-end">
            <Layers size={14} className="text-slate-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-white/[0.015]">
          {/* Live Preview Window */}
          <div className="border-b md:border-b-0 md:border-r border-white/5 p-3 flex flex-col justify-center">
            <div className="h-56 bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active ? active.id : 'none'}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {active ? active.mockupContent : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="p-6 flex flex-col justify-between text-sm gap-5 font-mono">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-widest block mb-1 transition-colors duration-500">PROJECT MISSION</span>
                <p className="text-slate-800 dark:text-zinc-200 font-sans leading-relaxed text-sm transition-colors duration-500">
                  {active ? active.goal : ''}
                </p>
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-widest block mb-1 transition-colors duration-500">CORE UTILITIES</span>
                <ul className="flex flex-col gap-1.5 text-slate-700 dark:text-zinc-300 font-sans text-sm transition-colors duration-500">
                  {active && active.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={`https://github.com/kariimmohamed412-svg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playClickSound();
                    playAudio('click');
                  }}
                  onMouseEnter={() => playHoverSound()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm font-mono font-semibold text-slate-700 dark:text-zinc-200 hover:text-slate-950 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-all duration-200"
                >
                  <GitFork size={14} />
                  <span>View GitHub Repo</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={`https://github.com/kariimmohamed412-svg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playClickSound();
                    playAudio('success');
                  }}
                  onMouseEnter={() => playHoverSound()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 rounded-xl text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-300 hover:from-violet-600/30 hover:to-cyan-500/30 transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.08)]"
                >
                  <Play size={12} fill="currentColor" />
                  <span>Live Demo</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
