import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchId = async (): Promise<string | undefined> => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    return data.searchId;
  } catch (error: unknown) {
    console.error('Ошибка при получении данных:', error);
  }
};

export const fetchData = createAsyncThunk<
  { tickets: Ticket[] },
  void,
  { rejectValue: string }
>('data/fetchData', async (_, { rejectWithValue }) => {
  const searchId = await fetchId();
  const res = await fetch(
    `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
  );
  if (!res.ok) {
    return rejectWithValue('Ошибка загрузки данных');
  }
  const data = await res.json();
  console.log(data.tickets);
  return { tickets: data.tickets };
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    visibleTicketsCount: 5,
    loading: false,
    error: null,
  } as DataState,
  reducers: {
    increaseVisibleTickets: (state) => {
      state.visibleTicketsCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.tickets;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseVisibleTickets } = dataSlice.actions;

export default dataSlice.reducer;
