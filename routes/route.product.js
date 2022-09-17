const express = require("express");
const {
  insertProduct,
  welcome,
  getProduct,
  updateProduct,
  bulkProductUpdate,
} = require("../controllers/controller.product");
const userRouter = express.Router();

userRouter.get("/", welcome);
userRouter.get("/all-product", getProduct);
userRouter.post("/product", insertProduct);
userRouter.patch("/bulk-update", bulkProductUpdate);
userRouter.post("/product/:id", updateProduct);

module.exports = { userRouter };
