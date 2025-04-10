import { useState, useEffect } from 'react';

const useTheme = () => {
  const savedTheme =
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  const [theme, setTheme] = useState<'light' | 'dark'>(savedTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

export default useTheme;
