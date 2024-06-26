import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalStateSignin,
  setModalStateSignup,
} from "../../Utils/ModalSlice";
import logo from "../../Images/mail-logo.jpg";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {}, [isAuthenticated]);

  const handleSignInClick = () => {
    dispatch(setModalStateSignin(true));
    dispatch(setModalStateSignup(false));
  };

  const handleSignUpClick = () => {
    dispatch(setModalStateSignup(true));
    dispatch(setModalStateSignin(false));
  };

  return (
    <div className="flex items-center justify-between bg-slate-700 px-5 py-5 text-white">
      <div className="flex items-center">
        <div className="w-14 h-14 mr-4 overflow-hidden rounded-full">
          <img src={logo} alt="Logo" className="w-full h-auto bg-white" />
        </div>
        <span
          className="font-bold text-xl"
          style={{ fontFamily: "'Poetsen One', sans-serif" }}
        >
          Inbox-Stream
        </span>
      </div>
      <div className="flex items-center">
        {!isAuthenticated && (
          <>
            <button
              className="mr-2 p-2 font-bold text-white rounded-lg"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button
              className="mr-2 p-2 font-bold text-white rounded-lg"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
