import { useEffect } from 'react';

/**
 * Tracks the global mouse position and updates CSS custom properties
 * (--mouse-x, --mouse-y) on every .glass-card element so the
 * spotlight radial gradient in index.css follows the cursor.
 */
export function useSpotlight() {
  useEffect(() => {
    let frameId: number;

    const update = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>('.glass-card');
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
      });
    };

    window.addEventListener('mousemove', update, { passive: true });
    return () => {
      window.removeEventListener('mousemove', update);
      cancelAnimationFrame(frameId);
    };
  }, []);
}
