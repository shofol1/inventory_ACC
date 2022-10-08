const { Product } = require("../models/model.product");
const { Stock } = require("../models/model.stock");

exports.getAllStocks = async (filters, queries) => {
  console.log(queries);
  const result = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fieldBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, result };
};
exports.stockServiceDelete = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.getStockServiceById = async (id) => {
  const result = await Stock.findById({ _id: id })
    .populate("store.id")
    .populate("suppliedBy.id")
    .populate("brand.id");
  return result;
};
