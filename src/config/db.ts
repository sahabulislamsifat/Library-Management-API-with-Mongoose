import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 9000,
  database_url: process.env.DATABASE_URL as string,
};
