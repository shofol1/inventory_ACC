const express = require("express");
const {
  insertProduct,
  welcome,
  getProduct,
  updateProduct,
  bulkProductUpdate,
  deleteProductById,
  bulkDeleteById,
  uploadImage,
} = require("../controllers/controller.product");
const userRouter = express.Router();

const { router } = require("../app");
const uploader = require("../middlewear/middlewear.upload");

// userRouter.post("/upload-image", uploader.single("image"), uploadImage);
userRouter.post("/upload-image", uploader.array("image"), uploadImage);
userRouter.get("/", welcome);
userRouter.get("/all-product", getProduct);
userRouter.post("/product", insertProduct);
userRouter.patch("/bulk-update", bulkProductUpdate);
userRouter.delete("/bulk-delete", bulkDeleteById);
userRouter.patch("/product/:id", updateProduct);
userRouter.delete("/product/:id", deleteProductById);

module.exports = { userRouter };
