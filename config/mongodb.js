const mongoose = require("mongoose");
const { dbConfig } = require("../config.js");

const connectDB = async () => {
  const MONGO_URI = dbConfig.url;

  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("DataBase is connected");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDB;
