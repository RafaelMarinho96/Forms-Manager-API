const express = require('express');

const user = require('../models/user');

const router = express.Router();

router.post('/createUser', async (req, res) => {
    try {
        const newUser = await user.create(req.body);

        return res.send({ newUser })
    } catch (err) {
        return res.status(400).send({ error: 'Ops! Algo inesperado ocorreu ao tentar criar o novo usuário. (Ref 00x302)' })
    }
});

module.exports = app => app.use('/user', router);