import React, { useEffect, useState } from 'react';

interface LighthouseGauge {
  label: string;
  value: number;
  color: string;
}

export const LighthouseStats: React.FC = () => {
  const gauges: LighthouseGauge[] = [
    { label: 'Performance', value: 99, color: 'url(#grad-perf-new)' },
    { label: 'Accessibility', value: 100, color: 'url(#grad-access-new)' },
    { label: 'Best Practices', value: 98, color: 'url(#grad-best-new)' },
    { label: 'SEO', value: 100, color: 'url(#grad-seo-new)' },
  ];

  const [animatedVals, setAnimatedVals] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedVals(gauges.map(g => g.value));
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="lighthouse-stats" className="p-6 md:p-8 glass-card rounded-2xl flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-1.5 border-b border-black/5 dark:border-white/5 pb-4 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5 transition-colors duration-500">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          Workspace Lighthouse Statistics
        </h2>
        <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase transition-colors duration-500">GOOGLE LIGHTHOUSE METRICS MATRIX</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-auto">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="grad-perf-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="grad-access-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#00f5a0" />
            </linearGradient>
            <linearGradient id="grad-best-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="grad-seo-new" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {gauges.map((gauge, index) => {
          const radius = 32;
          const strokeWidth = 5;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (animatedVals[index] / 100) * circumference;

          return (
            <div key={gauge.label} className="flex flex-col items-center gap-3 p-5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl hover:border-black/10 dark:hover:border-white/10 transition-all duration-300">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="rgba(100,100,100,0.12)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke={gauge.color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{
                      strokeDashoffset,
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.5))',
                    }}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-base font-mono font-bold text-slate-950 dark:text-white transition-colors duration-500">
                  {animatedVals[index]}%
                </span>
              </div>
              <span className="text-xs md:text-sm font-mono font-semibold tracking-wide text-slate-800 dark:text-slate-200 text-center transition-colors duration-500">
                {gauge.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
