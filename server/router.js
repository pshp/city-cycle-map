const { Router } = require("express");
const router = Router();
const controllers = require("./controllers/controllers.js");

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.get("/pins", controllers.getPins);
router.post("/pins", controllers.postPin);

module.exports = { router };
