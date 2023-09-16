const express = require("express");
const router = express.Router();
const {
  fetchProjectStatus,
  getProjectStatus,
  createProjectStatus,
  putProjectStatus,
  delProjectStatus,
} = require("../../controller/crm/projectStatus");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getProjectStatus);
router.post("/", createProjectStatus);
router.post("/all", fetchProjectStatus);
router.delete("/:id", delProjectStatus);
router.put("/", putProjectStatus);

module.exports = router;
