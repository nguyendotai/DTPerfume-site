import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, RegisterPayload, UpdateProfilePayload } from "@/app/types/auth";
import { loginService, registerService, getMeService, updateProfileService, logoutService } from "@/app/service/auth.service";
import { syncCartThunk, getCartThunk } from "./cart.thunks";
import { getLocalCart, clearLocalCart } from "@/app/utils/cartLocal";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    return await loginService(payload);
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload) => {
    return await registerService(payload);
  }
);

export const getMeThunk = createAsyncThunk(
  "auth/me",
  async () => {
    return await getMeService(); 
  }
);

export const updateProfileThunk = createAsyncThunk(
  "auth/update",
  async (payload: UpdateProfilePayload) => {
    return await updateProfileService(payload);
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    return await logoutService();
  }
);