const express = require("express");
const router = express.Router();
const {
  fetchTaskTemplate,
  getTaskTemplate,
  createTaskTemplate,
  putTaskTemplate,
  delTaskTemplate,
} = require("../../controller/crm/taskTemplate");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getTaskTemplate);
router.post("/", createTaskTemplate);
router.post("/all", fetchTaskTemplate);
router.delete("/:id", delTaskTemplate);
router.put("/", putTaskTemplate);

module.exports = router;
