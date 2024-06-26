import {createSlice} from "@reduxjs/toolkit";


const mailSlice = createSlice({
  name: "mail",
  initialState: {
    unReadCount: 0,
    sentEmails: [],
  },
  reducers: {
    setReadCount: (state, action) => {
      state.unReadCount = action.payload;
    },
    setSentEmails: (state, action)=>{
      state.sentEmails = action.payload;
    }
  },
});

export const {setReadCount, setSentEmails} = mailSlice.actions;

export default mailSlice.reducer;