import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface Skill {
  name: string;
  category: 'core' | 'framework' | 'styling' | 'tool';
  className: string;
  desc: string;
}

export const SkillsCard: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    { name: 'React.js', category: 'framework', className: 'react', desc: 'Building complex SPAs using custom hooks, context, and state management.' },
    { name: 'TypeScript', category: 'core', className: 'ts', desc: 'Enforcing compiler safety, types, interfaces, and predictive autocompletes.' },
    { name: 'JavaScript', category: 'core', className: 'js', desc: 'Core ES6+, closures, async promises, event loops, and DOM control.' },
    { name: 'Next.js', category: 'framework', className: 'next', desc: 'Rendering static sites (SSG) & servers (SSR) with router optimizations.' },
    { name: 'Tailwind CSS', category: 'styling', className: 'tailwind', desc: 'Rapid utility styling, complex grids, flexboxes, and media styling.' },
    { name: 'Framer Motion', category: 'styling', className: 'motion', desc: 'Creating physics-based smooth page transitions and gesture controls.' },
    { name: 'Redux Toolkit', category: 'framework', className: 'react', desc: 'Managing global app states, slice reducers, and thunk dispatches.' },
    { name: 'HTML5', category: 'core', className: 'html', desc: 'Structuring semantic documents, accessibility (ARIA), and local storage.' },
    { name: 'CSS3', category: 'core', className: 'css', desc: 'Writing modular animations, variables, transitions, and flexible layouts.' },
    { name: 'Git', category: 'tool', className: 'git', desc: 'Handling branch rebasing, merging, staging, commits, and logs.' },
    { name: 'GitHub', category: 'tool', className: 'next', desc: 'Managing repositories, issue trackers, pulls, actions, and projects.' },
    { name: 'Vite', category: 'tool', className: 'tailwind', desc: 'Configuring bundling systems, dev servers, and fast HMR pipelines.' },
    { name: 'npm / yarn', category: 'tool', className: 'ts', desc: 'Installing scripts, dependency locks, and managing registry packages.' },
    { name: 'CSS Modules', category: 'styling', className: 'css', desc: 'Localizing classes scope to components, eliminating styling conflicts.' }
  ];

  const currentDesc = skills.find(s => s.name === hoveredSkill)?.desc || 'Hover over a technology to see my usage...';

  return (
    <div className="skills-widget">
      <div className="widget-title">
        <Layers size={18} />
        <span>Core Tech Stack</span>
      </div>
      
      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`skill-tag ${skill.className}`}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <span 
              className="skill-indicator"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'currentColor',
                display: 'inline-block',
                marginRight: '0.4rem'
              }}
            />
            {skill.name}
          </div>
        ))}
      </div>

      <div 
        style={{ 
          marginTop: '1.25rem', 
          fontSize: '0.85rem', 
          color: hoveredSkill ? 'var(--text-primary)' : 'var(--text-muted)', 
          fontFamily: 'var(--font-mono)',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.03)',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          minHeight: '42px',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.2s ease'
        }}
      >
        {currentDesc}
      </div>
    </div>
  );
};
