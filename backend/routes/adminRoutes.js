const express = require("express");
const {
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;