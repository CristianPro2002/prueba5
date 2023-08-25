const express = require("express");
const {
  getAccount,
  getAccountById,
  postAccount,
  deleteAccount,
  updateAccount,
} = require("../../controllers/account.controller.js");
const router = express.Router();

router.get("/", getAccount);

router.get("/:id", getAccountById);

router.post("/", postAccount);

router.delete("/:id", deleteAccount);

router.put("/:id", updateAccount);

module.exports = router;
