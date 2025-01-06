import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/api/baseApi.js"; // Import baseApi
import {authReducer }from "./features/auth/authSlice.js"
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { themReducer } from "./features/theme/themeSlice.js";
// Persist config for auth
const persistConfig = {
  key: "auth",
  storage,
};



// Persisted auth reducer
const persistAuth = persistReducer(persistConfig, authReducer);

// Configure store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add baseApi reducer for API calls
    auth: persistAuth, 
    theme : themReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(baseApi.middleware), // Add baseApi middleware
  devTools: true,
});

// Persistor for redux-persist
export const persistor = persistStore(store);
