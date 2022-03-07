const bcrypt = require('bcrypt');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    // validate user
    const validUser = await User.findOne({ username: req.body.username });
    if (!validUser) res.status(400).send({ error: 'Wrong Username or password' });

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password,
    );
    if (!validPassword) res.status(400).send({ error: 'Wrong username or Password' });

    res.status(200).send({ data: validUser._id }); // eslint-disable-line
  } catch (e) {
    res.status(500).send({ error: e._message }); // eslint-disable-line
  }
};

module.exports = login;
