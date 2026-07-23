import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface SplashScreenProps {
  onComplete: () => void;
}

const TERMINAL_LOGS = [
  "> KM_OS_v2.4.0 initialization sequence started...",
  "> Loading CIC CS Core Modules... [DONE]",
  "> Fetching LeetCode & Bento Grid components... [DONE]",
  "> ACCESS GRANTED: Welcome to Karim Mohamed's Digital Workspace 🚀"
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const { play: playAudio } = useAudio();

  // Progress Bar ticker (0% -> 100% in ~2.5s)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  // Line-by-line terminal typing sequence
  useEffect(() => {
    if (currentLineIndex < TERMINAL_LOGS.length) {
      const lineTimeout = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, TERMINAL_LOGS[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 550);

      return () => clearTimeout(lineTimeout);
    }
  }, [currentLineIndex]);

  // Auto-dismiss safety after progress completes
  useEffect(() => {
    if (isReady) {
      const autoDismiss = setTimeout(() => {
        onComplete();
      }, 3500);
      return () => clearTimeout(autoDismiss);
    }
  }, [isReady, onComplete]);

  const handleEnterWorkspace = () => {
    try {
      playAudio('success');
    } catch {
      // Audio fallback
    }
    onComplete();
  };

  return (
    <motion.div
      key="splash-screen"
      initial={{ opacity: 1, y: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] bg-[#0a0b10] flex flex-col justify-center items-center font-mono p-6 select-none overflow-hidden"
    >
      {/* CRT Scanline Overlay Effect */}
      <div className="absolute inset-0 crt-overlay pointer-events-none z-20 opacity-70" />

      {/* Cyberpunk Radial Backdrop Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-[#0e1017]/90 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden backdrop-blur-xl"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950/80 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wider">
            <Terminal size={14} className="animate-pulse" />
            <span>KM_OS_BOOT_SEQUENCE.sh</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <Shield size={12} className="text-cyan-400" />
            <span>ENCRYPTED</span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 md:p-8 space-y-6 text-xs md:text-sm leading-relaxed min-h-[260px] flex flex-col justify-between">

          {/* Animated Log Output */}
          <div className="space-y-3">
            {displayedLogs.map((log, idx) => {
              const isAccessGranted = log.includes("ACCESS GRANTED");
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2 ${isAccessGranted
                    ? 'text-emerald-400 font-bold text-sm md:text-base drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                    : 'text-cyan-300/90'
                    }`}
                >
                  <span className="shrink-0">{log}</span>
                </motion.div>
              );
            })}

            {/* Blinking Cursor line */}
            {currentLineIndex < TERMINAL_LOGS.length && (
              <div className="flex items-center gap-1 text-cyan-400">
                <span>&gt;</span>
                <span className="w-2 h-4 bg-cyan-400 animate-cursor-blink inline-block" />
              </div>
            )}
          </div>

          {/* Progress Bar & Status section */}
          <div className="space-y-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2 text-zinc-400">
                {isReady ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 size={14} /> SYSTEM READY
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Sparkles size={14} className="animate-spin" /> INITIALIZING ENVIRONMENT...
                  </span>
                )}
              </span>
              <span className="text-cyan-400 font-bold tracking-widest">{progress}%</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="h-2.5 w-full bg-zinc-950 border border-cyan-500/30 rounded-full overflow-hidden p-0.5 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Interactive Enter Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleEnterWorkspace}
                disabled={!isReady}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 ${isReady
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-zinc-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed opacity-60'
                  }`}
              >
                <span>[ ENTER KM_OS ]</span>
                <ArrowRight size={14} className={isReady ? 'animate-bounce-x' : ''} />
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};
