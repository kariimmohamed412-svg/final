import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';
import { setSoundEnabled } from '../utils/sound';

interface SoundCtxType {
  enabled: boolean;
  play: (type?: 'click' | 'tab' | 'success') => void;
  toggle: () => void;
}

const SoundContext = createContext<SoundCtxType>({
  enabled: false,
  play: () => { },
  toggle: () => { },
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start MUTED on page load/refresh — sound only activates on manual user click.
  // (We still write the preference to localStorage on toggle for within-session UX,
  //  but we never auto-play on mount, satisfying both Autoplay Policy and the user's request.)
  const [enabled, setEnabled] = useState<boolean>(false);


  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setSoundEnabled(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', enabled ? 'true' : 'false');
    }
  }, [enabled]);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const play = useCallback((type: 'click' | 'tab' | 'success' = 'click') => {
    if (localStorage.getItem('soundEnabled') !== 'true') return;
    try {
      const ctx = getCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const sr = ctx.sampleRate;
      const dur = type === 'success' ? 0.12 : 0.04;
      const bufferSize = Math.floor(sr * dur);
      const buffer = ctx.createBuffer(1, bufferSize, sr);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / sr;
        const decay = Math.pow(1 - i / bufferSize, type === 'click' ? 5 : 9);
        if (type === 'success') {
          data[i] = Math.sin(2 * Math.PI * 1046.5 * t) * decay * 0.25;
        } else if (type === 'tab') {
          data[i] = (Math.random() * 2 - 1) * decay * 0.3;
        } else {
          data[i] = (Math.random() * 2 - 1) * decay * 0.55;
        }
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = type === 'click' ? 'highpass' : 'bandpass';
      filter.frequency.value = type === 'click' ? 2200 : 1400;
      filter.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.value = 0.5;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {
      /* silent fail */
    }
  }, []);

  const toggle = () => {
    getCtx();
    setEnabled((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      if (typeof window !== 'undefined') {
        localStorage.setItem('soundEnabled', next ? 'true' : 'false');
      }
      return next;
    });
  };

  return (
    <SoundContext.Provider value={{ enabled, play, toggle }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useAudio = () => useContext(SoundContext);
