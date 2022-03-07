const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    // Check is username or email exists
    const userExists = await User.findOne({
      username: req.body.username,
    }).exec();
    const emailExists = await User.findOne({ email: req.body.email }).exec();
    if (userExists) res.status(400).send({ error: 'username is taken' });
    if (emailExists) res.status(400).json({ error: 'email is taken' });

    // generate hashed pw
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const body = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };
    const user = await User.create(body);

    res.status(200).send({ data: user._id });
  } catch (e) {
    res.status(500).send({ error: e._message });
  }
};

module.exports = register;
