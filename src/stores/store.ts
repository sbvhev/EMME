import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './reducers/auth';
import roundsReducer from './reducers/rounds';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rounds: roundsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
