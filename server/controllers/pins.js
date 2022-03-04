const Pin = require("../models/Pin");

const getPins = async (req, res) => {
  try {
    // get all pins
    const pins = await Pin.find();
    res.status(200).send(pins);
  } catch (e) {
    res.status(500).send(e);
  }
};

const postPin = async (req, res) => {
  try {
    // post single pin
    const response = await Pin.createOne(req.body);
    res.status(201).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { getPins, postPin };
