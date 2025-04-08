import Filter from './Filter';
import Tabs from './Tabs';
import Ticket from './Ticket';
import ShowMore from './ShowMore';
import styles from './App.module.scss';
import { createContext, useEffect, useState } from 'react';
import Switch from 'react-switch';
import Loader from './Loader';
import { useAppSelector } from '../store/hook';

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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  const { loading, isComplete } = useAppSelector((state) => state.data);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${styles['app-wrapper']}`}>
        <div className={styles['theme-switch']}>
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
        <div className={styles['tab-and-ticket-wrapper']}>
          <Tabs />
          {loading && !isComplete && <Loader />}

          <Ticket />
          <ShowMore />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
