import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { ACCENT_OPTIONS, type AccentKey, useAccent } from '../context/AccentContext';
import { playClickSound } from '../utils/sound';

export const ThemeTweaker: React.FC = () => {
  const { accent, setAccent } = useAccent();
  const [open, setOpen] = useState(false);

  const handleSelect = (key: AccentKey) => {
    playClickSound();
    setAccent(key);
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setOpen(o => !o)}
        title="Accent Color Tweaker"
        className={`p-2.5 rounded-xl border transition-all duration-300 ${
          open
            ? 'border-[var(--accent-hex,#22d3ee)]/60 bg-[var(--accent-hex,#22d3ee)]/10 text-[var(--accent-hex,#22d3ee)] shadow-[0_0_14px_rgba(var(--accent-rgb,34,211,238),0.2)]'
            : 'bg-black/5 dark:bg-white/5 border-black/8 dark:border-white/8 text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
        }`}
      >
        <Palette size={17} />
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop */}
            <div
              className="fixed inset-0 z-[150]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-2.5 z-[151] w-60 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-800/80">
                <div>
                  <p className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                    ACCENT PALETTE / LIVE COLOR TWEAKER
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Color Options */}
              <div className="p-2 flex flex-col gap-1">
                {ACCENT_OPTIONS.map(option => {
                  const isActive = accent.key === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => handleSelect(option.key)}
                      className={`group flex items-center gap-3 w-full p-2 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-slate-800/90 border border-slate-700/60'
                          : 'hover:bg-slate-800/70 border border-transparent'
                      }`}
                    >
                      {/* Color swatch */}
                      <span
                        className="shrink-0 h-4.5 w-4.5 rounded-full border-2 transition-all duration-200"
                        style={{
                          backgroundColor: option.hex,
                          borderColor: isActive ? option.hex : 'rgba(255,255,255,0.2)',
                          boxShadow: isActive
                            ? `0 0 10px ${option.hex}`
                            : 'none',
                        }}
                      />

                      {/* Label */}
                      <span className={`flex-1 text-xs font-mono font-semibold transition-colors duration-200 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {option.label}
                      </span>

                      {/* Active check */}
                      {isActive && (
                        <Check size={14} style={{ color: option.hex }} className="shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Live preview strip */}
              <div className="px-3 pb-3 pt-1">
                <div
                  className="h-1.5 w-full rounded-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${accent.hex}30, ${accent.hex}, ${accent.hex}30)`,
                    boxShadow: `0 0 12px ${accent.hex}80`,
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
