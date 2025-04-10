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

export { formatTime, formatDate, formatStops };
