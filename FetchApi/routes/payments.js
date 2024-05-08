const express = require("express");
const { initiate } = require("../controllers/paymets");
const router = express.Router();

router.post("/initiate", initiate);

module.exports = router;
