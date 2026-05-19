import User from "../models/User";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (
  req: any,
  res: any
) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER
    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role,
      });

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET ||
        "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// LOGIN USER
export const loginUser = async (
  req: any,
  res: any
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // CHECK USER
    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        message:
          "User not found",
      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials",
      });

    }

    // TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET ||
        "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};