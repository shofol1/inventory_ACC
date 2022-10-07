const express = require("express");
const {
  insertStoreById,
  getStores,
  getStoreById,
} = require("../controllers/controller.store");
const storeRouter = express.Router();

storeRouter.route("/").post(insertStoreById).get(getStores);
storeRouter.route("/:id").get(getStoreById);

module.exports = { storeRouter };
