import styles from './ShowMore.module.scss';

import { increaseVisibleTickets } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';

const ShowMoreButton = () => {
  const dispatch = useAppDispatch();
  const { error, items } = useAppSelector((state) => state.data);
  const filters = useAppSelector((state) => state.filter.filters);

  const allFiltersDisabled =
    filters['All'] &&
    filters['No stops'] &&
    filters['1 stop'] &&
    filters['2 stops'] &&
    filters['3 stops'];
  return (
    allFiltersDisabled &&
    items.length > 1 &&
    !error && (
      <button
        className={styles['showMoreButton']}
        onClick={() => dispatch(increaseVisibleTickets())}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  );
};

export default ShowMoreButton;
