import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFavoriteService,
  addToFavoriteService,
  removeFavoriteItemService,
  clearFavoriteService,
  syncFavoriteService,
} from "@/app/service/favorite.service";

/* GET FAVORITE */
export const getFavoriteThunk = createAsyncThunk(
  "favorite/get",
  async (_, { getState }) => {
    const state: any = getState();
    return await getFavoriteService(state.auth.token);
  }
);

/* ADD TO FAVORITE */
export const addToFavoriteThunk = createAsyncThunk(
  "favorite/add",
  async (
    payload: { variant_id: number },
    { getState }
  ) => {
    const state: any = getState();
    return await addToFavoriteService(payload, state.auth.token);
  }
);

/* REMOVE ITEM */
export const removeFavoriteItemThunk = createAsyncThunk(
  "favorite/remove",
  async (item_id: number, { getState }) => {
    const state: any = getState();
    await removeFavoriteItemService(item_id, state.auth.token);
    return { item_id };
  }
);

/* CLEAR FAVORITE */
export const clearFavoriteThunk = createAsyncThunk(
  "favorite/clear",
  async (_, { getState }) => {
    const state: any = getState();
    return await clearFavoriteService(state.auth.token);
  }
);

/* SYNC FAVORITE */
export const syncFavoriteThunk = createAsyncThunk(
  "favorite/sync",
  async (payload: { items: { variant_id: number }[] }, { getState }) => {
    const state: any = getState();
    return await syncFavoriteService(payload.items, state.auth.token);
  }
);

