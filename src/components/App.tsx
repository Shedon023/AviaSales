import Filter from './Filter';
import Tabs from './Tabs';
import Ticket from './Ticket';
import ShowMore from './ShowMore';
import './App.scss';
import { createContext, useEffect, useState } from 'react';
import Switch from 'react-switch';

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const savedTheme =
  (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(savedTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app-wrapper" id={theme}>
        <div className="theme-switch">
          <span>🌞</span>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            offColor="#bbb"
            onColor="#333"
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <span>🌙</span>
        </div>
        <Filter />
        <div className="tab-and-ticket-wrapper">
          <Tabs />
          <Ticket />
          <ShowMore />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
