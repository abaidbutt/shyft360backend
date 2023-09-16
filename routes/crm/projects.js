const express = require("express");
const router = express.Router();
const {
  fetchProjects,
  getProjects,
  createProjects,
  putProjects,
  delProjects,
} = require("../../controller/crm/projects");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getProjects);
router.post("/", createProjects);
router.post("/all", fetchProjects);
router.delete("/:id", delProjects);
router.put("/", putProjects);

module.exports = router;
