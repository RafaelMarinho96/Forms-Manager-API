const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../../config/auth');
const tokenService = require('../services/tokenService');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/createUser', userController.createUser);

router.post('/authUser', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Hey! Não identificamos o seu email (Ref 00x305)' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(403).send({ error: 'Ops! Sua senha esta incorreta (Ref 00x306)' })
    
    user.password = undefined;
    res.send(
        { 
            user,
            token: tokenService.generateToken({ id: user.id })
        }
    )
})

module.exports = app => app.use('/user', router);