import React from 'react';
import '@fontsource/merriweather';
import './resume.scss';
import { Link } from 'gatsby';
import { IoMdArrowBack } from '@react-icons/all-files/io/IoMdArrowBack';
import CompanyList from '../components/CompanyList';
import { companies, education, skills } from '../resumeConfig';
import EducationView from '../components/EducationView';
import SkillList from '../components/SkillList';

function Resume(): JSX.Element {
  return (
    <div className="resume">
      <div className="resume__header">
        <Link to="/">
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
