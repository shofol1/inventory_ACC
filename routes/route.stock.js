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
const {
  insertStock,
  getStock,
  getStockById,
} = require("../controllers/controller.stock");
const stockRouter = express.Router();

const uploader = require("../middlewear/middlewear.upload");

stockRouter.route("/").post(insertStock).get(getStock);
stockRouter.route("/:id").get(getStockById);
// stockRouter.patch("/bulk-update", bulkProductUpdate);
// stockRouter.delete("/bulk-delete", bulkDeleteById);
// stockRouter.patch("/stock/:id", updateStock);
// stockRouter.delete("/stock/:id", deleteStockById);

module.exports = { stockRouter };
