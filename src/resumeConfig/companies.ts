// Declaratively list experiences and skills so they can be dynamically rendered

import { Company } from '../types';

const hitachi: Company = {
  link: 'https://www.hitachivantara.com/en-us/services/consulting-services.html',
  name: 'Hitachi Consulting',
  roles: [
    {
      bullets: [
        'Managed an international team of 6 developers by leading daily scrums, delegating tasks, and providing feedback through routine code reviews.',
        'Represented the team in technical meetings with external groups to discuss integrations and technical feasibility of proposed features and capabilities.',
        'Interviewed and provided feedback on multiple candidates, onboarding those hired.',
      ],
      end: 'February 2018',
      start: 'August 2017',
      title: 'Lead Software Developer',
    },
    {
      bullets: [
        'Leveraged RESTful web services to build data flows that sourced and encapsulated data into object models.',
        'Developed a data caching algorithm for rapid access of web resources upon successful retrieval.',
      ],
      end: 'August 2017',
      start: 'March 2017',
      title: 'Full Stack Developer for a Cross-Platform Mobile Application',
    },
    {
      bullets: [
        'Deployed hundreds of servers into complex cloud environments using Cloudformation and ARM templates.',
        'Installed Java and .NET legacy applications onto RedHat and Microsoft Servers using Bash and Powershell Scripts, and leveraging PaaS and containerization services where possible, such as Elastic Beanstalk and Docker.',
      ],
      end: 'January 2017',
      start: 'September 2016',
      title: 'Junior Cloud Infrastructure Architect',
    },
  ],
};

const hulu: Company = {
  link: 'http://www.hulu.com/',
  name: 'Hulu, LLC',
  roles: [
    {
      bullets: [
        'Coached, led, and mentored a team of up to 7 geographically distributed full-stack engineers to ship industry-leading and accessible React applications.',
        'Recruited and retained world-class talent by cultivating a culture of growth, trust, autonomy, respect, and fun.',
        'Provided technical leadership and guidance on a number of technologies, including AWS, React, GraphQL, NodeJS, Typescript, Terraform, Vault, Kubernetes, Spinnaker, and others.',
      ],
      end: 'May 2021',
      start: 'February 2021',
      title: 'Software Engineering Manager (Manager Level 4)',
    },
    {
      bullets: [
        'Led design and implementation for a React Typescript, GraphQL-powered internal application for ad trafficking.',
        'Shipped and deployed performant and scalable applications capable of handling over 20,000 requests per second with sub-10ms response times.',
        'Spearheaded migration of critical services to AWS by leveraging RDS, Elasticache, Terraform, ECS, EKS, and more.',
      ],
      end: 'February 2021',
      start: 'March 2020',
      title: 'Senior Software Developer (Individual Contributor Level 4)',
    },
    {
      bullets: [
        'Acted as the interim software development lead, representing the team in technical and design discussions and leading Agile ceremonies.',
        'Developed and maintained microservices to pipe ad metadata between various systems.',
        'Mentored junior developers and contributed to architecture, design, and team culture discussions.',
      ],
      end: 'March 2020',
      start: 'February 2018',
      title: 'Software Developer (Individual Contributor Level 3)',
    },
  ],
};

const tempo: Company = {
  link: 'https://tempo.fit/',
  name: 'Tempo',
  roles: [
    {
      bullets: [
        'Led a global team of 8 developers across web, iOS, Electron, and backend services to ship quality user-facing features in the connected fitness space.',
        'Shaped and improved the technical recruiting process to attract and hire talented engineers.',
        'Orchestrated up to 7 simultaneous projects across the company, indentified and removed blockers and ensured projects were developed, launched, and maintained successfully.',
        'Improved organizational processes including development, incident management, and bug triage.',
      ],
      end: 'November 2022',
      start: 'May 2022',
      title: 'Engineering Manager',
    },
    {
      bullets: [
        'Drove cross-functional and cross-platfrom projects from ideation to delivery, launch, and support.',
        'Implemented complex features on the Tempo Studio device, driving user engagement and retention.',
        'Led cross-functional teams across backend, mobile, and frontend to deliver critical projects.',
      ],
      end: 'May 2022',
      start: 'June 2021',
      title: 'Staff Software Engineer',
    },
  ],
};

const twitch: Company = {
  link: 'https://twitch.tv/',
  name: 'Twitch',
  roles: [
    {
      bullets: ['Working with a talented team of engineers to build and deliver Twitch around the world'],
      end: 'Present',
      start: 'November 2022',
      title: 'Senior Engineering Manager',
    },
  ],
};

// Export in display order -- first company is at the top
export const companies: Company[] = [twitch, tempo, hulu, hitachi];
