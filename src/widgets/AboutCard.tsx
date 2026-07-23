import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Compass } from 'lucide-react';

type TabKey = 'story' | 'education' | 'philosophy';

interface TextSegment {
  text: string;
  bold?: boolean;
}

interface TabData {
  title: string;
  icon: React.ReactNode;
  segments: TextSegment[];
}

const tabContent: Record<TabKey, TabData> = {
  story: {
    title: 'My Story',
    icon: <Compass size={16} />,
    segments: [
      { text: "I'm a " },
      { text: '19-year-old developer', bold: true },
      { text: " who fell in love with code. For me, programming isn't just about logic—it's an art form. I merge structural efficiency with visual storytelling to create user interfaces that feel " },
      { text: 'alive', bold: true },
      { text: '.' },
    ],
  },
  education: {
    title: 'Education',
    icon: <BookOpen size={16} />,
    segments: [
      { text: "Currently pursuing my Bachelor's degree in " },
      { text: 'Computer Science', bold: true },
      { text: ' at ' },
      { text: 'CIC (Canadian International College)', bold: true },
      { text: '. I focus on algorithms, software architecture, and modern web systems, blending theoretical study with hands-on practice.' },
    ],
  },
  philosophy: {
    title: 'Philosophy',
    icon: <Award size={16} />,
    segments: [
      { text: 'I believe web experiences should be ' },
      { text: 'immersive, lightning-fast, and inclusive', bold: true },
      { text: '. A great interface combines sleek aesthetics with smooth transitions, ensuring every interaction feels ' },
      { text: 'intentional', bold: true },
      { text: ' and satisfying.' },
    ],
  },
};

export const AboutCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('story');

  return (
    <div className="about-widget">
      <div className="widget-tabs">
        {(Object.keys(tabContent) as TabKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            {tabContent[key].icon}
            <span>{tabContent[key].title}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="tab-content"
          >
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              {tabContent[activeTab].segments.map((seg, i) =>
                seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
