import React, { createContext, useState, useEffect } from 'react';

export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'light';
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);
  };

  useEffect(() => {
    if (initialTheme) {
      changeTheme(initialTheme);
    }
  }, [initialTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme:changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};