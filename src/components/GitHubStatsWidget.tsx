import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, Users, Eye, ExternalLink } from 'lucide-react';
import { ThemeTweaker } from './ThemeTweaker';
import { isSoundEnabled } from '../utils/sound';

const GITHUB_USERNAME = 'kariimmohamed412-svg';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  name: string | null;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  description: string | null;
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3572a5',
  'C++': '#00599c', CSS: '#264de4', HTML: '#e34f26',
};

// Skeleton pulse block
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-white/10 ${className}`} />
);

// Isolated Audio Context / Sound helper specifically for GitHub Section with lower soft volume (gain 0.04)
let gitHubAudioCtx: AudioContext | null = null;

const playGitHubSoftClick = () => {
  if (!isSoundEnabled()) return;
  try {
    if (typeof window === 'undefined') return;
    if (!gitHubAudioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        gitHubAudioCtx = new AudioCtxClass();
      }
    }
    if (gitHubAudioCtx && gitHubAudioCtx.state === 'suspended') {
      gitHubAudioCtx.resume();
    }
    if (!gitHubAudioCtx) return;

    const osc = gitHubAudioCtx.createOscillator();
    const gain = gitHubAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, gitHubAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, gitHubAudioCtx.currentTime + 0.04);

    // Isolated lower volume (0.04 gain vs global 0.15) for ultra-soft GitHub section feel
    gain.gain.setValueAtTime(0.04, gitHubAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, gitHubAudioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(gitHubAudioCtx.destination);

    osc.start(gitHubAudioCtx.currentTime);
    osc.stop(gitHubAudioCtx.currentTime + 0.04);
  } catch {
    // Fail silently
  }
};

export const GitHubStatsWidget: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=3`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error('GitHub API error');
        const [u, r] = await Promise.all([uRes.json(), rRes.json()]);
        if (!cancelled) { setUser(u); setRepos(r); setLoading(false); }
      } catch {
        if (!cancelled) { setError(true); setLoading(false); }
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="github" className="p-6 md:p-8 glass-card rounded-2xl flex flex-col gap-5 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            GitHub Activity
          </h2>
          <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase">
            LIVE DATA FROM GITHUB API · @{GITHUB_USERNAME}
          </p>
        </div>

        {/* Theme Tweaker / Accent Color Switcher */}
        <ThemeTweaker />
      </div>

      {error && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <GitFork size={28} className="text-slate-400 dark:text-zinc-600" />
          <p className="text-sm font-mono text-slate-500 dark:text-zinc-500">
            GitHub API rate-limited or unreachable.<br />
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playGitHubSoftClick()}
              onClick={() => playGitHubSoftClick()}
              className="underline text-[var(--accent-hex,#22d3ee)] hover:opacity-80 transition-opacity"
            >
              View profile directly →
            </a>
          </p>
        </div>
      )}

      {loading && !error && (
        <div className="flex flex-col gap-4">
          {/* Stat skeletons */}
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-7 w-10" />
              </div>
            ))}
          </div>
          <Skeleton className="h-[100px] w-full rounded-xl" />
          <Skeleton className="h-[100px] w-full rounded-xl" />
        </div>
      )}

      {!loading && !error && user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-5"
        >
          {/* Stat counters */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { label: 'PUBLIC REPOS', value: user.public_repos, icon: <GitFork size={16} className="text-[var(--accent-hex,#22d3ee)]" /> },
              { label: 'FOLLOWERS', value: user.followers, icon: <Users size={16} className="text-emerald-400" /> },
              { label: 'FOLLOWING', value: user.following, icon: <Eye size={16} className="text-violet-400" /> },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                onMouseEnter={() => playGitHubSoftClick()}
                className="group flex flex-col gap-2 p-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl hover:border-[var(--accent-hex,#22d3ee)]/60 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(var(--accent-rgb,34,211,238),0.2)] transition-all duration-300 ease-out cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider group-hover:text-[var(--accent-hex,#22d3ee)] transition-colors duration-300">{label}</span>
                  {icon}
                </div>
                <span className="text-3xl md:text-4xl font-extrabold font-mono text-slate-950 dark:text-white group-hover:text-[var(--accent-hex,#22d3ee)] transition-colors duration-300">
                  {value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Top repos */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">TOP REPOSITORIES</span>
            {repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playGitHubSoftClick()}
                onClick={() => playGitHubSoftClick()}
                className="group flex items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-xl hover:border-[var(--accent-hex,#22d3ee)]/60 hover:shadow-[0_0_20px_rgba(var(--accent-rgb,34,211,238),0.15)] hover:-translate-y-0.5 transition-all duration-300 ease-out"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-mono font-bold text-slate-900 dark:text-zinc-100 group-hover:text-[var(--accent-hex,#22d3ee)] transition-colors duration-200 truncate">
                    {repo.name}
                  </span>
                  {repo.description && (
                    <span className="text-xs text-slate-500 dark:text-zinc-500 truncate">{repo.description}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-zinc-400">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: LANG_COLOR[repo.language] ?? '#94a3b8' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-zinc-400">
                    <Star size={12} className="text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  <ExternalLink size={13} className="text-slate-400 dark:text-zinc-600 group-hover:text-[var(--accent-hex,#22d3ee)] transition-colors duration-200" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};
