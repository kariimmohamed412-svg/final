import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export const SpotifyCard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="spotify-widget" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', height: '100%' }}>
      <div 
        className="spotify-album-art" 
        style={{ 
          animationPlayState: isPlaying ? 'running' : 'paused'
        }}
      >
        <div className="spotify-album-center" />
      </div>

      <div className="spotify-info">
        <div className="spotify-title" title="Synthetic Dreams">Resonance</div>
        <div className="spotify-artist">Home (Synthwave)</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: 'rgba(29, 185, 84, 0.15)',
              border: '1px solid rgba(29, 185, 84, 0.3)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1db954',
              transition: 'all 0.2s ease',
            }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={12} fill="#1db954" /> : <Play size={12} fill="#1db954" style={{ marginLeft: '1px' }} />}
          </button>

          {isPlaying && (
            <div className="spotify-visualizer">
              <div className="visualizer-bar" style={{ animationPlayState: 'running' }} />
              <div className="visualizer-bar" style={{ animationPlayState: 'running' }} />
              <div className="visualizer-bar" style={{ animationPlayState: 'running' }} />
              <div className="visualizer-bar" style={{ animationPlayState: 'running' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
