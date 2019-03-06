'use strict'
const groupForm = require('../models/group')

async function create(req, res){
    try {
        const group = await groupForm.create({ ...req.body, author: req.userID });

        return res.send({ group });
    } catch (err) {
        return res.status(400).send({ error: 'Failed on create group. (Ref 00x303)'})
    }
}

module.exports = {
    create
}