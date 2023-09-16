const express = require("express");
const router = express.Router();
const {
  fetchHistoryTypes,
  getHistoryTypes,
  createHistoryTypes,
  putHistoryTypes,
  delHistoryTypes,
} = require("../../controller/crm/historyTypes");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getHistoryTypes);
router.post("/", createHistoryTypes);
router.post("/all", fetchHistoryTypes);
router.delete("/:id", delHistoryTypes);
router.put("/", putHistoryTypes);

module.exports = router;
