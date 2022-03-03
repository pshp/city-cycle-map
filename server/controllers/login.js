const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    // validate user
    const validUser = await User.findOne({ username: req.body.username });
    !validUser && res.status(400).send("Wrong Username or password");

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    !validPassword && res.status(400).send("Wrong username or Password");

    res.status(200).send(validUser._id);

  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = login;
