import '@fontsource/inter';
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
      <div className="resume__content">
        <div className="education section card">
          <h2>Education</h2>
          <EducationView education={education} />
        </div>
        <div className="companies section card">
          <h2>Work Experience</h2>
          <CompanyList companies={companies} />
        </div>
        <div className="skills section card">
          <h2>Skills & Technology</h2>
          <SkillList skills={skills} />
        </div>
      </div>
    </div>
  );
}

export default Resume;
