'use client';

import React, { useEffect, useState } from 'react';
import '@fontsource/inter';

function ThemeToggle() {
  // Use undefined as initial state to avoid SSR mismatch
  const [theme, setTheme] = useState<string | undefined>(undefined);

  // Set theme on mount based on user/system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 1. Check localStorage
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        return;
      }
      // 2. Check system preference
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const systemPref = mql.matches ? 'dark' : 'light';
      setTheme(systemPref);
      document.documentElement.setAttribute('data-theme', systemPref);
      // 3. Listen for system preference changes
      const listener = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      };
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (!theme) return;
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Don't render button until theme is determined (avoids flicker)
  if (!theme) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 100,
        background: 'var(--color-card)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)',
        borderRadius: '999px',
        padding: '0.5em 1.2em',
        fontWeight: 600,
        boxShadow: 'var(--shadow-card)',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
