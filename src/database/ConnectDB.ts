import mongoose from "mongoose";

export const ConnectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to DB");
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to DB");
  } catch (error) {
    console.log("DB connection error:", error);
  }
}
