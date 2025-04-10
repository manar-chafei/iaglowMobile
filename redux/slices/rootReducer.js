const initialState = {
  cart: {
    items: [],
    totalPrice: 0, // ou une autre valeur par défaut
  },
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Logique pour ajouter un produit au panier
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, action.payload],
          totalPrice: state.cart.totalPrice + action.payload.price, // ou autre logique pour calculer totalPrice
        },
      };
    case "REMOVE_FROM_CART":
      // Logique pour supprimer un produit du panier
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(
            (item) => item.id !== action.payload.id
          ),
          totalPrice: state.cart.totalPrice - action.payload.price, // ou autre logique
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
