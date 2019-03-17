const express = require('express');

const formController = require('../controllers/form');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', formController.create);
router.get('/', formController.find);
router.get('/:formId', formController.findById);
router.get('/:urlpath/urlPath', formController.findFormByName);
router.delete('/:formId', formController.deleteById);
router.put('/:formId', formController.updateById);
router.put('/push/:formId', formController.pushFormById)

module.exports = app => app.use('/form', router);