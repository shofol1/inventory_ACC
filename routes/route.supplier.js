const express = require("express");
const {
  getSupplierById,
  updateSupplierById,
  createSupplier,
  getAllSupplier,
} = require("../controllers/controller.supplier");
const supplierRouter = express.Router();

supplierRouter.route("/").post(createSupplier).get(getAllSupplier);

supplierRouter.route("/:id").get(getSupplierById).patch(updateSupplierById);

module.exports = { supplierRouter };
