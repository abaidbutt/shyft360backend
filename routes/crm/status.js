const express = require("express");
const router = express.Router();
const {
  fetchStatus,
  getStatus,
  createStatus,
  putStatus,
  delStatus,
} = require("../../controller/crm/status");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getStatus);
router.post("/", createStatus);
router.post("/all", fetchStatus);
router.delete("/:id", delStatus);
router.put("/", putStatus);

module.exports = router;
