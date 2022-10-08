const express = require("express");
const {
  signupUser,
  loginUser,
  getME,
} = require("../controllers/controller.user");
const middlewearVerifyUser = require("../middlewear/middlewear.verifyUser");
const userRouter = express.Router();

userRouter.route("/sign-up").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.get("/me", middlewearVerifyUser, getME);
module.exports = { userRouter };
