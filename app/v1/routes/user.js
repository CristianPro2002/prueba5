const express = require("express");
const { userController } = require("../../controllers");
const router = express.Router();

router.post("/login", userController.login);

router.post("/login-google", userController.loginGoogle);

router.post("/logout", userController.logout);

router.post("/refresh-token", userController.refreshToken);

router.post("/validate-token", userController.validateToken);

router.post("/validate-refresh-token", userController.validateRefreshToken);

router.post("/send-email", userController.sendEmailCode);

router.post("/reset-password", userController.resetPassword);

router.get("/", userController.getUser);

router.get("/:id", userController.getUserById);

router.post("/", userController.postUser);

module.exports = router;
