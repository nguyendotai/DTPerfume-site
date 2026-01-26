import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartService,
  addToCartService,
  updateCartItemService,
  removeCartItemService,
  clearCartService,
  syncCartService,
} from "@/app/service/cart.service";

/* GET CART */
export const getCartThunk = createAsyncThunk(
  "cart/get",
  async (_, { getState }) => {
    const state: any = getState();
    return await getCartService(state.auth.token);
  }
);

/* ADD TO CART */
export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (
    payload: { variant_id: number; quantity: number },
    { getState }
  ) => {
    const state: any = getState();
    return await addToCartService(payload, state.auth.token);
  }
);

/* UPDATE QUANTITY */
export const updateCartItemThunk = createAsyncThunk(
  "cart/update",
  async (
    payload: { item_id: number; quantity: number },
    { getState }
  ) => {
    const state: any = getState();
    return await updateCartItemService(
      payload.item_id,
      payload.quantity,
      state.auth.token
    );
  }
);

/* REMOVE ITEM */
export const removeCartItemThunk = createAsyncThunk(
  "cart/remove",
  async (item_id: number, { getState }) => {
    const state: any = getState();
    await removeCartItemService(item_id, state.auth.token);
    return { item_id }; // 👈 QUAN TRỌNG
  }
);


/* CLEAR CART */
export const clearCartThunk = createAsyncThunk(
  "cart/clear",
  async (_, { getState }) => {
    const state: any = getState();
    return await clearCartService(state.auth.token);
  }
);

/* SYNC CART */
export const syncCartThunk = createAsyncThunk(
  "cart/sync",
  async (
    payload: { items: { variant_id: number; quantity: number }[] },
    { getState }
  ) => {
    const state: any = getState();
    return await syncCartService(payload.items, state.auth.token);
  }
);
