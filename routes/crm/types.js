const express = require("express");
const router = express.Router();
const {
  fetchTypes,
  getTypes,
  createTypes,
  putTypes,
  delTypes,
} = require("../../controller/crm/types");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getTypes);
router.post("/", createTypes);
router.post("/all", fetchTypes);
router.delete("/:id", delTypes);
router.put("/", putTypes);

module.exports = router;
