const express = require("express");
const router = express.Router();
const {
  fetchSource,
  getSource,
  createSource,
  putSource,
  delSource,
} = require("../../controller/crm/source");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getSource);
router.post("/", createSource);
router.post("/all", fetchSource);
router.delete("/:id", delSource);
router.put("/", putSource);

module.exports = router;
