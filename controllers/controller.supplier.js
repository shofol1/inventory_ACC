const {
  createSupplierService,
  getAllSupplierService,
  getSupplierServiceById,
  updateSupplierServiceById,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      success: 200,
      data: result,
      message: "Data inserted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllSupplier = async (req, res, next) => {
  try {
    const result = await getAllSupplierService();
    res.status(200).json({
      success: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSupplierServiceById(id);
    if (!result) {
      res
        .status(400)
        .json({ error: "couldn't find brand with this id.", status: "fail" });
    }
    res.status(200).json({
      success: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierServiceById(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        error: "couldn't update the brand with this id.",
        status: "fail",
      });
    }
    res.status(200).json({
      success: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
