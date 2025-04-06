import './Filter.scss';
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
    <div className="filters-container">
      <ul className="filters">
        КОЛИЧЕСТВО ПЕРЕСАДОК
        <li className="filter">
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
        <li className="filter">
          <label>
            <input
              type="checkbox"
              name="filter"
              value="Без пересадок"
              checked={filters['Без пересадок']}
              onChange={() => handleToggleFilter('Без пересадок')}
            />
            Без пересадок
          </label>
        </li>
        <li className="filter">
          <label>
            <input
              type="checkbox"
              name="filter"
              value="1 пересадка"
              checked={filters['1 пересадка']}
              onChange={() => handleToggleFilter('1 пересадка')}
            />
            1 пересадка
          </label>
        </li>
        <li className="filter">
          <label>
            <input
              type="checkbox"
              name="filter"
              value="2 пересадки"
              checked={filters['2 пересадки']}
              onChange={() => handleToggleFilter('2 пересадки')}
            />
            2 пересадки
          </label>
        </li>
        <li className="filter">
          <label>
            <input
              type="checkbox"
              name="filter"
              value="3 пересадки"
              checked={filters['3 пересадки']}
              onChange={() => handleToggleFilter('3 пересадки')}
            />
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
