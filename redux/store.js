import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Exemple de reducer
import userReducer from "../redux/slices/userSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
