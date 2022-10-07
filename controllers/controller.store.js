const {
  insertStoreServiceById,
  getStoresService,
  getStoreByIdService,
} = require("../services/service.store");
exports.getStores = async (req, res) => {
  try {
    const stores = await getStoresService();
    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the stores",
      error: error.message,
    });
  }
};
exports.insertStoreById = async (req, res, next) => {
  try {
    const result = await insertStoreServiceById(req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "error", message: error.message });
  }
};
exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await getStoreByIdService(id);

    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the store",
      error: error.message,
    });
  }
};
