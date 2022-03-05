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
    const body = {
      username: req.body.username,
      title: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description : req.body.description,
      rating : req.body.rating,
    };
    const response = await Pin.create(body);
    res.status(201).send(response);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deletePin = async (req, res) => {
  try {
    // delete single pin using _id
    const result = await Pin.deleteOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const deleteAllPins = async (req, res) => {
  try {
    // delete all pins
    const result = await Pin.deleteMany({});
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { getPins, postPin, deletePin, deleteAllPins };
