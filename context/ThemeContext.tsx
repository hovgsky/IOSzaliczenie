import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeCtx = {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    primary: string;
    input: string;
  };
};

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors =
    theme === 'dark'
      ? {
          background: '#0f172a',
          card: '#1e293b',
          text: '#f8fafc',
          primary: '#10b981',
          input: '#334155',
        }
      : {
          background: '#e6ecf0',
          card: '#ffffff',
          text: '#111827',
          primary: '#10b981',
          input: '#f3f3f3',
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used in ThemeProvider');
  return ctx;
}