import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string;
}

export const TerminalCard: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: 'system-init', output: 'System initialized. Type "help" to list available commands.' }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = '';
    switch (cmd) {
      case 'help':
        output = 'Available commands:\n  about       - Tell me about Karim Mohamed\n  skills      - Show frontend tech stack\n  contact     - Display contact details\n  clear       - Clear terminal history\n  easter-egg  - Reveal a secret quote';
        break;
      case 'about':
        output = 'Karim Mohamed is a 19-year-old Computer Science student at CIC. Specializes in building modern React/Next.js interfaces.';
        break;
      case 'skills':
        output = 'Core: HTML5, CSS3, JS, TS\nFrameworks: React, Next.js, Redux\nStyling: Tailwind, Framer Motion\nTools: Git, Vite, npm';
        break;
      case 'contact':
        output = 'GitHub: github.com/kariimmohamed412-svg\nEmail: kariimmohamed412@gmail.com\nDiscord: kariim_412';
        break;
      case 'easter-egg':
        output = '🚀 "First, solve the problem. Then, write the code." — John Johnson';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not found: "${cmd}". Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div className="terminal-widget" style={{ height: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="widget-title" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        <Terminal size={20} style={{ color: '#c084fc' }} />
        <span>KarimOS Terminal v1.0</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '200px' }}>
        {history.map((item, i) => (
          <div key={i}>
            <div style={{ color: '#a855f7', fontWeight: 600 }}>guest@karimos:~$ <span style={{ color: 'white' }}>{item.command}</span></div>
            <div style={{ color: '#9ca3af', whiteSpace: 'pre-wrap', marginTop: '0.25rem', lineHeight: '1.5' }}>{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleCommand} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#a855f7', marginRight: '6px', whiteSpace: 'nowrap', fontWeight: 700 }}>guest@karimos:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}
          placeholder="type help..."
        />
      </form>
    </div>
  );
};
