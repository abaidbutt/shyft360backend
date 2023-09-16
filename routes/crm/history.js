const express = require("express");
const router = express.Router();
const {
  fetchHistory,
  getHistory,
  createHistory,
  putHistory,
  delHistory,
} = require("../../controller/crm/history");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getHistory);
router.post("/", createHistory);
router.post("/all", fetchHistory);
router.delete("/:id", delHistory);
router.put("/", putHistory);

module.exports = router;
