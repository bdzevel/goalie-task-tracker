// ROOT/config
"use strict";

let Habitat = require("habitat");
Habitat.load('.env');
let env = new Habitat("GOALIE");
module.exports = env;