const express = require("express");
const router = express.Router();
const { contactsController } = require("../controller/contact");
// middleware that is specific to this router
// define the home page route
router.get("/", contactsController);
router.post("/", contactsController);
router.delete("/", contactsController);
router.put("/", contactsController);
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });
module.exports = router;
