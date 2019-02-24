'use strict'
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

module.exports = {
    createUser
}