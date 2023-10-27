const express = require("express");
const { validateToken } = require("../../middleware/authenticationToken.js");
const { placeController } = require("../../controllers");
const router = express.Router();
const upload = require("../../middleware/uploadImg.js");

router.get("/user/:id", validateToken, placeController.getPlacesByUser);

router.get("/:id", placeController.getPlace);

router.get("/about-us/:id", placeController.getPlaceAboutUs);

router.get("/contact-us/:id", placeController.getPlaceContactUs);

router.get("/customs/:id", placeController.getPlaceCustoms);

router.post("/home", validateToken, placeController.postPlaceStepHome);

router.put(
  "/about-us/:id",
  validateToken,
  placeController.postPlaceStepAboutUs
);

router.put(
  "/contact-us/:id",
  validateToken,
  placeController.postPlaceStepContactUs
);

router.put("/customs/:id", validateToken, placeController.postPlaceStepCustoms);

router.put(
  "/home/edit/:id",
  validateToken,
  placeController.updatePlaceStepHome
);

router.put(
  "/about-us/edit/:id",
  validateToken,
  placeController.updatePlaceStepAboutUs
);

router.put(
  "/contact-us/edit/:id",
  validateToken,
  placeController.updatePlaceStepContactUs
);

router.put(
  "/customs/edit/:id",
  validateToken,
  placeController.updatePlaceStepCustoms
);

router.put("/theme/:id", validateToken, placeController.updateTheme);

router.delete("/:id", validateToken, placeController.deletePlace);

router.put("/default-lang/:id", placeController.updateDefaultLang);

module.exports = router;
