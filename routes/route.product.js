const express = require("express");
const { insertProduct } = require("../controllers/controller.product");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
userRouter.post("/product", insertProduct);

module.exports = { userRouter };
