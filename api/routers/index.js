const express = require("express");
const auth = require("./auth");
const query = require("./query");
const router = express.Router();

router.use("/auth", auth)
router.use("/query", query)

module.exports = router;