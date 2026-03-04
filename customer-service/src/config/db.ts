import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://mongo:27017/customerdb`);
    console.log("Customer DB Connected");
  } catch (error) {
    console.error("Customer DB Connection Error:", error);
    process.exit(1);
  }
  console.log("Customer DB Connected");
};
