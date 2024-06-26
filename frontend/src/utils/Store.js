import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import modalReducer from "./ModalSlice";
import mailReducer from "./MailSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    mail: mailReducer,
  },
});
