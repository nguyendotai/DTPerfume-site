import { createSlice } from "@reduxjs/toolkit";

interface Notification {
  id: number;
  message: string;
  type?: string;
  read?: boolean;
  createdAt?: string;
}

interface NotificationState {
  list: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  list: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift({
        ...action.payload,
        read: false,
      });
      state.unreadCount += 1;
    },
    markAllRead: (state) => {
      state.list.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAllRead } = notificationSlice.actions;
export default notificationSlice.reducer;
