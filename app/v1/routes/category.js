const express = require("express");
const { categoryController } = require("../../controllers");
const upload = require("../../middleware/uploadImg.js");
const router = express.Router();

router.get("/menu/:id", categoryController.getCategorysByMenu);

router.get("/products/:id", categoryController.getProductsByCategory);

module.exports = router;
