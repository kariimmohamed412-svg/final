import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../utils/sound';

// ─── Matrix Rain Canvas ─────────────────────────────────────────────────────

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 13;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノKMOS01∞§Δ∑Ω'.split('');

    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    let rafId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(10,11,16,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22d3ee';
      ctx.font = `${fontSize}px monospace`;

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * -50);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        // Brighter lead character
        ctx.fillStyle = drops[i] * fontSize < canvas.height ? '#a5f3fc' : '#22d3ee';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.6;
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
};

// ─── Terminal CLI ────────────────────────────────────────────────────────────

interface TermLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

const BOOT_LINES = [
  { type: 'output' as const, text: '  ██╗  ██╗███╗   ███╗      ██████╗ ███████╗' },
  { type: 'output' as const, text: '  ██║ ██╔╝████╗ ████║     ██╔═══██╗██╔════╝' },
  { type: 'output' as const, text: '  █████╔╝ ██╔████╔██║     ██║   ██║███████╗' },
  { type: 'output' as const, text: '  ██╔═██╗ ██║╚██╔╝██║     ██║   ██║╚════██║' },
  { type: 'output' as const, text: '  ██║  ██╗██║ ╚═╝ ██║     ╚██████╔╝███████║' },
  { type: 'output' as const, text: '  ╚═╝  ╚═╝╚═╝     ╚═╝      ╚═════╝ ╚══════╝' },
  { type: 'output' as const, text: '' },
  { type: 'success' as const, text: '  KM-OS Terminal v2.4.0  —  Type "help" for commands.' },
  { type: 'output' as const, text: '' },
];

const COMMANDS: Record<string, () => TermLine[]> = {
  help: () => [
    { type: 'output', text: '  Available commands:' },
    { type: 'output', text: '  ─────────────────────────────────────────' },
    { type: 'output', text: '  help       → Show this help menu' },
    { type: 'output', text: '  whoami     → Identity module' },
    { type: 'output', text: '  matrix     → Toggle Matrix rain overlay' },
    { type: 'output', text: '  stack      → Print tech stack' },
    { type: 'output', text: '  secret     → ???' },
    { type: 'output', text: '  clear      → Clear terminal' },
    { type: 'output', text: '  exit       → Close this terminal' },
  ],
  whoami: () => [
    { type: 'success', text: '  > IDENTITY MODULE ACCESSED' },
    { type: 'output', text: '  Name      : Karim Mohamed' },
    { type: 'output', text: '  Role      : Frontend Architect · CS Student @ CIC' },
    { type: 'output', text: '  Location  : Cairo, Egypt (UTC+3)' },
    { type: 'output', text: '  GitHub    : github.com/kariimmohamed412-svg' },
    { type: 'output', text: '  Status    : Actively building premium UIs 🚀' },
  ],
  stack: () => [
    { type: 'success', text: '  > LOADING CAPABILITY MATRIX...' },
    { type: 'output', text: '  [✓] React 18 + TypeScript      · 100%' },
    { type: 'output', text: '  [✓] Tailwind CSS + Framer Motion· 100%' },
    { type: 'output', text: '  [✓] Next.js / Vite / Redux      · 90%' },
    { type: 'output', text: '  [✓] Data Structures & Algorithms · 80%' },
    { type: 'output', text: '  [✓] C++ / OOP Fundamentals      · 75%' },
  ],
  secret: () => [
    { type: 'success', text: '  > CLASSIFIED FILE ACCESSED — CLEARANCE: OMEGA' },
    { type: 'output', text: '  "Code is not written for machines.' },
    { type: 'output', text: '   It is crafted for the human beings who will read it."' },
    { type: 'output', text: '   — Karim Mohamed, 2024' },
    { type: 'output', text: '' },
    { type: 'success', text: '  🎖  Easter Egg #1 discovered. Achievement unlocked.' },
  ],
  matrix: () => [
    { type: 'success', text: '  > MATRIX PROTOCOL TOGGLED' },
  ],
  clear: () => [],
  exit: () => [],
};

interface EasterEggProps {
  open: boolean;
  onClose: () => void;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ open, onClose }) => {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    if (!open) return;
    setLines([]);
    setInput('');
    setHistIdx(-1);

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach(line => {
      timers.push(setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, i++ * 60));
    });
    return () => timers.forEach(clearTimeout);
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Re-focus on click inside terminal
  const focusInput = () => inputRef.current?.focus();

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TermLine[] = [{ type: 'input', text: `  $ ${raw}` }];
    setHistory(h => [raw, ...h]);
    setHistIdx(-1);

    if (cmd === 'exit')  { playClickSound(); onClose(); return; }
    if (cmd === 'clear') { setLines(BOOT_LINES); setInput(''); return; }
    if (cmd === 'matrix') {
      setShowMatrix(s => !s);
      newLines.push({ type: 'success', text: `  > Matrix rain ${showMatrix ? 'disabled' : 'enabled'}` });
      setLines(prev => [...prev, ...newLines]);
      setInput('');
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      playSuccessSound();
      newLines.push(...handler());
    } else {
      newLines.push({ type: 'error', text: `  bash: ${cmd}: command not found. Try "help".` });
    }

    setLines(prev => [...prev, ...newLines]);
    setInput('');
  }, [onClose, showMatrix]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const lineColor: Record<TermLine['type'], string> = {
    input:   'text-[var(--accent-hex,#22d3ee)]',
    output:  'text-slate-300',
    error:   'text-red-400',
    success: 'text-emerald-400',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="ee-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            key="ee-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[8%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-2xl mx-auto px-4"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-[var(--accent-hex,#22d3ee)]/30 shadow-[0_0_60px_rgba(var(--accent-rgb,34,211,238),0.15),0_32px_80px_rgba(0,0,0,0.7)] bg-[#08090f]"
              onClick={focusInput}
            >
              {/* Matrix rain background */}
              {showMatrix && <MatrixRain />}

              {/* macOS traffic-light bar */}
              <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#0d0e16]/90 border-b border-[var(--accent-hex,#22d3ee)]/15">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal size={13} className="text-[var(--accent-hex,#22d3ee)]" />
                  <span className="text-xs font-mono font-semibold text-[var(--accent-hex,#22d3ee)] tracking-widest">
                    KM-OS TERMINAL v2.4.0
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="p-1 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Output area */}
              <div className="relative z-10 h-72 overflow-y-auto py-4 font-mono text-xs leading-relaxed hide-scrollbar">
                {lines.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${lineColor[line.type]}`}>
                    {line.text || '\u00A0'}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-[var(--accent-hex,#22d3ee)]/15 bg-[#0d0e16]/80">
                <span className="text-[var(--accent-hex,#22d3ee)] font-mono text-sm font-bold shrink-0">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-sm font-mono text-[var(--accent-hex,#22d3ee)] caret-[var(--accent-hex,#22d3ee)] placeholder-slate-700"
                  placeholder="type a command…"
                />
                <span className="shrink-0 text-[10px] font-mono text-slate-600 tracking-wider hidden sm:block">ESC to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
