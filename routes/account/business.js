const express = require("express");
const router = express.Router();
const {
  fetchBusiness,
  getBusiness,
  createBusiness,
  putBusiness,
  delBusiness,
} = require("../../controller/account/business");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getBusiness);
router.post("/", createBusiness);
router.post("/all", fetchBusiness);
router.delete("/:id", delBusiness);
router.put("/", putBusiness);

module.exports = router;
