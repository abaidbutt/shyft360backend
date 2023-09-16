const express = require("express");
const router = express.Router();
const {
  fetchRole,
  getRole,
  createRole,
  putRole,
  delRole,
} = require("../../controller/account/role");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getRole);
router.post("/", createRole);
router.post("/all", fetchRole);
router.delete("/:id", delRole);
router.put("/", putRole);

module.exports = router;
