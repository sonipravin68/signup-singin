const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, phone, email, password, state, district } = req.body;

    let existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({ message: "user is already registed" });
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const createUser = new User({
      name,
      phone,
      email,
      password: hasPassword,
      state,
      district,
    });

    await createUser.save();

    res.status(200).json({ message: "signUp successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = { register };
