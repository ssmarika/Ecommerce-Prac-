import mongoose from "mongoose";

const dbUserName = "smarikashrestha02";
const dbPassword = encodeURIComponent("smarika123");
const dbHost = "cluster0.yv6arsk.mongodb.net";
const dbName = "ecommerce-prac";
const dbOptions = "retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`
    );
    console.log("DB connection established");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

export default connectDB;
