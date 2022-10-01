const Supplier = require("../models/model.supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
exports.getAllSupplierService = async () => {
  const result = await Supplier.find({}).select("-product -suppliers");
  return result;
};
exports.getSupplierServiceById = async (id) => {
  const result = await Supplier.findOne({ _id: id }).populate("products");
  return result;
};
exports.updateSupplierServiceById = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
