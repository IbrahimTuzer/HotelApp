import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reservationReducer from "./reservationSlice";

import thunk from "redux-thunk";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    reservation: reservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
