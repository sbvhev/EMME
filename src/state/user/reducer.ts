import { createReducer } from '@reduxjs/toolkit';

import * as storage from 'material/shared/utils/localstorage';

import { StorageKey } from 'material/shared/model/localstorage.model';
import { updateMediaDarkMode, updateUserDarkMode, updateVersion } from './actions';

const currentTimestamp = () => new Date().getTime();

export interface UserState {
  lastUpdateVersionTimestamp?: number;
  userDarkMode: boolean | null; // the user's choice for dark mode or light mode
  mediaDarkMode: boolean; // whether the dark mode media query matches
  timestamp: number;
}

export const initialState: UserState = {
  userDarkMode: null,
  mediaDarkMode: false,
  timestamp: currentTimestamp(),
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      state.lastUpdateVersionTimestamp = currentTimestamp();
    })
    .addCase(updateUserDarkMode, (state, action) => {
      storage.set(StorageKey.EMME_DARK_MODE, action.payload.userDarkMode ? '1' : '0');

      state.userDarkMode = action.payload.userDarkMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateMediaDarkMode, (state, action) => {
      state.mediaDarkMode = action.payload.mediaDarkMode;
      state.timestamp = currentTimestamp();
    })
);
