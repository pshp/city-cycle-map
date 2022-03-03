const { Router } = require("express");
const router = Router();
const controllers = require("./controllers/controllers.js");

router.post("/register", controllers.register);
router.post("/login", controllers.login);

module.exports = { router };
