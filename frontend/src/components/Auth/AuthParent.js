import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";



const AuthParent = () => {

  return (
    <div className="signin-page flex flex-col items-center justify-center h-screen">
      <div className="p-8 rounded-lg shadow-xxl">
        <Signin />
        <Signup />
      </div>
    </div>
  );
}
export default AuthParent;
