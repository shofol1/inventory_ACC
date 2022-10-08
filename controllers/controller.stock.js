const { Stock } = require("../models/model.stock");
const {
  getAllStocks,
  stockServiceDelete,
  getStockServiceById,
} = require("../services/service.stock");
exports.getStock = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const filterStingify = JSON.stringify(filters);

    const replacedString = filterStingify.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(replacedString);
    filters = JSON.parse(replacedString);

    const excludeField = ["sort", "limit", "page"];
    excludeField.forEach((field) => delete filters[field]);
    // console.log("original object", req.query);
    // console.log("exclude object", filters);
    const queries = {};

    //pagination
    const { page = 1, limit = 10 } = req.query;
    if (req.query.page) {
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fieldBy = fields;
    }
    const stock = await getAllStocks(filters, queries);

    res.status(200).json({ status: "success", data: stock });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};
exports.insertStock = async (req, res, next) => {
  try {
    const newStock = req.body;
    const product = new Stock(newStock);
    const result = await product.save();
    result.logger();
    res.json({
      message: "stock inserted successfully",
      status: 200,
      data: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "stock not inserted",
      error: error.message,
    });
  }
};
exports.getStock = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const filterStingify = JSON.stringify(filters);

    const replacedString = filterStingify.replace(
      /\b(gt|gte|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(replacedString);
    filters = JSON.parse(replacedString);

    const excludeField = ["sort", "limit", "page"];
    excludeField.forEach((field) => delete filters[field]);
    // console.log("original object", req.query);
    // console.log("exclude object", filters);
    const queries = {};

    //pagination
    const { page = 1, limit = 10 } = req.query;
    if (req.query.page) {
      //50 products
      //page 1-->1-10
      //page 2-->11-20
      //page 3-->21-30 ----> 3-1=2*10
      //page 4-->31-40
      //page 5-->41-50
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fieldBy = fields;
    }
    const product = await getAllProducts(filters, queries);

    res.json({ data: product });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;

    // without run validator database takes null value
    const result = await Product.updateOne(
      { _id: id },
      { $inc: req.body },
      { runValidators: true }
    );

    res.status(200).json({
      status: 200,
      data: result,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await stockServiceDelete({ id });
    res.status(200).json({
      status: 200,
      data: result,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getStockServiceById(id);
    if (!result) {
      return res
        .status(400)
        .json({ status: "fail", message: "Can't get any stock!" });
    }
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
