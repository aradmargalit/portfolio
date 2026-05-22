import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  description: 'Days until the next SF street sweeping day.',
  title: 'Street Sweeping',
};

export default function SweepLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
