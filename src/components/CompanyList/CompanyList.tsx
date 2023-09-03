import './CompanyList.scss';

import React from 'react';

import { Company } from '../../types';

interface CompanyListProps {
  companies: Company[];
}

function RoleView({ role }: { role: Company['roles'][number] }) {
  return (
    <li>
      <h3>{role.title}</h3>
      <p>
        <em>
          {role.start} - {role.end}
        </em>
      </p>
      <ul>
        {role.bullets.map((bullet) => (
          <li key={bullet}>
            <p>{bullet}</p>
          </li>
        ))}
      </ul>
    </li>
  );
}

function CompanyView({ company }: { company: Company }) {
  return (
    <li className="company-view">
      <a href={company.link} target="_blank" rel="noreferrer">
        <h3>{company.name}</h3>
      </a>
      <ul>
        {company.roles.map((role) => (
          <RoleView key={role.title} role={role} />
        ))}
      </ul>
    </li>
  );
}

function CompanyList({ companies }: CompanyListProps) {
  return (
    <ul className="company-list">
      {companies.map((company) => (
        <CompanyView key={company.name} company={company} />
      ))}
    </ul>
  );
}

export default CompanyList;
