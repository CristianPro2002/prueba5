const express = require("express");
const { productController } = require("../../controllers");
const { validateToken } = require("../../middleware/authenticationToken.js");
const router = express.Router();
const upload = require("../../middleware/uploadImg.js");

router.get("/category/:id", productController.getProductsByCategory);

router.post("/places", validateToken, productController.getProductsByPlaces);

module.exports = router;
