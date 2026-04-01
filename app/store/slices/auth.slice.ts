import { createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "@/app/types/auth";
import {
  loginThunk,
  registerThunk,
  getMeThunk,
  updateProfileThunk,
  logoutThunk,
} from "../thunks/auth.thunk";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  registerSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  registerSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // REGISTER
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.registerSuccess = false;
      })

      // GET ME
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // UPDATE PROFILE
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
