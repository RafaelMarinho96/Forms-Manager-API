const express = require('express');

const groupController = require('../controllers/group');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', groupController.create);

module.exports = app => app.use('/group', router);