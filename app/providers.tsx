"use client";

import { Provider } from "react-redux";
import { store} from "@/app/store";
import AuthBootstrap from "./AuthBootstrap";
import CartBootstrap from "./CartBootstrap";
import FavoriteBootstrap from "./FavoriteBootstrap";


export default function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      <CartBootstrap />
      <FavoriteBootstrap />
      {children}
    </Provider>
  );  
}
