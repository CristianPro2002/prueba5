require("dotenv").config();
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname,`${process.env.NODE_ENV}.env`) || "production.env",
});

const config = {
  appConfig: {
    node_env: process.env.APP_NODE_ENV || "development",
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || 3000,
  },
  dbConfig: {
    url: process.env.DB_MONGO_URI || "mongodb://localhost:27017/appMenu",
  },
};

module.exports = config;
