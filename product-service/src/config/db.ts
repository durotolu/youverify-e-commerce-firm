import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI ||
    process.env.MONGO_URI_PRODUCT_DOCKER ||
    "mongodb://mongo:27017/productdb";

  try {
    await mongoose.connect(mongoURI);
    console.log("Product DB Connected");
  } catch (error) {
    console.error("Product DB Connection Error:", error);
    throw error;
  }
  console.log("Product DB Connected");
};
