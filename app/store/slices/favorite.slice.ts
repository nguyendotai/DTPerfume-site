import { createSlice } from "@reduxjs/toolkit";
import {
  getFavoriteThunk,
  addToFavoriteThunk,
  removeFavoriteItemThunk,
  clearFavoriteThunk,
} from "../thunks/favorite.thunks";
import { Product, ProductVariant, ProductImage } from "@/app/types/product";

interface FavoriteItem {
  id: number;
  quantity: number;
  variant: ProductVariant;
}

interface FavoriteState {
  items: FavoriteItem[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  items: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetFavorite(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET FAVORITE
      .addCase(getFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(getFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // ADD TO FAVORITE
      .addCase(addToFavoriteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavoriteThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.item) {
          const exist = state.items.find(
            (i) => i.id === action.payload.item.id,
          );
          if (!exist) {
            state.items.push(action.payload.item);
          }
        }
      })

      // REMOVE
      .addCase(removeFavoriteItemThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i.id !== action.payload?.item_id,
        );
      })

      // CLEAR
      .addCase(clearFavoriteThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { resetFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
