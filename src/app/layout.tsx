import '@fontsource/inter';

import { Metadata } from 'next';
import React from 'react';

import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: {
    default: 'Arad Margalit',
    template: '%s | Arad Margalit',
  },
  description: 'Sr. Engineering Manager at Twitch. Dad, runner, software dude.',
  metadataBase: new URL('https://www.aradmargalit.com'),
  openGraph: {
    siteName: 'Arad Margalit',
    locale: 'en_US',
    type: 'website',
  },
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
})();
`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arad Margalit',
  url: 'https://www.aradmargalit.com',
  sameAs: [
    'https://www.linkedin.com/in/arad-margalit/',
    'https://github.com/aradmargalit',
  ],
  jobTitle: 'Senior Engineering Manager',
  worksFor: {
    '@type': 'Organization',
    name: 'Twitch',
    url: 'https://twitch.tv',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
