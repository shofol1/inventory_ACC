const express = require("express");
const {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrandById,
} = require("../controllers/controller.brand");
const brandRouter = express.Router();

brandRouter.route("/").post(createBrand).get(getAllBrand);
brandRouter.route("/:id").get(getBrandById).patch(updateBrandById);

module.exports = { brandRouter };
