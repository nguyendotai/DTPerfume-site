"use client";

import { useEffect } from "react";
import { socket } from "@/app/lib/socket";
import { useDispatch } from "react-redux";
import { addNotification } from "@/app/store/slices/notification.slice";

export default function SocketListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log("🔥 RECEIVED NOTI:", data);
      dispatch(addNotification(data));
    });

    return () => {
      socket.off("new-notification");
    };
  }, [dispatch]);

  return null;
}
