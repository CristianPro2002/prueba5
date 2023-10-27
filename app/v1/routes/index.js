const express = require("express");
const router = express.Router();
const fs = require("fs");
const createError = require("http-errors");

const pathRouter = `${__dirname}/`;

const removeExtension = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExtension = removeExtension(file);
  const skip = ["index"].includes(fileWithOutExtension);
  if (!skip) {
    router.use(
      `/${fileWithOutExtension}`,
      require(`./${fileWithOutExtension}`)
    );
  }
});

router.get("*", (req, res, next) => {
  const err = Error(`Requested URL ${req.path} not found`);
  next(createError(404, err.message));
});

module.exports = router;
