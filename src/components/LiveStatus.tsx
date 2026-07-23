import React, { useState, useEffect } from 'react';
import { Clock, Laptop, GraduationCap, Zap, Coffee } from 'lucide-react';

export const LiveStatus: React.FC = () => {
  const [cairoTime, setCairoTime] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('Deeply Coding 💻');
  const [statusType, setStatusType] = useState<'coding' | 'college' | 'design' | 'resting'>('coding');

  // Update clock & scheduler status
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        hour: 'numeric',
        hour12: false,
      });
      const hour = parseInt(formatter.format(now), 10);

      if (hour >= 8 && hour < 14) {
        setStatusText('Attending Lecture at CIC 🎓');
        setStatusType('college');
      } else if (hour >= 14 && hour < 17) {
        setStatusText('Designing Modern UIs 🎨');
        setStatusType('design');
      } else if (hour >= 17 && hour < 23) {
        setStatusText('Deeply Coding React Labs 💻');
        setStatusType('coding');
      } else {
        setStatusText('Recharging Batteries ⚡');
        setStatusType('resting');
      }

      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setCairoTime(timeFormatter.format(now));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = () => {
    switch (statusType) {
      case 'college': return <GraduationCap size={14} className="text-amber-500 dark:text-yellow-400 shrink-0" />;
      case 'design':  return <Zap size={14} className="text-cyan-600 dark:text-cyan-400 shrink-0" />;
      case 'resting': return <Coffee size={14} className="text-pink-600 dark:text-pink-400 shrink-0" />;
      default:        return <Laptop size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />;
    }
  };

  const getDotGlow = () => {
    switch (statusType) {
      case 'college': return 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]';
      case 'design':  return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]';
      case 'resting': return 'bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.7)]';
      default:        return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]';
    }
  };

  const getBorderColor = () => {
    switch (statusType) {
      case 'college': return 'border-l-yellow-400';
      case 'design':  return 'border-l-cyan-400';
      case 'resting': return 'border-l-pink-400';
      default:        return 'border-l-emerald-400';
    }
  };

  return (
    <div className={`group w-full flex items-center justify-between gap-4 px-5 py-2 rounded-xl border-l-2 ${getBorderColor()} bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md whitespace-nowrap select-none transition-all duration-200 ease-in-out hover:bg-slate-200/80 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] cursor-pointer`}>
      {/* STATUS (Left Aligned) */}
      <div className="flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
        <span className={`shrink-0 h-2.5 w-2.5 rounded-full animate-pulse ${getDotGlow()}`} />
        <span className="text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 font-semibold uppercase tracking-wider text-[11px] transition-colors duration-200">STATUS:</span>
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white whitespace-nowrap transition-colors duration-200">
          {getIcon()}
          <span className="whitespace-nowrap">{statusText}</span>
        </div>
      </div>

      {/* EGYPT TIME (Right Aligned) */}
      <div className="flex items-center gap-1.5 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
        <Clock size={13} className="text-violet-600 dark:text-violet-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 shrink-0 transition-colors duration-200" />
        <span className="text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 font-semibold uppercase tracking-wider text-[10px] transition-colors duration-200">EGYPT TIME:</span>
        <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white tabular-nums whitespace-nowrap transition-colors duration-200">{cairoTime}</span>
      </div>
    </div>
  );
};
