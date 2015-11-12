// ROOT/api/goals

var express = require("express");
var router = express.Router();

var ValidateUserSession = require("../authentication/validate-user-session");
var GET = require("./handlers/get");
var POST = require("./handlers/post");
var PUT = require("./handlers/put");
var DELETE = require("./handlers/delete");

router.get("/", ValidateUserSession, GET);
router.post("/", ValidateUserSession, POST);
router.put("/:id", ValidateUserSession, PUT);
router.delete("/:id", ValidateUserSession, DELETE);

module.exports = router;