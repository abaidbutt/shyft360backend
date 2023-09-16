const express = require("express");
const router = express.Router();
const {
  fetchHistoryFlags,
  getHistoryFlags,
  createHistoryFlags,
  putHistoryFlags,
  delHistoryFlags,
} = require("../../controller/crm/historyFlags");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getHistoryFlags);
router.post("/", createHistoryFlags);
router.post("/all", fetchHistoryFlags);
router.delete("/:id", delHistoryFlags);
router.put("/", putHistoryFlags);

module.exports = router;
