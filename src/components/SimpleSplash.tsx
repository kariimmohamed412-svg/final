import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SimpleSplashProps {
  onComplete: () => void;
}

export const SimpleSplash: React.FC<SimpleSplashProps> = ({ onComplete }) => {
  useEffect(() => {
    // Hold for 1.5 seconds before triggering exit transition
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="simple-splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#f8fafc] text-slate-950 dark:bg-[#0a0b10] dark:text-white select-none transition-colors duration-500"
    >
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl font-semibold tracking-tight font-sans"
      >
        Hello! Karim.
      </motion.h1>
    </motion.div>
  );
};
