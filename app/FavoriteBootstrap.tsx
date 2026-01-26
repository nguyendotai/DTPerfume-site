"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getFavoriteThunk, syncFavoriteThunk } from "./store/thunks/favorite.thunks";
import { clearLocalFavorite } from "./store/slices/favorite.local.slice";

export default function FavoriteBootstrap() {
  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);
  const localItems = useSelector(
    (state: RootState) => state.cartLocal.items
  );

  useEffect(() => {
    if (!token) return;

    // 🔥 Có local cart → sync lên server
    if (localItems.length > 0) {
      dispatch(syncFavoriteThunk({ items: localItems }))
        .unwrap()
        .then(() => {
          dispatch(clearLocalFavorite());
          dispatch(getFavoriteThunk());
        });
    } else {
      dispatch(getFavoriteThunk());
    }
  }, [token, dispatch]);

  return null;
}
