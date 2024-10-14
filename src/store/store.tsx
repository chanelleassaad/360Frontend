import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authentication/AuthReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;
