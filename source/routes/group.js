const express = require('express');

const groupController = require('../controllers/group');

const router = express.Router();

router.post('/createGroup', groupController.createGroup);

module.exports = app => app.use('/group', router);