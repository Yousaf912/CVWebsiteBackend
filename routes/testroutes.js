const express = require("express");
const test = require("../Controllers/test");
const router = express.Router();

router.get('/home',test);

module.exports = router;