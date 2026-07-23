import React, { useState, useEffect } from 'react';

interface StatusData {
  emoji: string;
  text: string;
  dotClass: string;
}

const getStatus = (): StatusData => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    hour: 'numeric',
    hour12: false,
  });
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 8 && hour < 14)  return { emoji: '🎓', text: 'At CIC',           dotClass: 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.7)]' };
  if (hour >= 14 && hour < 17) return { emoji: '🎨', text: 'Designing UI',      dotClass: 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.7)]' };
  if (hour >= 17 && hour < 23) return { emoji: '💻', text: 'Coding Labs',       dotClass: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]' };
  return                               { emoji: '⚡', text: 'Recharging',        dotClass: 'bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.7)]' };
};

const getCairoTime = (): string =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());

export const NavStatusBadge: React.FC = () => {
  const [status, setStatus]   = useState<StatusData>(getStatus);
  const [time, setTime]       = useState<string>(getCairoTime);

  useEffect(() => {
    const id = setInterval(() => {
      setStatus(getStatus());
      setTime(getCairoTime());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`
        flex md:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-xl
        bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80
        backdrop-blur-md text-[10px] sm:text-xs font-mono
        transition-colors duration-500 min-w-0 max-w-[210px] sm:max-w-[260px]
      `}
    >
      {/* Live dot */}
      <span className={`shrink-0 h-1.5 w-1.5 rounded-full animate-pulse ${status.dotClass}`} />

      {/* Status text — truncated on very small screens */}
      <span className="text-slate-700 dark:text-slate-300 font-semibold truncate leading-none">
        {status.emoji}&nbsp;{status.text}
      </span>

      {/* Divider */}
      <span className="shrink-0 text-slate-400 dark:text-slate-600 leading-none">|</span>

      {/* Clock */}
      <span className="shrink-0 text-slate-900 dark:text-white font-bold tabular-nums leading-none">
        🕒&nbsp;{time}
      </span>
    </div>
  );
};
