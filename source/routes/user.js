const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../config/auth')

const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já esta cadastrado. (Ref 00x303)'})

        const newUser = await User.create(req.body);

        newUser.password = undefined;

        return res.send({ newUser })
    } catch (err) {
        return res.status(400).send({ error: 'Ops! Algo inesperado ocorreu ao tentar criar o novo usuário. (Ref 00x302)' + err })
    }
});


router.post('/authUser', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Hey! Não identificamos o seu email (Ref 00x305)' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(403).send({ error: 'Ops! Sua senha esta incorreta (Ref 00x306)' })
    
    user.password = undefined;
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
    })
    res.send({ user, token })
})

module.exports = app => app.use('/user', router);