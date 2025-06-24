import mongoose from "mongoose";
import { app } from "./app";
import config from "./config/db";

const server = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log("Database connected successfully");

    app.listen(config.port, () => {
      console.log(`Server is running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

server();
