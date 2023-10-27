const express = require("express");
const { menuController } = require("../../controllers");
const router = express.Router();

router.get("/:id", menuController.getMenuById);

router.get("/places", menuController.getMenusByPlaces);

module.exports = router;
