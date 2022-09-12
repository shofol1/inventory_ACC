const express = require("express");
const {
  insertProduct,
  welcome,
  getProduct,
} = require("../controllers/controller.product");
const userRouter = express.Router();

userRouter.get("/", welcome);
userRouter.get("/all-product", getProduct);
userRouter.post("/product", insertProduct);

module.exports = { userRouter };
