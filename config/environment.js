var Habitat = require("habitat");
Habitat.load('.env');
var env = new Habitat("GOALIE");
module.exports = env;