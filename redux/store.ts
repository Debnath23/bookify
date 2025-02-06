import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "@/redux/slices/authSlice";
import userReducer from "@/redux/slices/userSlice";
import appointmentReducer from "@/redux/slices/appointmentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  appointment: appointmentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "appointment"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
