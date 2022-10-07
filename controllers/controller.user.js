const { signupUserService } = require("../services/service.user");

exports.signupUser = async (req, res, next) => {
  try {
    const result = await signupUserService(req.body);
    res
      .status(200)
      .json({ status: "success", message: "user sign up successfully" });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
};
