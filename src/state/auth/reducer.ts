import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from 'config/index';

export const fetchCreateUser = createAsyncThunk(
  'auth/create-user',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, data);
      console.log('response: ', response.data);
      return response.data;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
);

interface Props {
  isRegister: boolean;
  loading: boolean;
  user: any;
  errors: any;
}

const initialState: Props = {
  isRegister: false,
  loading: false,
  user: null,
  errors: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default authSlice.reducer;
