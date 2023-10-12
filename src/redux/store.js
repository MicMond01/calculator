import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./math";

export default configureStore({
  reducer: {
    calculator: counterReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
