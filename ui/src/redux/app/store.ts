import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { locationSlice } from "../features/location/location.slice";

export const rootReducer = () => {
  return {
    [locationSlice.name]: locationSlice.reducer,
  };
};

export const store = configureStore({
  reducer: rootReducer(),
  middleware: getDefaultMiddleware =>
    import.meta.env.DEV ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type RootReducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
