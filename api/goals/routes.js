// ROOT/api/goals
"use strict";

let express = require("express");
let router = express.Router();

let ValidateUserSession = require("../authentication/validate-user-session");
let GET = require("./handlers/get");
let POST = require("./handlers/post");
let PUT = require("./handlers/put");
let DELETE = require("./handlers/delete");

router.get("/", ValidateUserSession, GET);
router.post("/", ValidateUserSession, POST);
router.put("/:id", ValidateUserSession, PUT);
router.delete("/:id", ValidateUserSession, DELETE);

module.exports = router;