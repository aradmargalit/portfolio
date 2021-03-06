// Declaratively list experiences and skills so they can be dynamically rendered

import { Company } from '../types';

const hitachi: Company = {
  name: 'Hitachi Consulting',
  link: 'https://www.hitachivantara.com/en-us/services/consulting-services.html',
  roles: [
    {
      title: 'Lead Software Developer',
      start: 'August 2017',
      end: 'February 2018',
      bullets: [
        'Managed an international team of 6 developers by leading daily scrums, delegating tasks, and providing feedback through routine code reviews.',
        'Represented the team in technical meetings with external groups to discuss integrations and technical feasibility of proposed features and capabilities.',
        'Interviewed and provided feedback on multiple candidates, onboarding those hired.',
      ],
    },
    {
      title: 'Full Stack Developer for a Cross-Platform Mobile Application',
      start: 'March 2017',
      end: 'August 2017',
      bullets: [
        'Leveraged RESTful web services to build data flows that sourced and encapsulated data into object models.',
        'Developed a data caching algorithm for rapid access of web resources upon successful retrieval.',
      ],
    },
    {
      title: 'Junior Cloud Infrastructure Architect',
      start: 'September 2016',
      end: 'January 2017',
      bullets: [
        'Deployed hundreds of servers into complex cloud environments using Cloudformation and ARM templates.',
        'Installed Java and .NET legacy applications onto RedHat and Microsoft Servers using Bash and Powershell Scripts, and leveraging PaaS and containerization services where possible, such as Elastic Beanstalk and Docker.',
      ],
    },
  ],
};

const hulu: Company = {
  name: 'Hulu, LLC',
  link: 'http://www.hulu.com/',
  roles: [
    {
      title: 'Software Engineering Manager (Manager Level 4)',
      start: 'February 2021',
      end: 'May 2021',
      bullets: [
        'Coached, led, and mentored a team of up to 7 geographically distributed full-stack engineers to ship industry-leading and accessible React applications.',
        'Recruited and retained world-class talent by cultivating a culture of growth, trust, autonomy, respect, and fun.',
        'Provided technical leadership and guidance on a number of technologies, including AWS, React, GraphQL, NodeJS, Typescript, Terraform, Vault, Kubernetes, Spinnaker, and others.',
      ],
    },
    {
      title: 'Senior Software Developer (Individual Contributor Level 4)',
      start: 'March 2020',
      end: 'February 2021',
      bullets: [
        'Led design and implementation for a React Typescript, GraphQL-powered internal application for ad trafficking.',
        'Shipped and deployed performant and scalable applications capable of handling over 20,000 requests per second with sub-10ms response times.',
        'Spearheaded migration of critical services to AWS by leveraging RDS, Elasticache, Terraform, ECS, EKS, and more.',
      ],
    },
    {
      title: 'Software Developer (Individual Contributor Level 3)',
      start: 'February 2018',
      end: 'March 2020',
      bullets: [
        'Acted as the interim software development lead, representing the team in technical and design discussions and leading Agile ceremonies.',
        'Developed and maintained microservices to pipe ad metadata between various systems.',
        'Mentored junior developers and contributed to architecture, design, and team culture discussions.',
      ],
    },
  ],
};

const tempo: Company = {
  name: 'Tempo',
  link: 'https://tempo.fit/',
  roles: [
    {
      title: 'Engineering Manager',
      start: 'May 2022',
      end: 'Present',
      bullets: [
        'Leading a global team of developers across web, iOS, Electron, and backend to ship high-quality features in the connected fitness space.',
        'Growing, mentoring, and coaching the team through rapid change and challenging obstacles.',
      ],
    },
    {
      title: 'Staff Software Engineer',
      start: 'June 2021',
      end: 'May 2022',
      bullets: [
        'Drove cross-functional and cross-platfrom projects from ideation to delivery, launch, and support.',
        'Implemented complex features on the Tempo Studio device, driving user engagement and retention.',
        'Led cross-functional teams across backend, mobile, and frontend to deliver critical projects.',
      ],
    },
  ],
};

// Export in display order -- first company is at the top
export const companies: Company[] = [tempo, hulu, hitachi];
