const express = require("express");
const router = express.Router();
const {
  fetchLists,
  getLists,
  createLists,
  putLists,
  delLists,
} = require("../../controller/crm/lists");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getLists);
router.post("/", createLists);
router.post("/all", fetchLists);
router.delete("/:id", delLists);
router.put("/", putLists);

module.exports = router;
