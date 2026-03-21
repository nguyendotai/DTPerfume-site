"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  getCartThunk,
  syncCartThunk,
} from "@/app/store/thunks/cart.thunks";
import { clearLocalCart } from "@/app/store/slices/cart.local.slice";

export default function CartBootstrap() {
  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);
  const localItems = useSelector(
    (state: RootState) => state.cartLocal.items
  );

  useEffect(() => {
    if (!token) return;

    if (localItems.length > 0) {
      dispatch(syncCartThunk({ items: localItems }))
        .unwrap()
        .then(() => {
          dispatch(clearLocalCart());
          dispatch(getCartThunk());
        });
    } else {
      dispatch(getCartThunk());
    }
  }, [token, dispatch]);

  return null;
}
