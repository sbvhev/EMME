import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config/index";

import type { RootState } from "../store";

export const fetchCreateUser = createAsyncThunk(
  "auth/create-user",
  async (options: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}users`, options);
      return response.data;
    } catch (error: any) {
      console.log("response: ", error.response.data);
      return rejectWithValue(error.response.data);
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
  name: "auth",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.errors = null;
      state.isRegister = false;
      state.user = null;
    }
  },
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

export const { resetData } = authSlice.actions; 
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
