export type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export type TabType = 'cheapest' | 'fastest' | 'optimal';

export type Segment = {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
};

export type Ticket = {
  carrier: string;
  price: number;
  segments: Segment[];
};

export type DataState = {
  items: Ticket[];
  visibleTicketsCount: number;
  loading: boolean;
  error: null | string | undefined;
};

export type Filters = {
  All: boolean;
  'No stops': boolean;
  '1 stop': boolean;
  '2 stops': boolean;
  '3 stops': boolean;
};

export type FilterState = {
  filters: Filters;
};
