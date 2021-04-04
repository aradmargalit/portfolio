export type Skill = { skill: string; yearsExperience: number };

export type Education = {
  name: string;
  degree: string;
  minor?: string;
  graduatedYear: number;
  honors?: string;
};

export type Role = {
  title: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Company = {
  name: string;
  link: string;
  roles: Role[];
};
