const express = require("express");
const {
  signupUser,
  loginUser,
  getME,
  confirmEmail,
} = require("../controllers/controller.user");
const middlewearVerifyUser = require("../middlewear/middlewear.verifyUser");
const userRouter = express.Router();

userRouter.post("/sign-up", signupUser);
userRouter.route("/login").post(loginUser);
userRouter.get("/me", middlewearVerifyUser, getME);
userRouter.get("/sign-up/confirmation/:token", confirmEmail);
module.exports = { userRouter };
