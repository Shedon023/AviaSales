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
export const fetchData = createAsyncThunk<void, void, { rejectValue: string }>(
  'data/fetchData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const searchId = await fetchId();
      let stop = false;

      const initialResponse = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      );

      if (!initialResponse.ok) {
        return rejectWithValue('Ошибка загрузки данных');
      }

      const initialData = await initialResponse.json();
      stop = initialData.stop;

      if (initialData.tickets?.length) {
        dispatch(dataSlice.actions.setTickets(initialData.tickets));
      }

      while (!stop) {
        const response = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
        );

        if (!response.ok) {
          if (response.status === 500) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            continue;
          }
          return rejectWithValue('Ошибка загрузки данных');
        }

        const data = await response.json();
        stop = data.stop;

        console.log(data.tickets);

        if (data.tickets?.length) {
          dispatch(dataSlice.actions.addTickets(data.tickets));
        }
      }
    } catch (error) {
      return rejectWithValue('Ошибка соединения');
    }
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    visibleTicketsCount: 5,
    loading: false,
    error: null,
    isComplete: false,
  } as DataState & { isComplete: boolean },
  reducers: {
    increaseVisibleTickets: (state) => {
      state.visibleTicketsCount += 5;
    },
    setTickets: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addTickets: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    completeLoading: (state) => {
      state.isComplete = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state) => {
        state.isComplete = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseVisibleTickets } = dataSlice.actions;

export default dataSlice.reducer;
