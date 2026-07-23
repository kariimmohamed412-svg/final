import React from 'react';

export interface Project {
  id: string;
  name: string;
  url: string;
  category: 'Frontend' | 'Full-Stack' | 'CS / Algorithms';
  desc: string;
  badges: string[];
  goal: string;
  features: string[];
  mockupContent: React.ReactNode;
}

export const projects: Project[] = [
  {
    id: 'devspace',
    name: 'DevSpace Dashboard',
    url: 'devspace.workspace.io',
    category: 'Frontend',
    desc: 'Futuristic bento personal workspace designed for high-focus engineering cycles.',
    badges: ['React.js', 'Vite', 'CSS Modules'],
    goal: 'Maximize coding productivity by centralizing critical workflow tools into a unified cyber space.',
    features: ['Working Pomodoro focus node', 'GitHub contribution visualizer grid', 'Tech news feed scrolling ticker'],
    mockupContent: (
      <div className="flex flex-col gap-4 p-4 text-xs font-mono text-slate-500 dark:text-zinc-400 h-full justify-between transition-colors duration-500">
        <div className="flex justify-between items-center border-b border-black/5 dark:border-zinc-800 pb-2">
          <span className="text-mint text-[10px]">&gt; focus_session_active</span>
          <span className="text-slate-400 dark:text-zinc-500">PING: 14ms</span>
        </div>

        <div className="grid grid-cols-2 gap-3 my-2">
          <div className="p-3 bg-black/5 dark:bg-zinc-900 border border-black/5 dark:border-zinc-800 rounded-lg flex flex-col justify-center items-center text-center">
            <span className="text-[9px] text-slate-400 dark:text-zinc-500">POMODORO TIMER</span>
            <span className="text-xl font-bold font-mono text-slate-800 dark:text-white mt-1">24:42</span>
          </div>
          <div className="p-3 bg-black/5 dark:bg-zinc-900 border border-black/5 dark:border-zinc-800 rounded-lg flex flex-col justify-center items-center text-center">
            <span className="text-[9px] text-slate-400 dark:text-zinc-500">GITHUB METRIC</span>
            <span className="text-xl font-bold font-mono text-emerald-500 dark:text-emerald-400 mt-1">412+</span>
          </div>
        </div>

        <div className="p-2 bg-black/5 dark:bg-zinc-900 border border-black/5 dark:border-zinc-800 rounded-lg text-[9px] truncate">
          🔥 TypeScript 5.5 is live! • Vite 5.0 introduces lightning fast hot reloads...
        </div>
      </div>
    )
  },
  {
    id: 'cineverse',
    name: 'CineVerse Explorer',
    url: 'cineverse.cinema.io',
    category: 'Full-Stack',
    desc: 'Cinematic, high-fidelity media platform for catalog exploration and film statistics.',
    badges: ['Next.js', 'Redux Toolkit', 'Framer Motion'],
    goal: 'Deliver a fluid, theatrical streaming navigation and review system with zero performance drops.',
    features: ['Smooth page transitions', 'Interactive review timeline grids', 'Kinetic drag-scroll category rows'],
    mockupContent: (
      <div className="flex flex-col gap-4 p-4 text-xs font-sans text-slate-500 dark:text-zinc-400 h-full justify-between transition-colors duration-500">
        <div className="flex justify-between items-center border-b border-black/5 dark:border-zinc-800 pb-2">
          <span className="text-rose-500 dark:text-rose-400 font-bold text-[10px]">CINEVERSE</span>
          <span className="text-slate-400 dark:text-zinc-500">User: Guest_104</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto py-1 hide-scrollbar">
          <div className="flex-shrink-0 w-20 aspect-[2/3] bg-gradient-to-t from-[#ea580c] to-[#431407] border border-black/5 dark:border-zinc-800 rounded-md p-1.5 flex flex-col justify-end">
            <span className="text-[8px] font-bold text-white truncate">Mad Max</span>
          </div>
          <div className="flex-shrink-0 w-20 aspect-[2/3] bg-gradient-to-t from-[#f59e0b] to-[#78350f] border border-black/5 dark:border-zinc-800 rounded-md p-1.5 flex flex-col justify-end">
            <span className="text-[8px] font-bold text-white truncate">Dune II</span>
          </div>
          <div className="flex-shrink-0 w-20 aspect-[2/3] bg-gradient-to-t from-[#ec4899] to-[#4c0519] border border-black/5 dark:border-zinc-800 rounded-md p-1.5 flex flex-col justify-end">
            <span className="text-[8px] font-bold text-white truncate">Blade 2049</span>
          </div>
        </div>

        <div className="h-16 bg-black/5 dark:bg-zinc-900 border border-black/5 dark:border-zinc-800/80 rounded-lg p-2.5 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path 
              d="M 0 25 L 15 22 L 30 26 L 45 18 L 60 20 L 75 12 L 90 15 L 100 5" 
              fill="none" 
              stroke="#00f5a0" 
              strokeWidth="1.5" 
            />
          </svg>
        </div>
      </div>
    )
  },
  {
    id: 'apexcrypto',
    name: 'ApexCrypto Analytics',
    url: 'apexcrypto.visuals.io',
    category: 'CS / Algorithms',
    desc: 'Real-time cryptocurrency tracking platform with smooth visual metric rendering.',
    badges: ['React.js', 'Tailwind CSS', 'D3.js'],
    goal: 'Create an ultra-responsive trade charting suite utilizing performant inline SVG rendering tools.',
    features: ['Real-time price feed tickers', 'Fully interactive SVG charts', 'Custom portfolio gain visualizer'],
    mockupContent: (
      <div className="flex flex-col gap-3 p-4 text-xs font-mono text-slate-500 dark:text-zinc-400 h-full justify-between transition-colors duration-500">
        <div className="flex justify-between items-center border-b border-black/5 dark:border-zinc-800 pb-2">
          <span className="text-cyan-500 dark:text-cyan-400 text-[10px]">&gt; APEX_SYS_READY</span>
          <span className="text-slate-800 dark:text-white font-bold">$94,104.22 BTC</span>
        </div>

        <div className="h-20 bg-black/[0.02] dark:bg-zinc-950/30 border border-black/5 dark:border-zinc-800/40 rounded-lg p-1.5 relative overflow-hidden flex items-end">
          <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 50 Q 25 35 50 42 T 100 15 T 150 35 T 200 8"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 0 50 Q 25 35 50 42 T 100 15 T 150 35 T 200 8 L 200 60 L 0 60 Z"
              fill="url(#chart-glow)"
            />
          </svg>
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500 text-[8px] font-bold">+8.22%</div>
        </div>

        <div className="flex justify-between text-[9px] text-slate-400 dark:text-zinc-500">
          <span>VOL: $14.2B</span>
          <span>CAP: $1.85T</span>
        </div>
      </div>
    )
  }
];
