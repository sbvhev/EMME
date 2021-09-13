import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { RoundRepose } from 'material/shared/model/rounds.model';
import { getAxios, handleResponseError } from 'material/shared/utils/axios';

import type { RootState } from '../store';

export const fetchCurrentRound = createAsyncThunk(
  'rounds/current',
  async (_, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      console.log('fetchCurrentRound', err);
      return rejectWithValue(err?.message);
    }

    try {
      const response = await axiosInst.request({
        method: 'GET',
        url: '/rounds/current',
      });

      return response.data as RoundRepose;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error);
      console.log('error response: ', msg);
      return rejectWithValue(msg);
    }
  }
);

interface Props {
  loading: boolean;
  current: RoundRepose | null;
  errors: any;
}

const initialState: Props = {
  loading: false,
  current: null,
  errors: null,
};

const roundsSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    resetData: (state) => {
      state.errors = null;
      state.current = null;
    },
    resetMessage: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    // current
    builder.addCase(fetchCurrentRound.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentRound.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });
    builder.addCase(fetchCurrentRound.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
      state.current = null;
    });
  },
});

export const { resetData, resetMessage } = roundsSlice.actions;
export const roundsSelector = (state: RootState) => state.rounds;
export default roundsSlice.reducer;
