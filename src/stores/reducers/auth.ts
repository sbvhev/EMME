import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from 'config/index';
import * as storage from 'material/shared/utils/localstorage';

import { SignupFormData } from 'pages/SignupPage/SignupForm';
import { LoginFormData } from 'pages/LoginPage/LoginForm';
import { StorageKey } from 'material/shared/model/localstorage.model';

import type { RootState } from '../store';

export const fetchCreateUser = createAsyncThunk(
  'auth/create-user',
  async (
    options: Pick<SignupFormData, 'email' | 'firstName' | 'lastName' | 'password'>,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/users`, options);
      return response.data;
    } catch (error: any) {
      console.log('error response: ', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginFormData, { rejectWithValue }) => {
    try {
      const username = email;

      const token = btoa(`${username}:${password}`);
      const response = await axios.post(
        `${API_URL}/users/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log('response: ', error.response.data);
      return rejectWithValue(error.response.data || { message: 'Username or password incorrect.' });
    }
  }
);

interface Props {
  isRegister: boolean;
  isLogin: boolean;
  loading: boolean;
  user: any;
  errors: any;
}

const initialState: Props = {
  isRegister: false,
  isLogin: false,
  loading: false,
  user: null,
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetData: (state) => {
      state.errors = null;
      state.isRegister = false;
      state.isLogin = false;
      state.user = null;
    },
    resetMessage: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(fetchCreateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isRegister = true;
      state.user = action.payload;
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
      state.isRegister = false;
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
      state.isLogin = true;
      state.user = action.payload;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.isLogin = false;
      state.user = null;
      state.errors = action.payload;
    });
  },
});

export const { resetData, resetMessage } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
