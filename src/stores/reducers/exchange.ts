import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import {
  SupportedExchangeResponse,
  SupportedExchangeSummariesResponse,
} from 'material/shared/model/exchange.model';

import { getAxios, handleResponseError } from 'material/shared/utils/axios';

import type { RootState } from '../store';

export const fetchExchanges = createAsyncThunk('exchanges', async (_, { rejectWithValue }) => {
  let axiosInst: AxiosInstance;

  try {
    axiosInst = await getAxios(true);
  } catch (err: any) {
    return rejectWithValue(err?.message || err);
  }

  try {
    const response = await axiosInst.request({
      method: 'GET',
      url: '/exchanges',
    });

    return response.data as SupportedExchangeSummariesResponse;
  } catch (error: any) {
    const msg: Object | string = handleResponseError(error?.response?.data || error);
    return rejectWithValue(msg);
  }
});

interface Props {
  loadingExchanges: boolean;
  exchanges: SupportedExchangeResponse[] | null;
  errors: any;
  success: any;
}

const initialState: Props = {
  loadingExchanges: false,
  exchanges: null,
  errors: null,
  success: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    resetData: (state) => {
      state.exchanges = null;
    },
    resetMessage: (state) => {
      state.success = null;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    // GET exchanges
    builder.addCase(fetchExchanges.pending, (state) => {
      state.loadingExchanges = true;
    });
    builder.addCase(fetchExchanges.fulfilled, (state, action) => {
      state.loadingExchanges = false;

      if (JSON.stringify(state.exchanges) !== JSON.stringify(action.payload.exchanges)) {
        state.exchanges = [...action.payload.exchanges];
      }
    });
    builder.addCase(fetchExchanges.rejected, (state, action) => {
      state.errors = action.payload;
      state.loadingExchanges = false;
      state.exchanges = null;
    });
  },
});

export const { resetData, resetMessage } = exchangeSlice.actions;
export const exchangeSelector = (state: RootState) => state.exchange;
export default exchangeSlice.reducer;
