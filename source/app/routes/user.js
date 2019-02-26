const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/createUser', userController.createUser);
router.post('/authUser', userController.authUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);

router.get('/isAvailable/:email', userController.isAvailable);

module.exports = app => app.use('/user', router);