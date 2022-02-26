import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { RoundResponse } from 'material/shared/model/rounds.model';
import { getAxios, handleResponseError } from 'material/shared/utils/axios';

import type { RootState } from '../store';

export const fetchCurrentRound = createAsyncThunk(
  'rounds/current',
  async (_, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'GET',
        url: '/rounds/current',
      });

      const { data } = response;

      if (data?.durationMs) {
        data.durationMs /= 1000;
      }

      return data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

interface Props {
  loading: boolean;
  current: RoundResponse | null;
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
      state.current = { ...action.payload };
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
