import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashpass,
    });

    // Fix: use _id for JWT payload key
    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET
    );

    const { password: pwd, ...userData } = newUser._doc;
    res.status(201).json({ message: "Registered successfully", user: userData, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found Register Now" });
    }

    const verified = await bcrypt.compare(password, userExist.password);
    if (!verified) {
      return res.status(401).json({ message: "Password does not match" });
    }

    // Fix: use _id for JWT payload key
    const token = jwt.sign(
      { _id: userExist._id, name: userExist.name },
      process.env.JWT_SECRET
    );

    const { password: pwd, ...userData } = userExist._doc;
    res.status(200).json({ message: "Logged in successfully", user: userData, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
