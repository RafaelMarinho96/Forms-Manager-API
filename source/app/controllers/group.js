'use strict'
const groupForm = require('../models/group')
const Form = require('../models/form');

async function create(req, res){
    try {
        const { name, members, description, created_at, forms } = req.body;

        const group = await groupForm.create({ name, members, description, created_at, author: req.userID });

        await Promise.all(forms.map(async form => {
            const groupForm = new Form({ ...form, author: req.userID, group: group._id })

            await groupForm.save();
            group.forms.push(groupForm);
        }))

        await group.save();

        return res.send({ group });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on create group. (Ref 00x303)'})
    }
}

module.exports = {
    create
}