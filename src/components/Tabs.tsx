import { useAppDispatch, useAppSelector } from '../store/hook';
import styles from './Tabs.module.scss';
import { TabType } from '../types/Types';
import { setTab } from '../store/tabsSlice';

const Tabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  const tabChange = (tab: TabType) => {
    dispatch(setTab(tab));
  };

  const tabOptions: { value: TabType; label: string }[] = [
    { value: 'cheapest', label: 'САМЫЙ ДЕШЕВЫЙ' },
    { value: 'fastest', label: 'САМЫЙ БЫСТРЫЙ' },
    { value: 'optimal', label: 'ОПТИМАЛЬНЫЙ' },
  ];

  return (
    <div className={styles['tabs-container']}>
      {tabOptions.map(({ value, label }) => (
        <label
          key={value}
          className={`${styles[value]} ${styles.tab} ${activeTab === value ? styles.active : ''}`}
        >
          <input
            type="radio"
            name="tabs"
            value={value}
            checked={activeTab === value}
            onChange={() => tabChange(value)}
            className={styles['radio-input']}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default Tabs;
