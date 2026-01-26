"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getMeThunk } from "@/app/store/thunks/auth.thunk";

function AuthBootstrap() {
  const dispatch = useDispatch<any>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getMeThunk(token));
    }
  }, [token, dispatch]);

  return null;
}

export default AuthBootstrap;
