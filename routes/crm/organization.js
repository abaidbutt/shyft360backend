const express = require("express");
const router = express.Router();
const {
  fetchOrganization,
  getOrganization,
  createOrganization,
  putOrganization,
  delOrganization,
} = require("../../controller/crm/organization");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getOrganization);
router.post("/", createOrganization);
router.post("/all", fetchOrganization);
router.delete("/:id", delOrganization);
router.put("/", putOrganization);

module.exports = router;
