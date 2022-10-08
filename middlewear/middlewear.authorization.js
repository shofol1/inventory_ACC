module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      res.status(401).json({ status: "fail", message: "Unauthorized user!" });
    }

    next();
  };
};
