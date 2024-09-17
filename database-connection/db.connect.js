import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(``);
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

export default connectDB;
