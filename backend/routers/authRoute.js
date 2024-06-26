const express = require("express");
const {processSignUp, processLogin} = require("../controllers/signup_login");

const authRouter = express.Router();

authRouter.post("/signup", processSignUp);
authRouter.post("/login", processLogin);

module.exports = authRouter;

