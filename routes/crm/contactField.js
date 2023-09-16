const express = require("express");
const router = express.Router();
const {
  fetchContactField,
  getContactField,
  createContactField,
  putContactField,
  delContactField,
} = require("../../controller/crm/contactField");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getContactField);
router.post("/", createContactField);
router.post("/all", fetchContactField);
router.delete("/:id", delContactField);
router.put("/", putContactField);

module.exports = router;
