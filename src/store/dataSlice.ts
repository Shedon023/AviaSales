import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataState } from '../components/Types';

export const fetchId = async (): Promise<string | undefined> => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    const data = await res.json();
    return data.searchId;
  } catch (error: unknown) {
    console.error('Ошибка при получении данных:', error);
  }
};

export const fetchTicketsThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('data/fetchTicketsThunk', async (_, { rejectWithValue, dispatch }) => {
  try {
    const searchId = await fetchId();
    let stop = false;
    let retries = 4;

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

    while (!stop && retries >= 0) {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      );

      if (!response.ok) {
        if (response.status === 500) {
          retries -= 1;
          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        }
        return rejectWithValue('Ошибка загрузки данных');
      }

      const data = await response.json();
      stop = data.stop;

      if (data.tickets?.length) {
        dispatch(dataSlice.actions.addTickets(data.tickets));
      }

      retries = 4;
    }

    if (retries < 0) {
      return rejectWithValue('Превышено кол-во попыток загрузки');
    }
  } catch (error) {
    return rejectWithValue('Ошибка соединения');
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    visibleTicketsCount: 5,
    loading: true,
    error: null,
    isComplete: false,
  } as DataState & { isComplete: boolean },
  reducers: {
    increaseVisibleTickets: (state) => {
      state.visibleTicketsCount += 5;
    },
    setTickets: (state, action) => {
      state.items = action.payload;
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
      .addCase(fetchTicketsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsThunk.fulfilled, (state) => {
        state.loading = false;
        state.isComplete = true;
      })
      .addCase(fetchTicketsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increaseVisibleTickets } = dataSlice.actions;

export default dataSlice.reducer;
