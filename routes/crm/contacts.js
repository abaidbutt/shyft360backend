const express = require("express");
const router = express.Router();
const {
  fetchContacts,
  getContacts,
  createContacts,
  putContacts,
  delContacts,
} = require("../../controller/crm/contacts");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getContacts);
router.post("/", createContacts);
router.post("/all", fetchContacts);
router.delete("/:id", delContacts);
router.put("/", putContacts);

module.exports = router;
