import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { toggleFilter, toggleAllFilters } from '../store/filterSlice';

const Filter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter.filters);

  const handleToggleFilter = (filterName: keyof typeof filters) => {
    dispatch(toggleFilter(filterName));
  };

  const handleToggleAll = () => {
    dispatch(toggleAllFilters());
  };

  return (
    <aside className={styles['filters-container']}>
      <ul className={styles['filters']}>
        КОЛИЧЕСТВО ПЕРЕСАДОК
        <li className={styles['filter']}>
          <label>
            <input
              type="checkbox"
              name="filter"
              value="Все"
              checked={filters.Все}
              onChange={handleToggleAll}
            />
            Все
          </label>
        </li>
        <li className={styles['filter']}>
          <label>
            <input
              type="checkbox"
              name="filter"
              value="Без пересадок"
              checked={filters['No stops']}
              onChange={() => handleToggleFilter('No stops')}
            />
            Без пересадок
          </label>
        </li>
        <li className={styles['filter']}>
          <label>
            <input
              type="checkbox"
              name="filter"
              value="1 пересадка"
              checked={filters['1 stop']}
              onChange={() => handleToggleFilter('1 stop')}
            />
            1 пересадка
          </label>
        </li>
        <li className={styles['filter']}>
          <label>
            <input
              type="checkbox"
              name="filter"
              value="2 пересадки"
              checked={filters['2 stops']}
              onChange={() => handleToggleFilter('2 stops')}
            />
            2 пересадки
          </label>
        </li>
        <li className={styles['filter']}>
          <label>
            <input
              type="checkbox"
              name="filter"
              value="3 пересадки"
              checked={filters['3 stops']}
              onChange={() => handleToggleFilter('3 stops')}
            />
            3 пересадки
          </label>
        </li>
      </ul>
    </aside>
  );
};

export default Filter;
