import { config } from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

const server = async () => {
  try {
    await mongoose.connect(config.database_url!);
    console.log("Database connected successfully");
    app.listen(config.port, () => {
      console.log(`Server is running on port:${config.port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

server();
