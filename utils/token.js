const { json } = require("express");
const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
  };
  const result = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: "20s",
  });
  return result;
};
