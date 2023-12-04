const express = require("express");
const { productController } = require("../../controllers");
const { validateToken } = require("../../middleware/authenticationToken.js");
const router = express.Router();
const upload = require("../../middleware/uploadImg.js");

router.get("/category/:id", productController.getProductsByCategory);

router.post("/places", validateToken, productController.getProductsByPlaces);

router.get("/:id", productController.getProduct);

router.post("/", validateToken, productController.postProduct);

router.put("/:id", validateToken, productController.putProduct);

router.delete("/:id", validateToken, productController.deleteProduct);

module.exports = router;
