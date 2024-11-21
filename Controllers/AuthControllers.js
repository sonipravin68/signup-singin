const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {
  // res.status(200).json({message:"this is signin page"})

  try {
    const { email, password } = req.body;

    // Check if the username is an email or a mobile number
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log("isEmail", isEmail);

    const isMobile = /^\d{10}$/.test(email); // Assuming a 10-digit mobile number

    console.log("isMobile", isMobile);

    let existUser;

    if (isEmail) {
      existUser = await User.findOne({ email: email });
    } else if (isMobile) {
      existUser = await User.findOne({ phone: email });
    } else {
      return res.status(400).json({ message: "Invalid username format" });
    }

    // let existUser = await UserModel.findOne({ email });
    console.log("existUser", existUser);

    const errorMsg = "invalid cedentials";

    // This checks if the user is null (meaning no user with the provided email exists).
    // The ! operator negates the value, so if (!user) evaluates to true if user is null.

    if (!existUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isMatchpassword = await bcrypt.compare(password, existUser.password);
    console.log(isMatchpassword);

    if (!isMatchpassword) {
      res.status(403).json({ message: errorMsg, success: false });
    }

    // generate token

    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // console`.log("token",token);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 259200000,
    // });

    res.status(200).json({
      message: "login successfully",
      jwtToken: token,
      success: true,
      name: existUser.name,
    });
  } catch (err) {
    res.status(500).json(
      {
        message: " internal server error",
        success: false,
      },
      err
    );
  }
};

module.exports = { register, login };
