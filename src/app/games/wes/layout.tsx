import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  description: "Wes's guess-the-picture quiz.",
  title: "Wes's Quiz",
};

export default function WesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
