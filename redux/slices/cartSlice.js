import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.items.push({
          ...product,
          price: parseFloat(product.price), // Assurez-vous que le prix est un nombre
          quantity: product.quantity || 1, // Par défaut, la quantité est 1 si elle n'est pas définie
        });
      }

      // Recalculer le prix total
      state.totalPrice = state.items.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((product) => product.id !== productId);

      // Recalculer le prix total après suppression
      state.totalPrice = state.items.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
