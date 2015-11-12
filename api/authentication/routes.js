// ROOT/api/authentication

var express = require("express");
var router = express.Router();

var POST = require("./handlers/post");

router.post("/", POST);

module.exports = router;