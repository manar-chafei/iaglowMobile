// redux/reducers/authReducer.js
const initialState = {
  isAuthenticated: false, // true si l'utilisateur est connecté
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
