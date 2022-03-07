const register = require('./register');
const login = require('./login');
const {
  getPins, postPin, editPin, deletePin, deleteAllPins,
} = require('./pins');

module.exports = {
  register, login, getPins, postPin, editPin, deletePin, deleteAllPins,
};
