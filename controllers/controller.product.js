const { Product } = require("../models/model.product");
const {
  bulkDeleteServiceProduct,
  productServiceDelete,
  bulkProductService,
} = require("../services/service");

exports.welcome = (req, res) => {
  res.send("Route is working! YaY!");
};

exports.insertProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);

    //goto middleware
    // if (product.quantity == 0) {
    //   product.status = "out-of-stock";
    // }
    const result = await product.save();
    result.logger();
    res.json({
      message: "data inserted successfully",
      status: 200,
      data: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "data not inserted",
      error: error.message,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    // const product = await Product.find({
    //   $or: [{ name: "iphone" }, { quantity: 100 }],
    // });
    // const product = await Product.find({
    //   status: { $ne: "out-of-stock" },
    // });
    // const product = await Product.find({
    //   quantity: { $lt: 500 },
    // });
    // const product = await Product.find({
    //   quantity: { $gte: 500 },
    // });
    // const product = await Product.find({}, "-name -price");
    // const product = await Product.find({}, "-name -price").limit(2);
    // const product = await Product.find({}, "-name -price").sort({
    //   quantity: -1,
    // });
    // const product = await Product.find({}).select({name: 1 });
    // const product = await Product.find({}).select({ _id: 0 });

    //using query builder
    const product = await await Product.where("name")
      .equals("iphone")
      .where("price")
      .gt(100)
      .limit(1);

    res.json({ data: product });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // without run validator database takes null value
    const result = await Product.updateOne(
      { _id: id },
      { $inc: req.body },
      { runValidators: true }
    );
    // const product = await Product.findById(id);
    // const result = await product.set(req.body).save();
    res.status(200).json({
      status: 200,
      data: result,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.bulkProductUpdate = async (req, res, next) => {
  try {
    const result = await bulkProductService(req.body);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productServiceDelete(id);
    res.status(200).json({
      status: 200,
      data: result,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.bulkDeleteById = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const result = await bulkDeleteServiceProduct(ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        message: "data not found",
      });
    }

    res
      .status(200)
      .json({ message: "products deleted successfully", data: result });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
