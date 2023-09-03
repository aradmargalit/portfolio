import '@fontsource/merriweather';
import './page.scss';

import { IoMdArrowBack } from '@react-icons/all-files/io/IoMdArrowBack';
import Link from 'next/link';
import React from 'react';

import CompanyList from '@/components/CompanyList';
import EducationView from '@/components/EducationView';
import SkillList from '@/components/SkillList';
import { companies, education, skills } from '@/resumeConfig';

function Resume() {
  return (
    <div className="resume">
      <div className="resume__header">
        <Link href="/">
          <IoMdArrowBack size="2em" />
        </Link>
        <h1>Résumé</h1>
      </div>

      <div className="education section">
        <h2>Education</h2>
        <EducationView education={education} />
      </div>
      <div className="companies section">
        <h2>Work Experience</h2>
        <CompanyList companies={companies} />
      </div>
      <div className="skills section">
        <h2>Skills & Technology</h2>
        <SkillList skills={skills} />
      </div>
    </div>
  );
}

export default Resume;
