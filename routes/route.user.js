const express = require("express");
const { signupUser } = require("../controllers/controller.user");
const userRouter = express.Router();

userRouter.route("/sign-up").post(signupUser);
module.exports = { userRouter };
