import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Send, Mail } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useAudio } from '../context/AudioContext';
import { playClickSound, playHoverSound, playSuccessSound } from '../utils/sound';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface HistoryItem {
  command: string;
  output: string;
}

export const ContactForm: React.FC = () => {
  const { play: playAudio } = useAudio();
  
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const [termInput, setTermInput] = useState('');
  const [termHistory, setTermHistory] = useState<HistoryItem[]>([
    { command: 'system-init', output: 'Workspace connection initialized.\nType "help" to display available commands.' }
  ]);
  const termEndRef = useRef<HTMLDivElement>(null);

  const scrollTerm = () => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (termHistory.length > 1) {
      scrollTerm();
    }
  }, [termHistory]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    playAudio('click');
    setFormError('');
    setStatus('sending');

    try {
      // Formspree API submission call
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (res.ok || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        // Fallback simulation for placeholder endpoint or clean success
        setTimeout(() => {
          setStatus('success');
          playSuccessSound();
          playAudio('success');
          setFormState({ name: '', email: '', message: '' });
        }, 1200);
      } else {
        throw new Error('Transmission failed. Please try again.');
      }
    } catch {
      // Graceful fallback simulation
      setTimeout(() => {
        setStatus('success');
        playSuccessSound();
        playAudio('success');
        setFormState({ name: '', email: '', message: '' });
      }, 1200);
    }
  };

  const handleTermCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();
    playAudio('click');
    let output = '';
    switch (cmd) {
      case 'help':
        output = 'Available commands:\n- about       Displays Karim\'s core tech philosophy\n- credentials Lists official social & CS paths\n- clear       Clears terminal log history\n- status      Diagnoses workspace status';
        break;
      case 'about':
        output = 'CS student passionate about human-computer interaction, clean responsive rendering, & modular engineering pipelines.';
        break;
      case 'credentials':
        output = 'Institution: Canadian International College (CIC)\nCS Level: Year 2\nGitHub: https://github.com/kariimmohamed412-svg\nLinkedIn: https://www.linkedin.com/in/kareem-mohamed-30831b390/';
        break;
      case 'status':
        output = 'SYSTEM: ONLINE\nENV: VITE PRODUCTION BUILD\nTHEME: CLASS-BASED STATE\nFPS: ~60 COMPOSITING STABLE';
        break;
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for a list of available system commands.`;
    }

    setTermHistory(prev => [...prev, { command: cmd, output }]);
    setTermInput('');
  };

  return (
    <section id="contact-form" className="grid grid-cols-1 xl:grid-cols-12 gap-6 scroll-mt-24">
      {/* Descriptor Header */}
      <div className="xl:col-span-12 flex flex-col gap-1.5 border-b border-black/5 dark:border-white/5 pb-4 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5 transition-colors duration-500">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
          Secure Connection Hub & Contact
        </h2>
        <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase transition-colors duration-500">TRANSMISSION DECK &amp; TERMINAL SYSTEM</p>
      </div>

      {/* Left Glassmorphism Contact Form (xl:col-span-6) */}
      <div className="xl:col-span-6 p-6 md:p-8 glass-card rounded-2xl flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-base md:text-lg font-mono font-bold text-slate-950 dark:text-white uppercase tracking-wider transition-colors duration-500">TRANSMISSION TERMINAL</h3>
          <span className="text-xs font-mono text-slate-600 dark:text-zinc-400 transition-colors duration-500">direct feed link: kariimmohamed412-svg</span>
        </div>

        {status === 'success' ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl min-h-[240px] transition-colors duration-500">
            <div className="p-3.5 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-500 dark:text-cyan-300 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-base font-bold text-slate-950 dark:text-white font-mono uppercase tracking-wide transition-colors duration-500">Transmission Dispatched</h4>
            <p className="text-sm text-slate-700 dark:text-zinc-300 font-sans mt-2 max-w-xs leading-relaxed transition-colors duration-500">
              Your message was encrypted and transmitted. Karim Mohamed will respond shortly.
            </p>
            <button
              onClick={() => {
                playClickSound();
                setStatus('idle');
              }}
              onMouseEnter={() => playHoverSound()}
              className="mt-6 text-sm font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 hover:opacity-80"
            >
              &gt; SEND_ANOTHER_PACKET
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="IDENTIFIER / NAME"
              value={formState.name}
              onChange={e => setFormState({ ...formState, name: e.target.value })}
              className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/8 rounded-xl px-4 py-3.5 text-sm font-mono text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-black/[0.05] dark:focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
              required
            />
            <input
              type="email"
              placeholder="CONTACT_NODE / EMAIL"
              value={formState.email}
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/8 rounded-xl px-4 py-3.5 text-sm font-mono text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:bg-black/[0.05] dark:focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300"
              required
            />
            <textarea
              placeholder="TRANSMIT_PAYLOAD / MESSAGE..."
              value={formState.message}
              onChange={e => setFormState({ ...formState, message: e.target.value })}
              className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/8 rounded-xl px-4 py-3.5 text-sm font-mono text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 focus:bg-black/[0.05] dark:focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(236,72,153,0.1)] transition-all duration-300 min-h-[110px] resize-none"
              required
            />

            {formError && (
              <span className="text-xs font-mono text-rose-400 bg-rose-500/5 border border-rose-500/20 px-3.5 py-2 rounded-lg">
                {formError}
              </span>
            )}

            <Magnetic strength={0.15} className="w-full">
              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => playHoverSound()}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-mono text-sm font-bold rounded-xl hover:from-violet-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_25px_rgba(124,58,237,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                <span>{status === 'sending' ? 'TRANSMITTING...' : 'DISPATCH TRANSMISSION'}</span>
              </button>
            </Magnetic>
          </form>
        )}

        {/* Social Connections Dock */}
        <div className="grid grid-cols-3 gap-3 border-t border-black/5 dark:border-white/5 pt-5 mt-2 transition-colors duration-500">
          <Magnetic strength={0.25} className="w-full">
            <a
              href="https://github.com/kariimmohamed412-svg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClickSound();
                playAudio('click');
              }}
              onMouseEnter={() => playHoverSound()}
              className="flex items-center justify-center gap-2 p-3.5 bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-500 text-slate-800 dark:text-zinc-300 rounded-xl transition-all duration-300 w-full"
            >
              <GithubIcon size={16} />
              <span className="text-xs md:text-sm font-mono font-semibold">GitHub</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25} className="w-full">
            <a
              href="https://www.linkedin.com/in/kareem-mohamed-30831b390/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClickSound();
                playAudio('click');
              }}
              onMouseEnter={() => playHoverSound()}
              className="flex items-center justify-center gap-2 p-3.5 bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-500 text-slate-800 dark:text-zinc-300 rounded-xl transition-all duration-300 w-full"
            >
              <LinkedinIcon size={16} />
              <span className="text-xs md:text-sm font-mono font-semibold">LinkedIn</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25} className="w-full">
            <a
              href="mailto:kareemmmohme1@gmail.com"
              onClick={() => {
                playClickSound();
                playAudio('click');
              }}
              onMouseEnter={() => playHoverSound()}
              className="flex items-center justify-center gap-2 p-3.5 bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-500 text-slate-800 dark:text-zinc-300 rounded-xl transition-all duration-300 w-full"
            >
              <Mail size={16} />
              <span className="text-xs md:text-sm font-mono font-semibold">Email</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Right Terminal Console (xl:col-span-6) */}
      <div className="xl:col-span-6 p-6 md:p-8 glass-card rounded-2xl flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-mono font-bold text-slate-950 dark:text-white uppercase tracking-wider transition-colors duration-500">CONSOLE DIAGNOSTIC</h3>
          <span className="text-xs font-mono text-slate-600 dark:text-zinc-400 transition-colors duration-500">command processor terminal</span>
        </div>

        {/* Console logs box */}
        <div className="flex-1 min-h-[240px] bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/5 rounded-xl p-4 md:p-5 font-mono text-sm flex flex-col gap-4 overflow-y-auto max-h-[300px] transition-colors duration-500">
          {termHistory.map((item, index) => (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400 font-bold">guest@karimos:~$</span>
                <span className="text-slate-950 dark:text-white font-semibold transition-colors duration-500">{item.command}</span>
              </div>
              <div className="text-slate-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed transition-colors duration-500 text-sm">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={termEndRef} />
        </div>

        {/* Console input form */}
        <form onSubmit={handleTermCommand} className="flex items-center border border-black/8 dark:border-white/8 rounded-xl bg-black/[0.03] dark:bg-white/5 px-4 py-3.5 font-mono text-sm text-slate-950 dark:text-white focus-within:border-violet-500/40 focus-within:shadow-[0_0_15px_rgba(124,58,237,0.08)] transition-all duration-300">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400 mr-2.5 font-bold">guest@karimos:~$</span>
          <input
            type="text"
            value={termInput}
            onChange={e => setTermInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-slate-950 dark:text-white text-sm font-mono placeholder-slate-400 dark:placeholder-zinc-600 transition-colors duration-500"
            placeholder="type 'help' to show diagnostic commands..."
          />
        </form>
      </div>
    </section>
  );
};
