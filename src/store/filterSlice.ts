import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters, FilterState } from '../types/Types';

const initialState: FilterState = {
  filters: {
    All: true,
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

      //  снимаем "All"
      if (filterName !== 'All' && state.filters[filterName] === false) {
        state.filters.All = false;
      }

      //  включаем "All"
      if (
        Object.keys(state.filters)
          .filter((key) => key !== 'All')
          .every((key) => state.filters[key as keyof Filters])
      ) {
        state.filters.All = true;
      }
    },

    toggleAllFilters(state) {
      const newState = !state.filters.All;
      state.filters.All = newState;
      // All фильтры "All"
      Object.keys(state.filters).forEach((key) => {
        if (key !== 'All') {
          state.filters[key as keyof Filters] = newState;
        }
      });
    },
  },
});

export const { toggleFilter, toggleAllFilters } = filterSlice.actions;

export default filterSlice.reducer;
