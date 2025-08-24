import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY, {
      expiresIn: "10d",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { login };
