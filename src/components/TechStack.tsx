import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, Cpu, Code2, Layers, Wrench, GraduationCap } from 'lucide-react';
import { playHoverSound } from '../utils/sound';

interface Skill {
  name: string;
  glowColor: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  code: string;
  icon: React.ReactNode;
  skills: Skill[];
}

// Memoized Skill Badge Component for 60+ FPS Rendering
const SkillBadge: React.FC<{ skill: Skill }> = memo(({ skill }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.1, delay: 0, ease: 'easeOut' }}
    onMouseEnter={() => playHoverSound()}
    className={`flex items-center gap-2 px-4 py-2.5 bg-slate-100/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-sm font-mono font-semibold text-slate-800 dark:text-zinc-200 transition-all duration-75 ease-out transform-gpu cursor-pointer select-none ${skill.glowColor}`}
  >
    {skill.icon}
    <span>{skill.name}</span>
  </motion.div>
));

SkillBadge.displayName = 'SkillBadge';

export const TechStack: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Languages',
      code: 'LANE_01 // CORE_LANG',
      icon: <Code2 size={18} className="text-violet-400" />,
      skills: [
        { name: 'JavaScript (ES6+)', glowColor: 'hover:border-[#f7df1e]/70 hover:text-[#f7df1e] hover:shadow-[0_0_15px_rgba(247,223,30,0.2)]', icon: <Terminal size={14} /> },
        { name: 'TypeScript', glowColor: 'hover:border-[#3178c6]/70 hover:text-[#3178c6] hover:shadow-[0_0_15px_rgba(49,120,198,0.25)]', icon: <Shield size={14} /> },
        { name: 'HTML5 / CSS3', glowColor: 'hover:border-[#e34f26]/70 hover:text-[#e34f26] hover:shadow-[0_0_15px_rgba(227,79,38,0.2)]', icon: <Zap size={14} /> },
        { name: 'C++', glowColor: 'hover:border-[#00599c]/70 hover:text-[#00599c] hover:shadow-[0_0_15px_rgba(0,89,156,0.25)]', icon: <Cpu size={14} /> },
      ]
    },
    {
      title: 'Frameworks & Libraries',
      code: 'LANE_02 // FRAMEWORKS',
      icon: <Layers size={18} className="text-cyan-400" />,
      skills: [
        { name: 'React.js', glowColor: 'hover:border-[#00d8ff]/70 hover:text-[#00d8ff] hover:shadow-[0_0_15px_rgba(0,216,255,0.25)]' },
        { name: 'Next.js', glowColor: 'hover:border-white/70 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' },
        { name: 'Tailwind CSS', glowColor: 'hover:border-[#38bdf8]/70 hover:text-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]' },
        { name: 'Framer Motion', glowColor: 'hover:border-[#ff007f]/70 hover:text-[#ff007f] hover:shadow-[0_0_15px_rgba(255,0,127,0.25)]' },
        { name: 'Redux Toolkit', glowColor: 'hover:border-[#764abc]/70 hover:text-[#764abc] hover:shadow-[0_0_15px_rgba(118,74,188,0.25)]' },
      ]
    },
    {
      title: 'Tools & Platforms',
      code: 'LANE_03 // TOOLING',
      icon: <Wrench size={18} className="text-emerald-400" />,
      skills: [
        { name: 'Git & GitHub', glowColor: 'hover:border-[#f05032]/70 hover:text-[#f05032] hover:shadow-[0_0_15px_rgba(240,80,50,0.25)]' },
        { name: 'Vite', glowColor: 'hover:border-[#646cff]/70 hover:text-[#646cff] hover:shadow-[0_0_15px_rgba(100,108,255,0.25)]' },
        { name: 'npm / Package Managers', glowColor: 'hover:border-[#cb3837]/70 hover:text-[#cb3837] hover:shadow-[0_0_15px_rgba(203,56,55,0.25)]' },
        { name: 'VS Code & Dev Tools', glowColor: 'hover:border-[#007acc]/70 hover:text-[#007acc] hover:shadow-[0_0_15px_rgba(0,122,204,0.25)]' },
      ]
    },
    {
      title: 'CS Fundamentals',
      code: 'LANE_04 // THEORY',
      icon: <GraduationCap size={18} className="text-amber-400" />,
      skills: [
        { name: 'Data Structures & Algorithms', glowColor: 'hover:border-[#f59e0b]/70 hover:text-[#f59e0b] hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]' },
        { name: 'Object-Oriented Programming (OOP)', glowColor: 'hover:border-[#10b981]/70 hover:text-[#10b981] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]' },
        { name: 'Operating Systems Basics', glowColor: 'hover:border-[#8b5cf6]/70 hover:text-[#8b5cf6] hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]' },
        { name: 'Web Performance Optimization', glowColor: 'hover:border-[#ec4899]/70 hover:text-[#ec4899] hover:shadow-[0_0_15px_rgba(236,72,153,0.25)]' },
      ]
    }
  ];

  return (
    <section id="tech-stack" className="p-6 md:p-8 glass-card rounded-2xl flex flex-col gap-6 scroll-mt-24 transform-gpu">
      {/* Section Header */}
      <div className="flex flex-col gap-1.5 border-b border-black/5 dark:border-white/5 pb-4 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5 transition-colors duration-500">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
          Glowing Tech Stack & Capabilities
        </h2>
        <p className="text-xs md:text-sm font-mono text-slate-600 dark:text-zinc-400 tracking-wider uppercase transition-colors duration-500">ENGINEERING CAPABILITIES MATRIX</p>
      </div>

      {/* Structured Category Lanes */}
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-2xl hover:border-black/10 dark:hover:border-white/10 transition-all duration-75 ease-out transform-gpu"
          >
            {/* Category Descriptor */}
            <div className="lg:col-span-4 flex items-center gap-3.5">
              <div className="p-3 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-colors duration-500">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-950 dark:text-slate-100 transition-colors duration-500">{cat.title}</h3>
                <span className="text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 transition-colors duration-500">{cat.code}</span>
              </div>
            </div>

            {/* High-Contrast Glowing Skill Pills */}
            <div className="lg:col-span-8 flex flex-wrap gap-3">
              {cat.skills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
