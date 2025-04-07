import { useAppDispatch, useAppSelector } from '../store/hook';
import { tabCheapest, tabFastest, tabOptimal } from '../store/tabsSlice';
import './Tabs.scss';

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
    <div className="tabs-container">
      <button
        className={`cheapest tab ${activeTab === 'cheapest' ? 'active' : ''}`}
        onClick={() => tabChange('cheapest')}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`fastest tab ${activeTab === 'fastest' ? 'active' : ''}`}
        onClick={() => tabChange('fastest')}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`optimal tab ${activeTab === 'optimal' ? 'active' : ''}`}
        onClick={() => tabChange('optimal')}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};

export default Tabs;
