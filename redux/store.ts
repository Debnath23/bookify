import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import userReducer from "@/redux/slices/userSlice";
import appointmentReducer from "@/redux/slices/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
