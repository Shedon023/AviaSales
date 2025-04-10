import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TabType } from '../types/Types';

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
    setTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setTab } = tabsSlice.actions;
export default tabsSlice.reducer;
