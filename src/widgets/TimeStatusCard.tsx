import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const TimeStatusCard: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const cairoTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTimeString(cairoTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-widget" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: '#10b981' }}>
        <Clock size={28} />
      </div>
      <div className="time-display">{timeString || "12:00:00"}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '0.25rem' }}>
        <div className="pulse-dot" />
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e5e7eb' }}>
          Cairo, EG — Open for projects
        </span>
      </div>
    </div>
  );
};
