import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { getAxios, handleResponseError } from 'material/shared/utils/axios';
import { ApiAccessType } from 'pages/ProfilePage/ApiKeys/Exchange';
import type { RootState } from '../store';

export const fetchUserInfo = createAsyncThunk('users/info', async (_, { rejectWithValue }) => {
  let axiosInst: AxiosInstance;

  try {
    axiosInst = await getAxios(true);
  } catch (err: any) {
    return rejectWithValue(err?.message || err);
  }

  try {
    const response = await axiosInst.request({
      method: 'GET',
      url: '/users/me',
    });

    const { data } = response;

    return data;
  } catch (error: any) {
    const msg: Object | string = handleResponseError(error?.response?.data || error);
    return rejectWithValue(msg);
  }
});

export const fetchUserBalance = createAsyncThunk(
  'users/balance',
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
        url: '/users/me/balance',
      });

      return response.data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const fetchCredentials = createAsyncThunk(
  'users/credentials',
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
        url: '/users/exchange-credentials',
      });

      const { data } = response;

      return data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const createCredentials = createAsyncThunk(
  'users/createCredentials',
  async (options: Pick<ApiAccessType, 'exchangeId' | 'key' | 'secret'>, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'POST',
        url: '/users/exchange-credentials',
        data: options,
      });

      const { data } = response;

      return data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const removeCredentials = createAsyncThunk(
  'users/removeCredentials',
  async (options: Pick<ApiAccessType, 'exchangeId'>, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(true);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      await axiosInst.request({
        method: 'DELETE',
        url: `/users/exchange-credentials?exchangeId=${options.exchangeId}`,
      });

      return true;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

interface Props {
  user: any;
  balance: number;
  loading: boolean;
  errors: any;
  success: any;
  credentials: any;
}

const initialState: Props = {
  user: null,
  balance: 0.0,
  loading: true,
  errors: null,
  success: null,
  credentials: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    resetUsersData: (state) => {
      state.user = null;
      state.balance = 0.0;
      state.success = null;
      state.loading = false;
      state.errors = null;
      state.credentials = {};
    },
    resetMessage: (state) => {
      state.errors = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.errors = action.payload;
    });
    // balance
    builder.addCase(fetchUserBalance.fulfilled, (state, action) => {
      state.balance = (action.payload && action.payload.balance) || 0;
    });
    builder.addCase(fetchUserBalance.rejected, (state, action) => {
      state.balance = 0;
      state.errors = action.payload;
    });
    // credentials
    builder.addCase(fetchCredentials.fulfilled, (state, action) => {
      state.credentials = action.payload || {};
    });
    builder.addCase(fetchCredentials.rejected, (state, action) => {
      state.credentials = {};
      state.errors = action.payload;
    });
    builder.addCase(createCredentials.fulfilled, (state, action) => {
      state.credentials = action.payload || {};
      state.success = 'You have successfully stored API keys';
      state.errors = null;
    });
    builder.addCase(createCredentials.rejected, (state, action) => {
      state.credentials = {};
      state.success = null;
      state.errors = action.payload;
    });
    builder.addCase(removeCredentials.fulfilled, (state, action) => {
      state.credentials = action.payload || {};
      state.success = 'You have successfully disabled API keys';
      state.errors = null;
    });
    builder.addCase(removeCredentials.rejected, (state, action) => {
      state.credentials = {};
      state.success = null;
      state.errors = action.payload;
    });
  },
});

export const { resetUsersData, resetMessage } = userSlice.actions;
export const userSelector = (state: RootState) => state.users;
export default userSlice.reducer;
