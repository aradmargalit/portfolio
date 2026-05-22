'use client';

import './SkillList.scss';

import { IconType } from '@react-icons/all-files';
import React, { useMemo } from 'react';
import {
  FaAngular,
  FaAws,
  FaBrain,
  FaCss3Alt,
  FaCuttlefish,
  FaDatabase,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaRobot,
  FaRust,
  FaSass,
  FaSwift,
  FaVuejs,
} from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import {
  SiAnthropic,
  SiDatadog,
  SiGatsby,
  SiGraphql,
  SiKubernetes,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiRuby,
  SiTerraform,
  SiTypescript,
  SiVault,
} from 'react-icons/si';

import { Skill } from '../../types';

interface SkillListProps {
  skills: Skill[];
}

// Map skill names to icons
const skillIcons: Record<string, IconType> = {
  'Agentic Workflows': FaBrain,
  AWS: FaAws,
  'AWS Bedrock': FaAws,
  Angular: FaAngular,
  C: FaCuttlefish,
  Claude: SiAnthropic,
  'Custom Agents': FaRobot,
  'C#': FaCuttlefish,
  'C++': FaCuttlefish,
  CSS: FaCss3Alt,
  CSS3: FaCss3Alt,
  Database: FaDatabase,
  Datadog: SiDatadog,
  Docker: FaDocker,
  Figma: FaFigma,
  GatsbyJS: SiGatsby,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Go: FaGolang,
  GraphQL: SiGraphql,
  HTML: FaHtml5,
  HTML5: FaHtml5,
  Java: FaJava,
  JavaScript: FaJs,
  Kubernetes: SiKubernetes,
  Linux: FaLinux,
  MySQL: SiMysql,
  NestJS: SiNestjs,
  NextJS: SiNextdotjs,
  'Node.js': FaNodeJs,
  NodeJS: FaNodeJs,
  PHP: FaPhp,
  Postgres: SiPostgresql,
  Python: FaPython,
  React: FaReact,
  ReactJS: FaReact,
  Ruby: SiRuby,
  Rust: FaRust,
  Sass: FaSass,
  Swift: FaSwift,
  Terraform: SiTerraform,
  Typescript: SiTypescript,
  Vault: SiVault,
  Vue: FaVuejs,
};

function SkillList({ skills }: SkillListProps) {
  // Sort by startYear ascending
  const sortedSkillList = useMemo(() => [...skills].sort((a, b) => a.startYear - b.startYear), [skills]);

  return (
    <div className="skill-list">
      <ul className="skill-list__simple">
        {sortedSkillList.map((skill) => {
          const Icon = skillIcons[skill.skill] || null;
          return (
            <li key={skill.skill} className="skill-list__item">
              {Icon && (
                <Icon className="skill-list__icon" size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              )}
              {skill.skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SkillList;
