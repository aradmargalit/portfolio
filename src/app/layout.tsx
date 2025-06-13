'use client';

import '@fontsource/inter';

import React, { useEffect, useState } from 'react';

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
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '999px',
        boxShadow: 'var(--shadow-card)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontWeight: 600,
        position: 'fixed',
        padding: '0.5em 1.2em',
        right: 24,
        top: 24,
        transition: 'background 0.2s, color 0.2s',
        zIndex: 100,
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
