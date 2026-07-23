import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Terminal, ExternalLink } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export const DevSpaceCard: React.FC = () => {
  // Pomodoro State
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (pomoActive && pomoTime > 0) {
      interval = setInterval(() => {
        setPomoTime((prev) => prev - 1);
      }, 1000);
    } else if (pomoTime === 0) {
      setPomoActive(false);
      alert("Pomodoro session completed! Time to take a break.");
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoTime]);

  const formatPomoTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetPomo = () => {
    setPomoActive(false);
    setPomoTime(25 * 60);
  };

  // Mock GitHub Commits
  const commitLevels = [0, 1, 2, 3, 4, 1, 0, 2, 4, 3, 1, 0, 2, 2, 3, 4, 1, 0, 3, 2];
  const totalCommits = 412; // In relation to handle kariimmohamed412-svg

  return (
    <div className="devspace-widget">
      <div>
        <div className="widget-title">
          <Terminal size={18} />
          <span>Project 1: DevSpace Dashboard</span>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.5' }}>
          A futuristic developer command center widget board featuring interactive productivity hubs.
        </p>

        {/* Pomodoro Sub-widget */}
        <div className="pomodoro-container">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pomodoro Focus</div>
            <div className="pomodoro-timer">{formatPomoTime(pomoTime)}</div>
          </div>
          <div className="pomodoro-controls">
            <button 
              onClick={() => setPomoActive(!pomoActive)} 
              className={`pomo-btn ${pomoActive ? 'active' : ''}`}
            >
              {pomoActive ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={resetPomo} className="pomo-btn">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* GitHub Visualizer Sub-widget */}
        <div style={{ marginTop: '1rem' }}>
          <div className="contrib-grid-title">
            Contributions Activity (mocking <strong>{totalCommits}</strong> commits/year)
          </div>
          <div className="contrib-grid">
            {commitLevels.map((lvl, i) => (
              <div 
                key={i} 
                className={`contrib-cell level-${lvl}`} 
                title={`Level ${lvl} activity`}
              />
            ))}
          </div>
        </div>

        {/* News Feed Sub-widget */}
        <div style={{ marginTop: '1rem' }}>
          <div className="news-marquee">
            <div className="news-marquee-content">
              🔥 TypeScript 5.5 is live! • Vite 5.0 introduces lightning fast hot reloads • Framer Motion adds new layout-id transitions • React 19 Server Components benchmarked...
            </div>
          </div>
        </div>

        {/* Technology Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <span className="skill-tag react" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>React</span>
          <span className="skill-tag ts" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>Vite</span>
          <span className="skill-tag css" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>CSS Modules</span>
        </div>
      </div>

      <div className="project-links">
        <a 
          href="https://github.com/kariimmohamed412-svg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link"
        >
          <GithubIcon size={16} />
          <span>Source Code</span>
        </a>
        <a 
          href="https://github.com/kariimmohamed412-svg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-link primary"
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
};
