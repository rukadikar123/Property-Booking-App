import jwt from "jsonwebtoken";

// Function to generate a JWT token using a user ID
export const generateToken = (userId) => {
  try {
    //  Sign a new JWT token with the user's ID as payload
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });

    return token;              //  Return the generated token
  } catch (error) {
    console.log("generateToken error", error);
  }
};
