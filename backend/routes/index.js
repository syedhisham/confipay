const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const treasuryController = require("../controllers/treasuryController");

const router = express.Router();

router.get(
  "/api/treasury/transactions",
  requireAuth,
  treasuryController.getTransactions
);

module.exports = router;
