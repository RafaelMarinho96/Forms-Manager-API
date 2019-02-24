'use strict'
const bcrypt = require('bcryptjs');

const userModel = require('../models/user');
const tokenService = require('../services/tokenService');

async function createUser(req, res){
    const { email } = req.body;

    try {
        if(await userModel.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já esta cadastrado. (Ref 00x303)'})

        const user = await userModel.create(req.body);

        user.password = undefined;

        return res.send(
            { 
                user,
                token: tokenService.generateToken({ id: user.id })
            }
        )
    } catch (err) {
        return res.status(400).send({ error: 'Ops! Algo inesperado ocorreu ao tentar criar o novo usuário. (Ref 00x302)' + err })
    }
}

async function authUser(req, res){
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

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
}

module.exports = {
    createUser,
    authUser
}