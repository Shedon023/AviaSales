import { createContext, ReactNode } from 'react';
import { ThemeContextType } from './Types';
import useTheme from './useTheme';

export const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
