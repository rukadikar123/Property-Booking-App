import jwt from "jsonwebtoken";
import User from "../Model/User.schema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve JWT token from cookies
    const token = req?.cookies?.jwt;
    // If token is missing, user is not authenticated
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Verify the token using the JWT secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // If verification fails, return unauthorized
    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized-Invalid token",
      });
    }

    // Fetch user from database using decoded token's ID
    const user = await User.findById(decodedToken.id).select("-password");

    // Attach user to request object for downstream access
    req.user = user;

    next(); // Proceed to next middleware or controller
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `isAuthenticated: ${error.message}`,
    });
  }
};
