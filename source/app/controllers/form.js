'use strict'
const form = require('../models/form');

async function createForm(req, res){
    try {
        const newForm = await form.create(req.body);

        return res.send({ newForm })
    } catch (err) {
        return res.status(400).send({ error: 'Ops! Algo de errado ocorreu ao tentar criar o formulário. (Ref 00x303)'});
    }
}

module.exports = {
    createForm
}