const express = require("express");
const router = express.Router();
const {
  fetchAccount,
  getAccount,
  createAccount,
  putAccount,
  delAccount,
} = require("../../controller/account");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getAccount);
router.post("/", createAccount);
router.post("/all", fetchAccount);
router.delete("/:id", delAccount);
router.put("/", putAccount);

module.exports = router;
