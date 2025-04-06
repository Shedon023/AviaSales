import './ShowMore.scss';

import { increaseVisibleTickets } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';

const ShowMore = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.data);
  return (
    !loading && (
      <button
        className="show-more-button"
        onClick={() => dispatch(increaseVisibleTickets())}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    )
  );
};

export default ShowMore;
