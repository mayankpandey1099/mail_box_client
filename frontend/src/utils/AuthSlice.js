import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("token") ? true : false,
    isToken: localStorage.getItem("token") || null,
    isEmail: localStorage.getItem("email") || null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuth = action.payload; 
    },
    setToken: (state, action) => {
      state.isToken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserEmail: (state, action) => {
      state.isEmail = action.payload;
      localStorage.setItem("email", action.payload);
    },
    clearAuthState: (state) => {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setAuthenticated, setToken, setUserEmail, clearAuthState  } = authSlice.actions;

export default authSlice.reducer;
