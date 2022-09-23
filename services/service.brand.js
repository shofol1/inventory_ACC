const { Brand } = require("../models/model.brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
exports.getAllBrandService = async () => {
  const result = await Brand.find({}).select("-product -suppliers");
  return result;
};
exports.getBrandServiceById = async (id) => {
  const result = await Brand.findOne({ _id: id });
  return result;
};
exports.updateBrandServiceById = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
