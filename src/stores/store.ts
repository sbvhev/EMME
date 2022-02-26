import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './reducers/auth';
import liquidityMarketReducer from './reducers/liquidityMarket';
import roundsReducer from './reducers/rounds';
import userReducer from './reducers/users';
import exchangeReducer from './reducers/exchange';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    rounds: roundsReducer,
    liquidityMarket: liquidityMarketReducer,
    exchange: exchangeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
