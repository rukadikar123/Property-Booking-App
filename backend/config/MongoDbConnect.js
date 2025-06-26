import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
export const MongodbConnect = async () => {
  try {
    // Attempt to establish a connection using the MongoDB URI from environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}`).then(() => {
      console.log("MongoDb connected");
    });
  } catch (error) {
    console.log("mongoDb connect error", error);
  }
};
