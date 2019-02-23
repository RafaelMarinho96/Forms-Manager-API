'use strict'
const group = require('../models/group')

async function createGroup(req, res){
    try {
        const newGroup = await group.create(req.body);

        return res.send({ newGroup })
    } catch (err){
        return res.status(400).send({ error: 'Ops! Algo de errado ocorreu ao tentar criar o grupo. (Ref 00x303)'})
    }
}

module.exports = {
    createGroup
}