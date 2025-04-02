import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Exemple de reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
