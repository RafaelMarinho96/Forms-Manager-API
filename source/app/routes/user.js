const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/createUser', userController.createUser);
router.post('/authUser', userController.authUser);

module.exports = app => app.use('/user', router);