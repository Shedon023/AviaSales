import Filter from './Filter';
import Tabs from './Tabs';
import Ticket from './TicketList';
import ShowMore from './ShowMore';
import styles from './App.module.scss';
import Switch from 'react-switch';
import Loader from './Loader';
import { useAppSelector } from '../store/hook';
import { useContext } from 'react';
import { ThemeContext } from '../lib/ThemeProvider';

function App() {
  const { loading, isComplete } = useAppSelector((state) => state.data);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null; // Safety check
  const { theme, toggleTheme } = themeContext;

  return (
    <div className={`${styles['app-wrapper']}`}>
      <div className={styles['theme-switch']}>
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          offColor="#bbb"
          onColor="#333"
          uncheckedIcon={<span>🌙</span>}
          checkedIcon={<span>🌞</span>}
        />
      </div>
      <Filter />
      <div className={styles['tab-and-ticket-wrapper']}>
        <Tabs />
        {loading && !isComplete && <Loader />}
        <Ticket />
        <ShowMore />
      </div>
    </div>
  );
}

export default App;
