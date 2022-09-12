const { Product } = require("../models/model.product");

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
