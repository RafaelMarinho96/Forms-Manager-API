'use strict'
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userModel = require('../models/user');
const tokenService = require('../services/tokenService');
const mailer = require('../services/mailerService');

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

async function forgotPassword(req, res){

    const { email } = req.body;
    try {

        const user = await userModel.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'Hey! Não identificamos o seu email (Ref 00x305)' })
            
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await userModel.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })

        mailer.sendMail({
            to: email,
            from: 'rafael.marinho07@gmail.com',
            template: 'authentication/forgot_password',
            context: { token }
        }, (err) => {
            if(err)
                return res.status(400).send({ error: 'Cannot send forgot password email. (Ref 00x620)' })

            return res.send();
        })

    } catch (error) {
        res.status(400).send({ error: 'Error on forgot password, try again. (Ref 00x520)' })
    }
}

module.exports = {
    createUser,
    authUser,
    forgotPassword
}