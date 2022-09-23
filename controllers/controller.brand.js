const {
  createBrandService,
  getAllBrandService,
  getBrandServiceById,
  updateBrandServiceById,
} = require("../services/service.brand");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      success: 200,
      data: result,
      message: "Data inserted successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllBrand = async (req, res, next) => {
  try {
    const result = await getAllBrandService();
    res.status(200).json({
      success: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getBrandServiceById(id);
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
exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandServiceById(id, req.body);
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
