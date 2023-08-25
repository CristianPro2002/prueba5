const express = require("express");
const {
  getMenus,
  getMenuById,
  getMenusByPlaces,
  postMenu,
  deleteMenu,
  updateMenu,
} = require("../../controllers/menu.controller.js");
const router = express.Router();

router.get("/", getMenus);

router.get("/:id", getMenuById);

router.get("/places", getMenusByPlaces);

router.post("/", postMenu);

router.delete("/:id", deleteMenu);

router.put("/:id", updateMenu);

module.exports = router;
