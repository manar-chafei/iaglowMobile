import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Validation : Assurez-vous que le produit a un _id
      if (!newItem._id) {
        console.error("Produit invalide : aucun _id trouvé", newItem);
        return;
      }

      // Convertir le prix en nombre flottant
      newItem.price = parseFloat(newItem.price);

      // Rechercher si le produit existe déjà dans le panier
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        // Si le produit existe, augmenter sa quantité
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // Sinon, ajouter le nouveau produit avec une quantité par défaut de 1
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }

      // Recalculer le prix total du panier
      state.totalPrice = state.items.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      );
    },
    updateCart: (state, action) => {
      state.items = action.payload; // Updates the cart with the new items
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
