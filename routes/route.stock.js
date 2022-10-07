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
const { insertStock, getStock } = require("../controllers/controller.stock");
const stockRouter = express.Router();

const uploader = require("../middlewear/middlewear.upload");

// userRouter.post("/upload-image", uploader.single("image"), uploadImage);

stockRouter.post("/upload-image", uploader.array("image"), uploadImage);
stockRouter.route("/").post(insertStock).get(getStock);
// stockRouter.patch("/bulk-update", bulkProductUpdate);
// stockRouter.delete("/bulk-delete", bulkDeleteById);
// stockRouter.patch("/stock/:id", updateStock);
// stockRouter.delete("/stock/:id", deleteStockById);

module.exports = { stockRouter };
