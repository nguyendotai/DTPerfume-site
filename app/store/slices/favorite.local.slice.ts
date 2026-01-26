import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocalFavoriteItem {
  variant_id: number;
  product: {
    id: number;
    name: string;
    image?: string;
    price: number;
  };
}

interface LocalFavoriteState {
  items: LocalFavoriteItem[];
}

const initialState: LocalFavoriteState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("local_favorite") || "[]")
      : [],
};

const localFavoriteSlice = createSlice({
  name: "localFavorite",
  initialState,
  reducers: {
    addLocalFavoriteItem(state, action: PayloadAction<LocalFavoriteItem>) {
      const exist = state.items.find(
        (i) => i.variant_id === action.payload.variant_id
      );

      if (!exist) {
        state.items.push(action.payload);
        localStorage.setItem("local_favorite", JSON.stringify(state.items));
      }
    },

    removeLocalFavoriteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (i) => i.variant_id !== action.payload
      );
      localStorage.setItem("local_favorite", JSON.stringify(state.items));
    },

    clearLocalFavorite(state) {
      state.items = [];
      localStorage.removeItem("local_favorite");
    },
  },
});


export const {
  addLocalFavoriteItem,
  removeLocalFavoriteItem,
  clearLocalFavorite,
} = localFavoriteSlice.actions;

export default localFavoriteSlice.reducer;
