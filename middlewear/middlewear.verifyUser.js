//check if token exits
//if not token send res
//decode token
//if valid go next

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      res.json(401).json({ status: fail, message: "User not login!" });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ status: "fail", message: error.message });
  }
};
