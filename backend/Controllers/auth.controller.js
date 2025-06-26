import { generateToken } from "../config/generateToken.js";
import User from "../Model/User.schema.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // Validate input
    if ([fullname, email, password].some((item) => item === "")) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist please login",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Set token in HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
    });

    // Hide password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      user,
      message: "user Created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Signup: ${error.message}`,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if ([email, password].some((item) => item === "")) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email not exist",
      });
    }

    // Compare password
    let comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);
    // Set JWT cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(200).json({
      success: true,
      user,
      message: "User Logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login: ${error.message}`,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    // Clear the 'jwt' cookie from the user's browser
    res.clearCookie("jwt", {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      sameSite: "None", // Allows cross-site cookie usage
      secure: true, // Ensures cookie is only sent over HTTPS
    });

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Logout: ${error.message}`,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // Destructure the user object added by authentication middleware
    const { user } = req;

    // If no user found in request (edge case), return error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    // Return the user object
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // Catch and handle any server-side errors
    return res.status(500).json({
      success: false,
      message: `getCurrentUser: ${error.message}`,
    });
  }
};

export const becomeHost = async (req, res) => {
  try {
    const { isHost } = req.body;

    // Validate that the request contains the `isHost` field
    if (!isHost) {
      return res.status(400).json({
        success: false,
        message: "No field to update",
      });
    }

    // Update the current user's `isHost` status
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        isHost,
      },
      { new: true } // Return the updated user object
    ).select("-password"); // Exclude the password field from response

    // Respond with updated user info
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `becomeHost: ${error.message}`,
    });
  }
};
