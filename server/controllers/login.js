const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log("login - server")

  try {
    // validate user
    const validUser = await User.findOne({ username: req.body.username });
    if (!validUser) {
      res.status(400).send({error:"Wrong Username or password"});
      return;
    }

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      validUser.password
    );
    if (!validPassword) {
      res.status(400).send({error:"Wrong username or Password"});
      return;
    }

    res.status(200).send({data: validUser._id});
  } catch (e) {
    res.status(500).send({error: e._message});
  }
};

module.exports = login;
