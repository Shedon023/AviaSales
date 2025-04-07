import './Ticket.scss';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchData } from '../store/dataSlice';
import { useEffect } from 'react';
import { Ticket as TicketType } from '../store/dataSlice';
import Loader from './Loader';

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatStops = (stops: string[]) => {
  if (stops.length === 0) return 'БЕЗ ПЕРЕСАДОК';
  return `${stops.length} ПЕРЕСАДК${stops.length === 1 ? 'А' : stops.length < 5 ? 'И' : 'ок'}`;
};

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

const Ticket = () => {
  const dispatch = useAppDispatch();

  const { items, loading, error, visibleTicketsCount } = useAppSelector(
    (state) => state.data,
  );
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  const filters = useAppSelector((state) => state.filter.filters);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Ошибка загрузки данных: {error}</div>;
  }

  // if (!items || items.length === 0) {
  //   return <div>Нет доступных билетов.</div>;
  // }

  let filteredItems = items;

  if (!filters['Все']) {
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
    !filters['Все'] &&
    !filters['No stops'] &&
    !filters['1 stop'] &&
    !filters['2 stops'] &&
    !filters['3 stops'];

  if (allFiltersDisabled) {
    return (
      <div className="no-tickets-message">
        Билетов не найдено. Пожалуйста, выберите хотя бы один фильтр.
      </div>
    );
  }

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
    <div>
      {filteredItems.slice(0, visibleTicketsCount).map((ticket, index) => {
        const firstSegment = ticket.segments[0];
        const secondSegment = ticket.segments[1];
        const logoUrl = `https://pics.avs.io/99/36/${ticket.carrier}.png`;
        return (
          <div key={index} className="ticket-container">
            <div className="ticket-header">
              <div className="price">{ticket.price} Р </div>
              <img
                src={logoUrl}
                alt="Логотип авиакомпании"
                className="airline-logo"
              />
            </div>

            <div className="flight-info">
              <div>
                <p>
                  {firstSegment.origin} - {firstSegment.destination}
                </p>

                <p className="date">
                  {formatDate(firstSegment.date)} -{' '}
                  {formatDate(secondSegment.date)}
                </p>
              </div>
              <div>
                <p>{'В ПУТИ'}</p>
                <p className="duration">{formatTime(firstSegment.duration)}</p>
              </div>
              <div>
                <p>{formatStops(firstSegment.stops)}</p>
                <p className="stops">{firstSegment.stops.join(', ')}</p>
              </div>
            </div>
            <div className="flight-info return ">
              <div>
                <p>
                  {secondSegment.origin} - {secondSegment.destination}
                </p>

                <p className="date">
                  {formatDate(secondSegment.date)} -{' '}
                  {formatDate(firstSegment.date)}
                </p>
              </div>
              <div>
                <p>{'В ПУТИ'}</p>
                <p className="duration">{formatTime(secondSegment.duration)}</p>
              </div>
              <div>
                <p>{formatStops(secondSegment.stops)}</p>
                <p className="stops">{secondSegment.stops.join(', ')}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ticket;
