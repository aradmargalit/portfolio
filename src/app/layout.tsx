import './globals.scss';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700', '800'],
});

import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  description: 'Sr. Engineering Manager at Twitch. Dad, runner, software dude.',
  metadataBase: new URL('https://www.aradmargalit.com'),
  openGraph: {
    locale: 'en_US',
    siteName: 'Arad Margalit',
    type: 'website',
  },
  title: {
    default: 'Arad Margalit',
    template: '%s | Arad Margalit',
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
  jobTitle: 'Senior Engineering Manager',
  name: 'Arad Margalit',
  sameAs: ['https://www.linkedin.com/in/arad-margalit/', 'https://github.com/aradmargalit'],
  url: 'https://www.aradmargalit.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Twitch',
    url: 'https://twitch.tv',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
