import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Street Sweeping',
  description: 'Days until the next SF street sweeping day.',
};

export default function SweepLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
