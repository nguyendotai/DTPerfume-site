import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import cartReducer from "./slices/cart.slice";
import cartLocalReducer from "./slices/cart.local.slice";
import favoriteReducer from "./slices/favorite.slice";
import favoriteLocalReducer from "./slices/favorite.local.slice";
import notificationReducer from "./slices/notification.slice";
import compareReducer from "./slices/compare.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    cartLocal: cartLocalReducer,
    favorite: favoriteReducer,
    favoriteLocal: favoriteLocalReducer,
    notification: notificationReducer,
    compare: compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
