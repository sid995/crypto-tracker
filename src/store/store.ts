import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '@/store/features/cryptoSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      crypto: cryptoReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];