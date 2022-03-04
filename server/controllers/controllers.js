const register = require("./register.js");
const login = require("./login.js");
const { getPins, postPin } = require("./pins.js");

module.exports = { register, login, getPins, postPin };
