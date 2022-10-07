const { Product } = require("../models/model.product");

exports.getAllProducts = async (filters, queries) => {
  console.log(queries);
  const result = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fieldBy);

  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, result };
};
exports.productServiceDelete = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};
exports.bulkDeleteServiceProduct = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
exports.bulkProductService = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  console.log(result);
};
exports.getProductServiceById = async (id) => {
  const result = await Product.findById(id);
  return result;
};
