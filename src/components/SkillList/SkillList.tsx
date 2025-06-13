'use client';

import './SkillList.scss';

import React, { useMemo } from 'react';

import { Skill } from '../../types';

interface SkillListProps {
  skills: Skill[];
}

function SkillList({ skills }: SkillListProps) {
  // Just list the skills alphabetically
  const sortedSkillList = useMemo(() => [...skills].sort((a, b) => a.skill.localeCompare(b.skill)), [skills]);

  return (
    <div className="skill-list">
      <ul className="skill-list__simple">
        {sortedSkillList.map((skill) => (
          <li key={skill.skill} className="skill-list__item">
            {skill.skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
