import React, { useMemo } from 'react';
import { Skill } from '../../types';
import './SkillList.scss';

interface SkillListProps {
  skills: Skill[];
}

function SkillList({ skills }: SkillListProps): JSX.Element {
  // Sort by the most years of experience
  const sortedSkillList = useMemo(() => skills.sort((a, b) => b.yearsExperience - a.yearsExperience), [skills]);

  return (
    <div className="skill-list">
      <p>Skill or Technology and Years of Relevant Experience</p>
      <ul>
        {sortedSkillList.map((skill) => (
          <li>
            {skill.skill}: {skill.yearsExperience} years
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
