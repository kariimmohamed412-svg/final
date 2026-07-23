import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from 'react';

export type AccentKey = 'cyan' | 'emerald' | 'violet' | 'amber' | 'crimson';

interface AccentOption {
  key: AccentKey;
  label: string;
  hex: string;        // primary glow hex
  rgb: string;        // for rgba(...) usage
  tailwindBorder: string;
  tailwindText: string;
  tailwindBg: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { key: 'cyan',    label: 'Electric Cyan',  hex: '#22d3ee', rgb: '34,211,238',   tailwindBorder: 'border-cyan-400',   tailwindText: 'text-cyan-400',   tailwindBg: 'bg-cyan-400'   },
  { key: 'emerald', label: 'Emerald Green',  hex: '#34d399', rgb: '52,211,153',   tailwindBorder: 'border-emerald-400',tailwindText: 'text-emerald-400',tailwindBg: 'bg-emerald-400'},
  { key: 'violet',  label: 'Neon Violet',    hex: '#a78bfa', rgb: '167,139,250',  tailwindBorder: 'border-violet-400', tailwindText: 'text-violet-400', tailwindBg: 'bg-violet-400' },
  { key: 'amber',   label: 'Amber Orange',   hex: '#fbbf24', rgb: '251,191,36',   tailwindBorder: 'border-amber-400',  tailwindText: 'text-amber-400',  tailwindBg: 'bg-amber-400'  },
  { key: 'crimson', label: 'Crimson Red',    hex: '#f87171', rgb: '248,113,113',  tailwindBorder: 'border-red-400',    tailwindText: 'text-red-400',    tailwindBg: 'bg-red-400'    },
];

interface AccentContextType {
  accent: AccentOption;
  setAccent: (key: AccentKey) => void;
}

const AccentContext = createContext<AccentContextType>({
  accent: ACCENT_OPTIONS[0],
  setAccent: () => {},
});

export const AccentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentKey, setAccentKey] = useState<AccentKey>(() => {
    const saved = localStorage.getItem('accentColor') as AccentKey | null;
    return saved && ACCENT_OPTIONS.find(a => a.key === saved) ? saved : 'cyan';
  });

  const accent = ACCENT_OPTIONS.find(a => a.key === accentKey)!;

  // Inject CSS variable on every change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-hex', accent.hex);
    root.style.setProperty('--accent-rgb', accent.rgb);
    localStorage.setItem('accentColor', accentKey);
  }, [accentKey, accent]);

  const setAccent = useCallback((key: AccentKey) => setAccentKey(key), []);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
};

export const useAccent = () => useContext(AccentContext);
