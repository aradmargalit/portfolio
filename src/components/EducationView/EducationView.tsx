import Image from 'next/image';
import React from 'react';

import { Education } from '../../types';

interface EducationProps {
  education: Education;
}

function EducationView({ education }: EducationProps) {
  return (
    <div className="education">
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem' }}>
        {education.logo && (
          <Image
            src={education.logo}
            alt={`${education.name} logo`}
            width={32}
            height={32}
            style={{ borderRadius: '4px', objectFit: 'contain' }}
          />
        )}
        <h3>{education.name}</h3>
      </div>
      <p>
        {education.degree} | {education.graduatedYear}
        {education.minor && ` | Minor: ${education.minor}`}
      </p>
      {education.honors && <p>Graduated with Honors: {education.honors}</p>}
    </div>
  );
}

export default EducationView;
