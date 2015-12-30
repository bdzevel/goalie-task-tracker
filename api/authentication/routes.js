// ROOT/api/authentication

var express = require("express");
var router = express.Router();

var GET = require("./handlers/get");
var POST = require("./handlers/post");
var DELETE = require("./handlers/delete");
var ValidateUserSession = require("./validate-user-session");

router.post("/", POST);
router.get("/", ValidateUserSession, GET);
router.delete("/", ValidateUserSession, DELETE);

module.exports = router;