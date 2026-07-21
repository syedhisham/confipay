require("dotenv").config();

const config = {
  port: Number(process.env.PORT) || 4000,
  // Comma-separated list of origins allowed to call the API.
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  // Static bearer token used by the demo auth middleware.
  apiToken: process.env.API_TOKEN || "confipay-demo-token",
};

module.exports = config;
