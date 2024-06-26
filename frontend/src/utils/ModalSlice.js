import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
  name: "modal",
  initialState : {
  showModalSignin: false,
  showModalSignup: false,
  showCompose: false,
  },
  reducers: {
    setModalStateSignin: (state, action) => {
      state.showModalSignin = action.payload;
    },
    setModalStateSignup: (state, action) =>{
        state.showModalSignup = action.payload;
    },
    setShowCompose: (state, action) => {
      state.showCompose = action.payload;
    }
  },
});

export const { setModalStateSignin, setModalStateSignup, setShowCompose} = modalSlice.actions;
export default modalSlice.reducer;
