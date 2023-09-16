const express = require("express");
const router = express.Router();
const {
  fetchDealStatus,
  getDealStatus,
  createDealStatus,
  putDealStatus,
  delDealStatus,
} = require("../../controller/crm/dealStatus");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getDealStatus);
router.post("/", createDealStatus);
router.post("/all", fetchDealStatus);
router.delete("/:id", delDealStatus);
router.put("/", putDealStatus);

module.exports = router;
