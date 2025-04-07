import styles from './ShowMore.module.scss';

import { increaseVisibleTickets } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';

const ShowMore = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.data);
  return (
    !loading && (
      <button
        className={styles['show-more-button']}
        onClick={() => dispatch(increaseVisibleTickets())}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  );
};

export default ShowMore;
