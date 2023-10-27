const express = require("express");
const { subcategoryController } = require("../../controllers");
const router = express.Router();

router.get("/products/:id", subcategoryController.getProductsBySubcategory);

module.exports = router;
