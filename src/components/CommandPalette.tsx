import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Terminal, Download, Mail, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { playClickSound } from '../utils/sound';

interface CommandItem {
  id: string;
  group: 'Navigation' | 'Actions';
  label: string;
  description?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const { play, enabled: audioEnabled, toggle: toggleAudio } = useAudio();
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const commands: CommandItem[] = [
    { id: 'nav-hero',     group: 'Navigation', label: 'About',      description: 'Hero & identity',          icon: <ChevronRight size={14} />, onSelect: () => scrollTo('hero') },
    { id: 'nav-stack',    group: 'Navigation', label: 'Tech Stack', description: 'Skills & capabilities',    icon: <ChevronRight size={14} />, onSelect: () => scrollTo('tech-stack') },
    { id: 'nav-projects', group: 'Navigation', label: 'Projects',   description: 'Production lab',           icon: <ChevronRight size={14} />, onSelect: () => scrollTo('project-workspace') },
    { id: 'nav-metrics',  group: 'Navigation', label: 'Metrics',    description: 'Lighthouse statistics',    icon: <ChevronRight size={14} />, onSelect: () => scrollTo('lighthouse-stats') },
    { id: 'nav-contact',  group: 'Navigation', label: 'Contact',    description: 'Get in touch',             icon: <ChevronRight size={14} />, onSelect: () => scrollTo('contact-form') },
    {
      id: 'act-cv', group: 'Actions', label: 'Download CV',
      description: 'Get the secure dossier PDF',
      icon: <Download size={14} />,
      onSelect: () => { onClose(); play('success'); alert('CV download initiated!'); },
    },
    {
      id: 'act-email', group: 'Actions', label: 'Copy Email',
      description: 'kareemmmohme1@gmail.com',
      icon: <Mail size={14} />,
      onSelect: () => {
        navigator.clipboard.writeText('kareemmmohme1@gmail.com').catch(() => {});
        play('success'); onClose();
      },
    },
    {
      id: 'act-audio', group: 'Actions',
      label: audioEnabled ? 'Disable UI Audio' : 'Enable UI Audio',
      description: audioEnabled ? 'Click to mute all sounds' : 'Click to enable sounds',
      icon: audioEnabled ? <VolumeX size={14} /> : <Volume2 size={14} />,
      onSelect: () => { toggleAudio(); onClose(); },
    },
  ];

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        (c.description ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Clamp selection when filter changes
  useEffect(() => setSelected(0), [query]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape')       { onClose(); return; }
    if (e.key === 'ArrowDown')    { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')      { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) {
      playClickSound();
      play('click');
      filtered[selected].onSelect();
    }
  }, [open, filtered, selected, onClose, play]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  // Group render helper
  const groups: Array<'Navigation' | 'Actions'> = ['Navigation', 'Actions'];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="cp-panel"
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg mx-auto px-4"
          >
            <div className="rounded-2xl bg-white/95 dark:bg-[#0e0f18]/96 border border-slate-200 dark:border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden">

              {/* Search bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-white/5">
                <Search size={17} className="text-slate-400 dark:text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-sm font-mono text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none"
                />
                <div className="flex items-center gap-1.5">
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-zinc-400">ESC</kbd>
                  <button onClick={onClose} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 dark:text-zinc-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Command list */}
              <div ref={listRef} className="max-h-72 overflow-y-auto py-2 hide-scrollbar">
                {filtered.length === 0 && (
                  <div className="px-4 py-8 text-center text-xs font-mono text-slate-400 dark:text-zinc-600">
                    No commands match "{query}"
                  </div>
                )}

                {groups.map(group => {
                  const groupItems = filtered.filter(c => c.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <div key={group}>
                      <div className="px-4 pt-3 pb-1">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-400 dark:text-zinc-600">
                          {group}
                        </span>
                      </div>
                      {groupItems.map(cmd => {
                        const globalIdx = filtered.indexOf(cmd);
                        const isActive = globalIdx === selected;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => { playClickSound(); play('click'); cmd.onSelect(); }}
                            onMouseEnter={() => setSelected(globalIdx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 ${
                              isActive
                                ? 'bg-[var(--accent-hex,#22d3ee)]/10 text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                          >
                            <span className={`shrink-0 p-1.5 rounded-lg transition-colors duration-150 ${
                              isActive
                                ? 'bg-[var(--accent-hex,#22d3ee)]/20 text-[var(--accent-hex,#22d3ee)]'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400'
                            }`}>
                              {cmd.icon}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-sm font-mono font-semibold leading-tight">{cmd.label}</span>
                              {cmd.description && (
                                <span className="block text-xs text-slate-500 dark:text-zinc-500 truncate mt-0.5">{cmd.description}</span>
                              )}
                            </span>
                            {isActive && (
                              <kbd className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--accent-hex,#22d3ee)]/10 border border-[var(--accent-hex,#22d3ee)]/30 text-[var(--accent-hex,#22d3ee)]">
                                ENTER
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-slate-400 dark:text-zinc-600" />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 tracking-wider">KM-OS CMD PALETTE v1.0</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-zinc-600">
                  <span>↑↓ navigate</span>
                  <span>·</span>
                  <span>↵ select</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
