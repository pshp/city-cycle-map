const { Router } = require("express");
const router = Router();
const controllers = require("./controllers/controllers.js");

router.post("/users", controllers.register);
router.post("/login", controllers.login);

router.get("/pins", controllers.getPins);
router.post("/pins", controllers.postPin);

router.patch("/pins/:id", controllers.editPin);

router.delete("/pins/:id", controllers.deletePin);
router.delete("/pins", controllers.deleteAllPins);



module.exports = { router };
