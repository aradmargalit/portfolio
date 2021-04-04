import React from 'react';
import { Education } from '../../types';

interface EducationProps {
  education: Education;
}

function EducationView({ education }: EducationProps): JSX.Element {
  return (
    <div className="education">
      <h3>{education.name}</h3>
      <p>
        {education.degree} | {education.graduatedYear}, Minor: {education.minor}
      </p>
      {education.honors && <p>Graduated with Honors: {education.honors}</p>}
    </div>
  );
}

export default EducationView;
