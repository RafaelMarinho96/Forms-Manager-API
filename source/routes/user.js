const express = require('express');

const user = require('../models/user');

const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { email } = req.body;

    try {
        if(await user.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já esta cadastrado. (Ref 00x303)'})

        const newUser = await user.create(req.body);

        newUser.password = undefined;

        return res.send({ newUser })
    } catch (err) {
        return res.status(400).send({ error: 'Ops! Algo inesperado ocorreu ao tentar criar o novo usuário. (Ref 00x302)' + err })
    }
});

module.exports = app => app.use('/user', router);