'use client';

import './SkillList.scss';

import { IconType } from '@react-icons/all-files';
import React, { useMemo } from 'react';
import {
  FaAngular,
  FaAws,
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
  FaRust,
  FaSass,
  FaSwift,
  FaVuejs,
} from 'react-icons/fa';
import {
  SiDatadog,
  SiGatsby,
  SiGraphql,
  SiKubernetes,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiSpinnaker,
  SiTerraform,
  SiTypescript,
  SiVault,
} from 'react-icons/si';
import { FaGolang } from "react-icons/fa6";


import { Skill } from '../../types';

interface SkillListProps {
  skills: Skill[];
}

// Map skill names to icons
const skillIcons: Record<string, IconType> = {
  Kubernetes: SiKubernetes,
  MySQL: SiMysql,
  NextJS: SiNextdotjs,
  Datadog: SiDatadog,
  'Node.js': FaNodeJs,
  GatsbyJS: SiGatsby,
  NodeJS: FaNodeJs,
  Docker: FaDocker,
  React: FaReact,
  GraphQL: SiGraphql,
  ReactJS: FaReact,
  Go: FaGolang,
  Python: FaPython,
  'C#': FaCuttlefish,
  AWS: FaAws,
  Typescript: SiTypescript,
  HTML: FaHtml5,
  Spinnaker: SiSpinnaker,
  CSS: FaCss3Alt,
  Vault: SiVault,
  CSS3: FaCss3Alt,
  Git: FaGitAlt,
  Postgres: SiPostgresql,
  Database: FaDatabase,
  GitHub: FaGithub,
  Terraform: SiTerraform,
  Angular: FaAngular,
  HTML5: FaHtml5,
  Ruby: FaCuttlefish,
  C: FaCuttlefish,
  Java: FaJava,
  'C++': FaCuttlefish,
  Figma: FaFigma,
  JavaScript: FaJs,
  Linux: FaLinux,
  PHP: FaPhp,
  Rust: FaRust,
  Sass: FaSass,
  Swift: FaSwift,
  Vue: FaVuejs,
};

function SkillList({ skills }: SkillListProps) {
  // Sort by startYear ascending
  const sortedSkillList = useMemo(
    () => [...skills].sort((a, b) => a.startYear - b.startYear),
    [skills]
  );

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
