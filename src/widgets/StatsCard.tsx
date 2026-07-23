import React, { useEffect, useState } from 'react';

interface Stat {
  label: string;
  target: number;
  suffix: string;
}

export const StatsCard: React.FC = () => {
  const statsList: Stat[] = [
    { label: "Years Old", target: 19, suffix: "" },
    { label: "Passion Level", target: 100, suffix: "%" },
    { label: "Core Frameworks", target: 4, suffix: "+" },
    { label: "Lines of Code", target: 10, suffix: "k+" }
  ];

  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds animation
    const steps = 60;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounts(() => {
        return statsList.map((stat) => {
          const value = Math.round((stat.target / steps) * stepCount);
          return value > stat.target ? stat.target : value;
        });
      });

      if (stepCount >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="stats-grid">
      {statsList.map((stat, index) => (
        <div key={stat.label} className="stat-item">
          <div className="stat-number">
            {counts[index]}
            {stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
