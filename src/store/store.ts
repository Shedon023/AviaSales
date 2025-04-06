import { configureStore } from '@reduxjs/toolkit';
import tabsSlice from './tabsSlice';
import filterSlice from './filterSlice';
import dataSlice from './dataSlice';

const store = configureStore({
  reducer: {
    tabs: tabsSlice,
    filter: filterSlice,
    data: dataSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
