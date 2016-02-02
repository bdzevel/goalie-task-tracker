// ROOT/api/authentication
"use strict";

let express = require("express");
let router = express.Router();

let GET = require("./handlers/get");
let POST = require("./handlers/post");
let DELETE = require("./handlers/delete");
let ValidateUserSession = require("./validate-user-session");

router.post("/", POST);
router.get("/", ValidateUserSession, GET);
router.delete("/", ValidateUserSession, DELETE);

module.exports = router;