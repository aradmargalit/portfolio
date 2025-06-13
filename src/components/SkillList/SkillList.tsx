'use client';

import './SkillList.scss';

import React, { useMemo } from 'react';
import { IconType } from '@react-icons/all-files';
import { FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase, FaAws, FaDocker, FaLinux, FaJava, FaGithub, FaSass, FaAngular, FaVuejs, FaPhp, FaSwift, FaRust, FaCuttlefish, FaFigma } from 'react-icons/fa';

import { Skill } from '../../types';

interface SkillListProps {
  skills: Skill[];
}

// Map skill names to icons
const skillIcons: Record<string, IconType> = {
  React: FaReact,
  'Node.js': FaNodeJs,
  Python: FaPython,
  HTML: FaHtml5,
  HTML5: FaHtml5,
  CSS: FaCss3Alt,
  CSS3: FaCss3Alt,
  JavaScript: FaJs,
  Git: FaGitAlt,
  Database: FaDatabase,
  AWS: FaAws,
  Docker: FaDocker,
  Linux: FaLinux,
  Java: FaJava,
  GitHub: FaGithub,
  Sass: FaSass,
  Angular: FaAngular,
  Vue: FaVuejs,
  PHP: FaPhp,
  Swift: FaSwift,
  Rust: FaRust,
  C: FaCuttlefish,
  'C++': FaCuttlefish,
  Figma: FaFigma,
};

function SkillList({ skills }: SkillListProps) {
  // Just list the skills alphabetically
  const sortedSkillList = useMemo(() => [...skills].sort((a, b) => a.skill.localeCompare(b.skill)), [skills]);

  return (
    <div className="skill-list">
      <ul className="skill-list__simple">
        {sortedSkillList.map((skill) => {
          const Icon = skillIcons[skill.skill] || null;
          return (
            <li key={skill.skill} className="skill-list__item">
              {Icon && <Icon className="skill-list__icon" size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />}
              {skill.skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SkillList;
