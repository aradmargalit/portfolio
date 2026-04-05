import { StaticImageData } from 'next/image';

export type Skill = { skill: string; startYear: number };

export type Education = {
  name: string;
  degree: string;
  minor?: string;
  graduatedYear: number;
  honors?: string;
  logo?: StaticImageData;
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
  logo?: StaticImageData;
  roles: Role[];
};
