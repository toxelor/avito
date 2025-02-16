import { configureStore } from "@reduxjs/toolkit";
import MainSlice from './MainSlice'

const rootReducer = {
    MainSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
