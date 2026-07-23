import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Code2, GraduationCap, ArrowRight, FileDown } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useAudio } from '../context/AudioContext';

export const Hero: React.FC = () => {
  const { play: playAudio } = useAudio();
  const metrics = [
    { label: 'PRODIGY INDEX', value: '19', suffix: 'Y/O', icon: <Sparkles className="text-amber-400" size={18} /> },
    { label: 'CIC CS PATH', value: 'Year 2', suffix: 'CS', icon: <GraduationCap className="text-cyan-500 dark:text-cyan-400" size={18} /> },
    { label: 'CODE QUANTUM', value: '10k+', suffix: 'Lines', icon: <Code2 className="text-mint" size={18} /> },
    { label: 'LEETCODE STAT', value: '100+', suffix: 'Solved', icon: <Shield className="text-pink-400" size={18} /> },
  ];

  const handleConnectClick = () => {
    playAudio('click');
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownloadDossier = () => {
    playAudio('success');
    alert('Dossier transmission initialized. Simulated download successful!');
  };

  return (
    <section id="hero" className="grid grid-cols-1 xl:grid-cols-2 gap-6 scroll-mt-24">
      {/* Editorial Profile Block */}
      <div className="flex flex-col justify-between p-6 md:p-8 glass-card rounded-2xl relative overflow-hidden group">
        {/* System Online Status */}
        <div className="flex items-center gap-2.5 self-start px-3.5 py-1.5 bg-mint/10 border border-mint/20 rounded-full">
          <span className="h-2.5 w-2.5 rounded-full bg-mint animate-pulse shadow-[0_0_8px_#00f5a0]" />
          <span className="text-xs font-mono tracking-wider text-mint font-semibold uppercase">SYSTEM ONLINE // SECURE ENTRY</span>
        </div>

        <div className="my-8 flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight font-sans text-slate-950 dark:text-white transition-colors duration-500">
            Karim <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
              Mohamed
            </span>
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 font-sans text-base md:text-lg leading-relaxed max-w-xl transition-colors duration-500">
            Computer Science student at <span className="text-slate-950 dark:text-white font-bold">CIC (Canadian International College)</span>. Active problem solver, continuous learner, and frontend architect specializing in high-fidelity Bento Grid spaces.
          </p>
        </div>

        {/* Magnetic Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-6 relative z-20">
          <Magnetic strength={0.25}>
            <button
              onClick={handleConnectClick}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-mono text-sm font-semibold rounded-xl hover:from-violet-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
            >
              <span>INITIATE CONNECTION</span>
              <ArrowRight size={16} />
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={handleDownloadDossier}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-800 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 font-mono text-sm font-semibold rounded-xl transition-all duration-300"
            >
              <FileDown size={16} />
              <span>SECURE DOSSIER (CV)</span>
            </button>
          </Magnetic>
        </div>

        <div className="flex items-center gap-2 text-sm font-mono text-slate-600 dark:text-zinc-400 transition-colors duration-500">
          <span className="font-semibold text-slate-700 dark:text-zinc-300">SECURE_ID:</span>
          <span>kariimmohamed412-svg</span>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="p-6 glass-card rounded-2xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest text-slate-600 dark:text-zinc-400 font-semibold transition-colors duration-500">{metric.label}</span>
              {metric.icon}
            </div>
            <div className="mt-6">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white font-mono transition-colors duration-500">
                {metric.value}
              </span>
              <span className="text-sm font-mono text-slate-600 dark:text-zinc-400 ml-2 font-semibold transition-colors duration-500">
                {metric.suffix}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
