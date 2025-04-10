import styles from './Filter.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { toggleFilter, toggleAllFilters } from '../store/filterSlice';

const filterOptions = [
  { key: 'All', label: 'Все' },
  { key: 'No stops', label: 'Без пересадок' },
  { key: '1 stop', label: '1 пересадка' },
  { key: '2 stops', label: '2 пересадки' },
  { key: '3 stops', label: '3 пересадки' },
] as const;

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
        {filterOptions.map(({ key, label }) => (
          <li key={key} className={styles['filter']}>
            <label>
              <input
                type="checkbox"
                name="filter"
                value={label}
                checked={filters[key]}
                onChange={
                  key === 'All'
                    ? handleToggleAll
                    : () => handleToggleFilter(key as keyof typeof filters)
                }
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Filter;
