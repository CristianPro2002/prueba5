const express = require("express");
const {
    login,
    loginGoogle,
    logout,
    refreshToken,
    validateToken,
    validateRefreshToken,
    sendEmailCode,
    resetPassword,
    getUser,
    getUserById,
    postUser,
    deleteUser,
    updateUser,
} = require("../../controllers/user.controller.js");
const router = express.Router();

router.post("/login", login);

router.post("/login-google", loginGoogle);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.post("/validate-token", validateToken);

router.post("/validate-refresh-token", validateRefreshToken)

router.post("/send-email", sendEmailCode);

router.post("/reset-password", resetPassword);

router.get("/", getUser);

router.get("/:id", getUserById);

router.post("/", postUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

module.exports = router;
