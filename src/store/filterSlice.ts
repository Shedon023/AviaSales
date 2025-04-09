import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters, FilterState } from '../components/Types';

const initialState: FilterState = {
  filters: {
    Все: true,
    'No stops': true,
    '1 stop': true,
    '2 stops': true,
    '3 stops': true,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<keyof Filters>) {
      const filterName = action.payload;

      state.filters[filterName] = !state.filters[filterName];

      //  снимаем "Все"
      if (filterName !== 'Все' && state.filters[filterName] === false) {
        state.filters.Все = false;
      }

      //  включаем "Все"
      if (
        Object.keys(state.filters)
          .filter((key) => key !== 'Все')
          .every((key) => state.filters[key as keyof Filters])
      ) {
        state.filters.Все = true;
      }
    },

    toggleAllFilters(state) {
      const newState = !state.filters.Все;
      state.filters.Все = newState;
      // все фильтры "Все"
      Object.keys(state.filters).forEach((key) => {
        if (key !== 'Все') {
          state.filters[key as keyof Filters] = newState;
        }
      });
    },
  },
});

export const { toggleFilter, toggleAllFilters } = filterSlice.actions;

export default filterSlice.reducer;
