const express = require('express');

const formController = require('../controllers/form');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/', formController.create);
router.get('/', formController.find);
router.get('/:formId', formController.findById);
router.get('/:urlpath/urlPath', formController.findFormByName);
router.get('/:urlpath/byUrlPath', formController.findFormByUrlPath);
router.delete('/:formId', formController.deleteById);
router.put('/:formId', formController.updateById);
router.put('/push/:formId', formController.pushFormById)
router.put('/answer/:formId', formController.pushFormAnswerById);
router.get('/answer/:formId/byFormId', formController.findAnswerByFormId);

module.exports = app => app.use('/form', router);