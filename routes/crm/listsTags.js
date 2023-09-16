const express = require("express");
const router = express.Router();
const {
  fetchListsTags,
  getListsTags,
  createListsTags,
  putListsTags,
  delListsTags,
} = require("../../controller/crm/listsTags");
// middleware that is specific to this router
// define the home page route
router.get("/:id", getListsTags);
router.post("/", createListsTags);
router.post("/all", fetchListsTags);
router.delete("/:id", delListsTags);
router.put("/", putListsTags);

module.exports = router;
