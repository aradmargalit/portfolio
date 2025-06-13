'use client';

import React, { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      suppressHydrationWarning
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '999px',
        boxShadow: 'var(--shadow-card)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontWeight: 600,
        padding: '0.5em 1.2em',
        position: 'fixed',
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
