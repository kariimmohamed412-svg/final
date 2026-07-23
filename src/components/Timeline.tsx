import React from 'react';
import { GraduationCap, Flame, ShieldCheck } from 'lucide-react';

export const Timeline: React.FC = () => {
  const roadmapItems = [
    {
      title: 'Initiated Computer Science Studies',
      institution: 'CIC (Canadian International College)',
      period: 'OCT 2024 - PRESENT',
      desc: 'Forming rigorous computer science pillars, exploring algorithms, structures, architectures, and software engineering methodologies.',
      icon: <GraduationCap size={18} className="text-violet-400" />
    },
    {
      title: 'Mastering Advanced React Ecosystem',
      institution: 'Personal Dev Vault',
      period: 'MID 2025',
      desc: 'Deep diving into complex hooks, server state rendering pipelines (Next.js), state slices (Redux Toolkit), and rendering animations.',
      icon: <Flame size={18} className="text-cyan-400" />
    },
    {
      title: 'Building High-Fidelity Frontends',
      institution: 'Freelance & Open Source Labs',
      period: 'CURRENT FOCUS',
      desc: 'Deploying clean-code minimalist workspace dashboard interfaces, ensuring absolute accessibility, pixel-perfection, and Lighthouse excellence.',
      icon: <ShieldCheck size={18} className="text-pink-400" />
    }
  ];

  return (
    <section id="timeline" className="p-6 md:p-8 glass-card rounded-2xl flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-1.5 border-b border-black/5 dark:border-white/5 pb-4 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5 transition-colors duration-500">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-400" />
          Academic &amp; Growth Roadmap
        </h2>
        <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase transition-colors duration-500">TIMELINE PIPELINE STAGES</p>
      </div>

      <div className="flex flex-col gap-8 relative border-l border-black/10 dark:border-white/10 ml-4 pl-7 my-auto py-2" style={{borderImage: 'linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(6,182,212,0.4), rgba(236,72,153,0.4)) 1'}}>
        {roadmapItems.map((item) => (
          <div key={item.title} className="relative flex flex-col gap-2">
            {/* Timeline marker */}
            <div className="absolute -left-[41px] top-1 p-1.5 bg-white/80 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-zinc-300 shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-colors duration-500">
              {item.icon}
            </div>
            <div>
              <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 tracking-wider block transition-colors duration-500">
                {item.period}
              </span>
              <h3 className="text-base md:text-lg font-bold text-slate-950 dark:text-white mt-0.5 transition-colors duration-500">{item.title}</h3>
              <span className="text-xs md:text-sm font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">{item.institution}</span>
            </div>
            <p className="text-sm md:text-base font-sans leading-relaxed text-slate-700 dark:text-zinc-300 transition-colors duration-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
