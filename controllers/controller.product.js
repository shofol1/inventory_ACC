const { Product } = require("../models/model.product");

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
