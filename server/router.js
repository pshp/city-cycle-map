const { Router } = require("express");
const router = Router();
const controllers = require("./controllers/controllers.js");

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.get("/pins", controllers.getPins);
router.post("/pins", controllers.postPin);

router.delete("/pins/:id", controllers.deletePin);
router.delete("/pins", controllers.deleteAllPins);

module.exports = { router };
