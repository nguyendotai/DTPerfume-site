import { createSlice } from "@reduxjs/toolkit";
import {
  getCartThunk,
  addToCartThunk,
  updateCartItemThunk,
  removeCartItemThunk,
  clearCartThunk,
} from "../thunks/cart.thunks";

interface CartItem {
  id: number;
  quantity: number;
  variant: {
    discount_price: number;
    id: number;
    price: number;
    product: {
      id: number;
      name: string;
      image?: string;
    };
  };
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // ADD TO CART
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state) => {
        state.loading = false;
      })

      // UPDATE
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        const updated = action.payload?.item;
        if (!updated) return;

        const index = state.items.findIndex(
          (i) => i.id === updated.id
        );
        if (index !== -1) {
          state.items[index].quantity = updated.quantity;
        }
      })

      // REMOVE
      .addCase(removeCartItemThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i.id !== action.payload?.item_id
        );
      })

      // CLEAR
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
