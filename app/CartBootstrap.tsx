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
  const user = useSelector((state: RootState) => state.auth.user);
  const localItems = useSelector(
    (state: RootState) => state.cartLocal.items
  );

  useEffect(() => {
    if (!user) return;

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
  }, [user, dispatch]);

  return null;
}
