const {
  signupUserService,
  findUserByEmailService,
} = require("../services/service.user");
const { sendMailWithMailGun } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signupUser = async (req, res, next) => {
  try {
    const result = await signupUserService(req.body);
    const mailData = {
      to: [result.email],
      subject: "verify your account",
      text: "Thank you for your registration",
    };
    sendMailWithMailGun(mailData);
    res
      .status(200)
      .json({ status: "success", message: "user sign up successfully" });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
};
/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", message: "Please provide users credentials" });
    }
    const user = await findUserByEmailService(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "User not found!" });
    }

    const isValidPassword = await user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "fail", message: "password not matched" });
    }
    if (user.status != "active") {
      return res
        .status(401)
        .json({ status: "fail", message: "user not active yet!" });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({ status: "success", data: { token, user: others } });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
};

exports.getME = async (req, res, next) => {
  try {
    const result = await findUserByEmailService(req.user?.email);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(403).json({ status: "fail", message: error.message });
  }
};
