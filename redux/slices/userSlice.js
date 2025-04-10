import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.userInfo = action.payload; // Store the user info after registration
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // Assuming payload contains user data
    },
    setError: (state, action) => {
      state.error = action.payload; // Store the error if registration fails
    },
  },
});

export const { registerUser, loginUser, setError } = userSlice.actions;

export default userSlice.reducer;
