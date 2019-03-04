const express = require('express');

const formController = require('../controllers/form');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

router.post('/createForm', formController.createForm);

module.exports = app => app.use('/form', router);