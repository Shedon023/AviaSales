import styles from './TicketList.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchTicketsThunk } from '../store/dataSlice';
import { useEffect } from 'react';
import { Ticket as TicketType } from '../types/Types';
import { formatTime, formatDate, formatStops } from '../lib/formatFuncs';

const calculateSimpleOptimal = (ticket: TicketType) => {
  const totalDuration = ticket.segments.reduce(
    (sum, segment) => sum + segment.duration,
    0,
  );
  const stopsCount = ticket.segments.reduce(
    (sum, segment) => sum + segment.stops.length,
    0,
  );
  const penalty = stopsCount * 1000;
  return ticket.price + totalDuration + penalty;
};

const TicketList = () => {
  const dispatch = useAppDispatch();

  const { items, error, visibleTicketsCount } = useAppSelector(
    (state) => state.data,
  );
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const filters = useAppSelector((state) => state.filter.filters);

  useEffect(() => {
    dispatch(fetchTicketsThunk());
  }, [dispatch]);

  if (error && !items.length) {
    return (
      <div className={styles.errorMessage}>Ошибка загрузки данных: {error}</div>
    );
  }

  let filteredItems = items;

  if (!filters['All']) {
    filteredItems = items.filter((ticket) => {
      const stopsCount =
        ticket.segments[0].stops.length + ticket.segments[1].stops.length;

      return (
        (filters['No stops'] && stopsCount === 0) ||
        (filters['1 stop'] && stopsCount === 1) ||
        (filters['2 stops'] && stopsCount === 2) ||
        (filters['3 stops'] && stopsCount === 3)
      );
    });
  }

  const allFiltersDisabled =
    !filters['All'] &&
    !filters['No stops'] &&
    !filters['1 stop'] &&
    !filters['2 stops'] &&
    !filters['3 stops'];

  const noTicketsMessage = allFiltersDisabled ? (
    <div className={styles.noTicketsMessage}>
      Билетов не найдено. Пожалуйста, выберите хотя бы один фильтр.
    </div>
  ) : null;

  if (activeTab === 'cheapest') {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (activeTab === 'fastest') {
    filteredItems = [...filteredItems].sort((a, b) => {
      const aDuration = a.segments.reduce(
        (sum: number, segment) => sum + segment.duration,
        0,
      );
      const bDuration = b.segments.reduce(
        (sum: number, segment) => sum + segment.duration,
        0,
      );
      return aDuration - bDuration;
    });
  } else if (activeTab === 'optimal') {
    filteredItems = [...filteredItems].sort((a, b) => {
      const optimalA = calculateSimpleOptimal(a);
      const optimalB = calculateSimpleOptimal(b);
      return optimalA - optimalB;
    });
  }

  return (
    <div className={styles.ticketsList}>
      {noTicketsMessage}
      {filteredItems.slice(0, visibleTicketsCount).map((ticket, index) => {
        const firstSegment = ticket.segments[0];
        const secondSegment = ticket.segments[1];
        const logoUrl = `https://pics.avs.io/99/36/${ticket.carrier}.png`;

        return (
          <div key={index} className={styles.ticketContainer}>
            <div className={styles.ticketHeader}>
              <div className={styles.price}>
                {ticket.price.toLocaleString()} Р
              </div>
              <img
                src={logoUrl}
                alt="Логотип авиакомпании"
                className={styles.airlineLogo}
              />
            </div>

            <div className={styles.flightInfo}>
              <div className={styles.infoBlock}>
                <div className={styles.route}>
                  {firstSegment.origin} – {firstSegment.destination}
                </div>
                <div className={styles.time}>
                  {formatDate(firstSegment.date)} –{' '}
                  {formatDate(secondSegment.date)}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.label}>В ПУТИ</div>
                <div className={styles.duration}>
                  {formatTime(firstSegment.duration)}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.label}>
                  {formatStops(firstSegment.stops)}
                </div>
                <div className={styles.stops}>
                  {firstSegment.stops.join(', ')}
                </div>
              </div>
            </div>

            <div className={styles.flightInfo}>
              <div className={styles.infoBlock}>
                <div className={styles.route}>
                  {secondSegment.origin} – {secondSegment.destination}
                </div>
                <div className={styles.time}>
                  {formatDate(secondSegment.date)} –{' '}
                  {formatDate(firstSegment.date)}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.label}>В ПУТИ</div>
                <div className={styles.duration}>
                  {formatTime(secondSegment.duration)}
                </div>
              </div>
              <div className={styles.infoBlock}>
                <div className={styles.label}>
                  {formatStops(secondSegment.stops)}
                </div>
                <div className={styles.stops}>
                  {secondSegment.stops.join(', ')}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketList;
