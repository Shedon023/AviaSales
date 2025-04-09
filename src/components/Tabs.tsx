import { useAppDispatch, useAppSelector } from '../store/hook';
import { tabCheapest, tabFastest, tabOptimal } from '../store/tabsSlice';
import styles from './Tabs.module.scss';
import { TabType } from './Types';

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
    <div className={styles['tabs-container']} role="radiogroup">
      <label
        className={`${styles.cheapest} ${styles.tab} ${activeTab === 'cheapest' ? styles.active : ''}`}
      >
        <input
          type="radio"
          name="tabs"
          value="cheapest"
          checked={activeTab === 'cheapest'}
          onChange={() => tabChange('cheapest')}
          className={styles['radio-input']}
        />
        САМЫЙ ДЕШЕВЫЙ
      </label>
      <label
        className={`${styles.fastest} ${styles.tab} ${activeTab === 'fastest' ? styles.active : ''}`}
      >
        <input
          type="radio"
          name="tabs"
          value="fastest"
          checked={activeTab === 'fastest'}
          onChange={() => tabChange('fastest')}
          className={styles['radio-input']}
        />
        САМЫЙ БЫСТРЫЙ
      </label>
      <label
        className={`${styles.optimal} ${styles.tab} ${activeTab === 'optimal' ? styles.active : ''}`}
      >
        <input
          type="radio"
          name="tabs"
          value="optimal"
          checked={activeTab === 'optimal'}
          onChange={() => tabChange('optimal')}
          className={styles['radio-input']}
        />
        ОПТИМАЛЬНЫЙ
      </label>
    </div>
  );
};

export default Tabs;
