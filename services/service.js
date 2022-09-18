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
