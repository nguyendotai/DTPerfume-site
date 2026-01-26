import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocalCartItem {
  variant_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    image?: string;
    price: number;
  };
}

interface LocalCartState {
  items: LocalCartItem[];
}

const initialState: LocalCartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("local_cart") || "[]")
      : [],
};

const localCartSlice = createSlice({
  name: "localCart",
  initialState,
  reducers: {
    addLocalItem(state, action: PayloadAction<LocalCartItem>) {
      const exist = state.items.find(
        (i) => i.variant_id === action.payload.variant_id
      );

      if (exist) {
        exist.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("local_cart", JSON.stringify(state.items));
    },

    updateLocalQuantity(
      state,
      action: PayloadAction<{ variant_id: number; quantity: number }>
    ) {
      const item = state.items.find(
        (i) => i.variant_id === action.payload.variant_id
      );

      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem("local_cart", JSON.stringify(state.items));
      }
    },

    removeLocalItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (i) => i.variant_id !== action.payload
      );
      localStorage.setItem("local_cart", JSON.stringify(state.items));
    },

    clearLocalCart(state) {
      state.items = [];
      localStorage.removeItem("local_cart");
    },
  },
});

export const {
  addLocalItem,
  updateLocalQuantity,
  removeLocalItem,
  clearLocalCart,
} = localCartSlice.actions;

export default localCartSlice.reducer;
