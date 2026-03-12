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
  openGraph: {
    siteName: 'Arad Margalit',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
