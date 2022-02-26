import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { StorageKey } from 'material/shared/model/localstorage.model';
import { LoginInfoResponse } from 'material/shared/model/users';
import { SignupFormData } from 'pages/SignupPage/SignupForm';
import { LoginFormData } from 'pages/LoginPage/LoginForm';
import { getAxios, handleResponseError } from 'material/shared/utils/axios';
import * as storage from '../../material/shared/utils/localstorage';

import type { RootState } from '../store';

export const fetchCreateUser = createAsyncThunk(
  'auth/create-user',
  async (
    options: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>,
    { rejectWithValue }
  ) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(false);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const response = await axiosInst.request({
        method: 'POST',
        url: '/users',
        data: { ...options },
      });

      return response.data;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(error?.response?.data || error);
      return rejectWithValue(msg);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginFormData, { rejectWithValue }) => {
    let axiosInst: AxiosInstance;

    try {
      axiosInst = await getAxios(false);
    } catch (err: any) {
      return rejectWithValue(err?.message || err);
    }

    try {
      const username = email;
      const token = btoa(`${username}:${password}`);

      const response = await axiosInst.request({
        method: 'POST',
        url: '/users/login',
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      return response.data as LoginInfoResponse;
    } catch (error: any) {
      const msg: Object | string = handleResponseError(
        error?.response?.data || error || 'Email or password do not match.'
      );
      return rejectWithValue(msg);
    }
  }
);

interface Props {
  loading: boolean;
  user: LoginInfoResponse | null;
  token: string | null;
  errors: any;
  success: any;
}

const initialState: Props = {
  loading: false,
  user: null,
  token: null,
  errors: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthData: (state) => {
      storage.clear();
      state.errors = null;
      state.success = null;
      state.user = null;
      state.token = null;
    },
    resetAuthMessage: (state) => {
      state.errors = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(fetchCreateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = 'You have successfully created an account';
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    // login
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      storage.set(StorageKey.EMME_TOKEN, action.payload.token);
      storage.set(StorageKey.EMME_EMAIL, action.payload.email);
      storage.set(StorageKey.EMME_ID, action.payload.id);
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.success = 'You’ve successfully logged into the system';
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.errors = action.payload;
    });
  },
});

export const { resetAuthData, resetAuthMessage } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
