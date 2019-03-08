const express = require('express');

const groupController = require('../controllers/group');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', groupController.create);
router.get('/', groupController.find);
router.put('/:groupId', groupController.update);
router.put('/push/:groupId', groupController.pushGroupFormById);

module.exports = app => app.use('/group', router);