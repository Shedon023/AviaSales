import { useAppDispatch, useAppSelector } from '../store/hook';
import { tabCheapest, tabFastest, tabOptimal } from '../store/tabsSlice';
import styles from './Tabs.module.scss';

type TabType = 'cheapest' | 'fastest' | 'optimal';

const Tabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  const tabChange = (tab: TabType) => {
    switch (tab) {
      case 'cheapest':
        dispatch(tabCheapest());
        break;
      case 'fastest':
        dispatch(tabFastest());
        break;
      case 'optimal':
        dispatch(tabOptimal());
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles['tabs-container']}>
      <button
        className={`${styles.cheapest} ${styles.tab} ${activeTab === 'cheapest' ? styles.active : ''}`}
        onClick={() => tabChange('cheapest')}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`${styles.fastest} ${styles.tab} ${activeTab === 'fastest' ? styles.active : ''}`}
        onClick={() => tabChange('fastest')}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`${styles.optimal} ${styles.tab} ${activeTab === 'optimal' ? styles.active : ''}`}
        onClick={() => tabChange('optimal')}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Tabs;
