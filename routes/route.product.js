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
  getProductById,
} = require("../controllers/controller.product");
const productRouter = express.Router();

const { router } = require("../app");
const uploader = require("../middlewear/middlewear.upload");
const middlewearVerifyUser = require("../middlewear/middlewear.verifyUser");
const middlewearAuthorization = require("../middlewear/middlewear.authorization");

//if all routes need user login
// router.use(middlewearVerifyUser);

// productRouter.post("/upload-image", uploader.single("image"), uploadImage);
productRouter.post("/upload-image", uploader.array("image"), uploadImage);
productRouter.get("/all-product", getProduct);
productRouter.post(
  "/insert",
  middlewearVerifyUser,
  middlewearAuthorization("admin", "store-manager"),
  insertProduct
);
productRouter.patch("/bulk-update", bulkProductUpdate);
productRouter.delete("/bulk-delete", bulkDeleteById);
productRouter.patch("/product/:id", updateProduct);
productRouter.delete("/product/:id", deleteProductById);
productRouter.get("/product/:id", getProductById);
module.exports = { productRouter };
