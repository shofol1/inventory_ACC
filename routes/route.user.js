const express = require("express");
const { signupUser, loginUser } = require("../controllers/controller.user");
const userRouter = express.Router();

userRouter.route("/sign-up").post(signupUser);
userRouter.route("/login").post(loginUser);
module.exports = { userRouter };
