'use client';

import './SkillList.scss';

import React, { useEffect, useMemo, useState } from 'react';

import { Skill } from '../../types';

interface SkillListProps {
  skills: Skill[];
}

interface SkillWithYOE extends Skill {
  yearsOfExperience: number;
}

function SkillView({ skillData, max }: { skillData: SkillWithYOE; max: number }) {
  const { skill, yearsOfExperience } = skillData;

  // In order to get a fancy little animation, each of these starts at 0
  // and changes to its real value on mount
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(yearsOfExperience * 100);
  }, [yearsOfExperience]);

  return (
    <li>
      <div className="skill">
        <p className="skill__title">{skill}</p>
        <div className="skill__container">
          <div className="skill__progress" style={{ width: `${width / max}%` }}>
            <span className="skill__label">{yearsOfExperience}+ years</span>
          </div>
        </div>
      </div>
    </li>
  );
}

function SkillList({ skills }: SkillListProps) {
  // Sort by the most years of experience
  const sortedSkillList = useMemo(() => skills.sort((a, b) => a.startYear - b.startYear), [skills]);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const skillsWithYOE: SkillWithYOE[] = sortedSkillList.map((skill) => {
    return { ...skill, yearsOfExperience: Math.max(currentYear - skill.startYear, 1) };
  });
  const max = useMemo(() => Math.max(...skillsWithYOE.map((x) => x.yearsOfExperience)), [skillsWithYOE]);

  return (
    <div className="skill-list">
      <ul>
        {skillsWithYOE.map((skill) => (
          <SkillView key={skill.skill} skillData={skill} max={max} />
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
