"use strict";

var express = require("express");
var router = express.Router();

router.use("/", require("./routes/index"));
router.use("/roles", require("./routes/user_roles"));
router.use("/user", require("./routes/user"));

module.exports = router;
