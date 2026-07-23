import React, { useState, useEffect } from 'react';
import { Mail, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

export const ProfileCard: React.FC = () => {
  const typingTexts = [
    'Frontend Developer',
    'CS Student @ CIC',
    'Visual Web Architect',
    'React & TS Specialist'
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullText = typingTexts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Finished typing, wait then delete
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  return (
    <div className="profile-widget">
      <div>
        <div className="profile-header-info">
          <div className="avatar-container">
            <div className="avatar-image-placeholder">
              KM
            </div>
            <div className="avatar-online-dot" />
          </div>
          <div>
            <span className="location-display">
              <MapPin size={14} style={{ color: '#ec4899' }} />
              Cairo, Egypt
            </span>
            <div className="location-display" style={{ marginTop: '0.25rem' }}>
              <GraduationCap size={14} style={{ color: '#06b6d4' }} />
              CIC Student
            </div>
          </div>
        </div>

        <div className="profile-intro">
          <h1>Karim Mohamed</h1>
          <div className="tagline">
            &gt; {currentText}
            <span className="typing-cursor" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
          </div>
        </div>

        <p className="profile-bio">
          A 19-year-old <strong>Computer Science student</strong> at CIC (Canadian International College), passionate about crafting high-performance, visually stunning, and highly interactive web experiences.
        </p>
      </div>

      <div className="social-links">
        <a
          href="https://github.com/kariimmohamed412-svg"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title="GitHub Profile"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href="mailto:kariimmohamed412@gmail.com"
          className="social-btn"
          title="Email Me"
        >
          <Mail size={20} />
        </a>
        <a
          href="https://github.com/kariimmohamed412-svg"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          style={{ marginLeft: 'auto', gap: '0.25rem', width: 'auto', padding: '0 1rem', borderRadius: '12px' }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Resume</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
};
