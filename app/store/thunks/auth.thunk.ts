import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, RegisterPayload, UpdateProfilePayload } from "@/app/types/auth";
import { loginService, registerService, getMeService, updateProfileService } from "@/app/service/auth.service";
import { syncCartThunk, getCartThunk } from "./cart.thunks";
import { getLocalCart, clearLocalCart } from "@/app/utils/cartLocal";

/* LOGIN */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    return await loginService(payload);
  }
);

/* REGISTER */
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload) => {
    return await registerService(payload);
  }
);

/* GET ME */
export const getMeThunk = createAsyncThunk(
  "auth/me",
  async (token: string) => {
    return await getMeService(token);
  }
);

/* UPDATE */
export const updateProfileThunk = createAsyncThunk(
  "auth/update",
  async (
    payload: UpdateProfilePayload,
    { getState }
  ) => {
    const state: any = getState();
    return await updateProfileService(payload, state.auth.token);
  }
);
