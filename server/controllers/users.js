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

const register = async (req, res) => {
  try {
    // Check is username or email exists
    const userExists = await User.findOne({
      username: req.body.username,
    }).exec();
    if (userExists) res.status(400).send({ error: 'username is taken' });

    // generate hashed pw
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const body = {
      username: req.body.username,
      password: hashedPassword,
    };
    const user = await User.create(body);

    res.status(200).send({ data: user._id });
  } catch (e) {
    res.status(500).send({ error: e._message });
  }
};

module.exports = { login, register };
