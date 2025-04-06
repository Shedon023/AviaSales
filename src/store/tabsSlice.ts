import { createSlice } from '@reduxjs/toolkit';

type Tabs = {
  activeTab: 'optimal' | 'cheapest' | 'fastest';
};

const initialState: Tabs = {
  activeTab: 'cheapest',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    tabCheapest: (state) => {
      state.activeTab = 'cheapest';
    },
    tabFastest: (state) => {
      state.activeTab = 'fastest';
    },
    tabOptimal: (state) => {
      state.activeTab = 'optimal';
    },
  },
});

export const { tabCheapest, tabFastest, tabOptimal } = tabsSlice.actions;

export default tabsSlice.reducer;
