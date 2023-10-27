const express = require("express");
const { accountController } = require("../../controllers");
const { validateToken } = require("../../middleware/authenticationToken.js");
const router = express.Router();

router.get("/", validateToken, accountController.getAccounts);

router.get("/:id", validateToken, accountController.getAccountById);

router.post("/", accountController.postAccount);

router.delete("/:id", validateToken, accountController.deleteAccount);

router.put("/:id", validateToken, accountController.updateAccount);

module.exports = router;
