import { aiTools, awsSkills, companies, education, skills } from '@/resumeConfig';

export const dynamic = 'force-static';

export function GET() {
  const currentYear = new Date().getFullYear();

  const experienceSection = companies
    .map((company) => {
      const roleLines = company.roles
        .map((role) => {
          const duration = `${role.start} – ${role.end}`;
          const bullets = role.bullets.map((b) => `  - ${b}`).join('\n');
          return `### ${role.title} (${duration})\n${bullets}`;
        })
        .join('\n\n');
      return `## ${company.name}\n\n${roleLines}`;
    })
    .join('\n\n');

  const skillsSection = skills
    .map((s) => `${s.skill} (${currentYear - s.startYear}+ yrs)`)
    .join(', ');

  const awsSection = awsSkills.map((s) => s.skill).join(', ');

  const aiSection = aiTools.map((s) => s.skill).join(', ');

  const edu = education;
  const educationSection = [
    `${edu.name}`,
    `${edu.degree}${edu.minor ? `, Minor in ${edu.minor}` : ''}`,
    `Graduated ${edu.graduatedYear}${edu.honors ? ` · ${edu.honors}` : ''}`,
  ].join('\n');

  const content = `\
# Arad Margalit

> Senior Engineering Manager with ${currentYear - 2016}+ years of software engineering and technical leadership experience. Currently at Twitch. Expertise in full-stack development, distributed systems, cloud infrastructure, and building high-performing engineering teams.

## Work Experience

${experienceSection}

## Education

${educationSection}

## Skills & Technology

${skillsSection}

## AWS

${awsSection}

## AI Tools

${aiSection}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
