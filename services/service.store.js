const { Store } = require("../models/model.store");

exports.insertStoreServiceById = async (data) => {
  const result = await Store.create(data);
  return result;
};
exports.getStoresService = async () => {
  const result = await Store.find();
  return result;
};
exports.getStoreByIdService = async (id) => {
  const result = await Store.findById(id);
  return result;
};
