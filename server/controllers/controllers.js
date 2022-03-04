const register = require("./register.js");
const login = require("./login.js");
const { getPins, postPin, deletePin, deleteAllPins } = require("./pins.js");

module.exports = { register, login, getPins, postPin, deletePin, deleteAllPins };
