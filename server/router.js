const { Router } = require("express");
const router = Router();
const controllers = require("./controllers/controllers.js");

router.post("/users/signup", controllers.register);
router.post("/users/login", controllers.login);
//router.post("/users/logout", controllers.logout);

router.get("/pins", controllers.getPins);
router.post("/pins", controllers.postPin);

router.patch("/pins/:id", controllers.editPin);

router.delete("/pins/:id", controllers.deletePin);
router.delete("/pins", controllers.deleteAllPins);



module.exports = { router };
