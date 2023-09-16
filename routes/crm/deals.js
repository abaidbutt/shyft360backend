const express = require("express");
const router = express.Router();
const {
  fetchDeals,
  getDeals,
  createDeals,
  putDeals,
  delDeals,
} = require("../../controller/crm/deals");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getDeals);
router.post("/", createDeals);
router.post("/all", fetchDeals);
router.delete("/:id", delDeals);
router.put("/", putDeals);

module.exports = router;
