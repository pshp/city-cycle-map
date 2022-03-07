const { Router } = require('express');

const router = Router();
const pinControllers = require('./controllers/pins');
const userControllers = require('./controllers/users');

router.post('/users/signup', userControllers.register);
router.post('/users/login', userControllers.login);
// router.post("/users/logout", controllers.logout);

router.get('/pins', pinControllers.getPins);
router.post('/pins', pinControllers.postPin);

router.patch('/pins/:id', pinControllers.editPin);

router.delete('/pins/:id', pinControllers.deletePin);
router.delete('/pins', pinControllers.deleteAllPins);

module.exports = { router };
