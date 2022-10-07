const User = require("../models/model.user");

exports.signupUserService = async (data) => {
  const result = await User.create(data);
  return result;
};
exports.findUserByEmailService = async (email) => {
  const result = await User.findOne({ email });
  return result;
};
