const express = require('express');

const answerController = require('../controllers/answer');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.get('/:formId/byFormId', answerController.findAnwersByFormId);
router.get('/:answerId', answerController.findAnswerById);

module.exports = app => app.use('/answer', router);