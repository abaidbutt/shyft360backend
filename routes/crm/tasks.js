const express = require("express");
const router = express.Router();
const {
  fetchTasks,
  getTasks,
  createTasks,
  putTasks,
  delTasks,
} = require("../../controller/crm/tasks");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getTasks);
router.post("/", createTasks);
router.post("/all", fetchTasks);
router.delete("/:id", delTasks);
router.put("/", putTasks);

module.exports = router;
