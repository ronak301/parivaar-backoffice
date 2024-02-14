import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import successReducer from "./successReducer";
import userReducer from "./userReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token"],
};
const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    success: successReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
