import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Star, ExternalLink } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface Movie {
  title: string;
  rating: number;
  genre: 'trending' | 'action' | 'scifi';
  color: string;
}

export const CineVerseCard: React.FC = () => {
  const [filter, setFilter] = useState<'trending' | 'action' | 'scifi'>('trending');

  const movies: Movie[] = [
    { title: "Dune: Part Two", rating: 4.8, genre: 'scifi', color: 'linear-gradient(135deg, #f59e0b, #78350f)' },
    { title: "Interstellar", rating: 4.9, genre: 'scifi', color: 'linear-gradient(135deg, #1d4ed8, #0b132b)' },
    { title: "Blade Runner 2049", rating: 4.7, genre: 'scifi', color: 'linear-gradient(135deg, #ec4899, #4c0519)' },
    
    { title: "Mad Max: Fury Road", rating: 4.8, genre: 'action', color: 'linear-gradient(135deg, #ea580c, #431407)' },
    { title: "John Wick: Chapter 4", rating: 4.6, genre: 'action', color: 'linear-gradient(135deg, #374151, #111827)' },
    { title: "Top Gun: Maverick", rating: 4.7, genre: 'action', color: 'linear-gradient(135deg, #0284c7, #075985)' },
    
    { title: "Oppenheimer", rating: 4.9, genre: 'trending', color: 'linear-gradient(135deg, #4b5563, #1f2937)' },
    { title: "Spider-Man: Across the Spider-Verse", rating: 4.8, genre: 'trending', color: 'linear-gradient(135deg, #e11d48, #4c0519)' },
    { title: "Everything Everywhere All at Once", rating: 4.7, genre: 'trending', color: 'linear-gradient(135deg, #8b5cf6, #3b0764)' }
  ];

  const filteredMovies = movies.filter(m => m.genre === filter);

  return (
    <div className="cineverse-widget">
      <div>
        <div className="widget-title">
          <Film size={18} style={{ color: '#fb7185' }} />
          <span>Project 2: CineVerse Explorer</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.5' }}>
          An immersive movie discovery dashboard utilizing smooth layouts and dark mode cinematography.
        </p>

        {/* Filter chips */}
        <div className="movie-filters">
          {(['trending', 'action', 'scifi'] as const).map((genre) => (
            <button
              key={genre}
              className={`filter-chip ${filter === genre ? 'active' : ''}`}
              onClick={() => setFilter(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>

        {/* Movie posters grid */}
        <div style={{ marginTop: '1rem', minHeight: '130px' }}>
          <div className="movie-grid">
            <AnimatePresence mode="popLayout">
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="movie-poster-card"
                >
                  <div className="mock-image-container" style={{ background: movie.color }}>
                    <Film size={24} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0 0.25rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                      {movie.title}
                    </div>
                  </div>
                  <div className="movie-overlay">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-rating" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Star size={10} fill="#fbbf24" stroke="none" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Technology Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <span className="skill-tag react" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>React</span>
          <span className="skill-tag next" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>Next.js</span>
          <span className="skill-tag motion" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '6px' }}>Framer Motion</span>
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
          style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#fb7185' }}
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  );
};
