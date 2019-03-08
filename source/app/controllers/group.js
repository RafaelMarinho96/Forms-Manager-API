'use strict'
const groupForm = require('../models/group')
const Form = require('../models/form');

async function create(req, res){
    try {
        const { name, members, description, created_at, forms } = req.body;

        const group = await groupForm.create({ name, members, description, created_at, author: req.userID });

        if(!forms)
            return res.send({ group });

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

async function update(req, res){
    try {
        const { name, members, description, created_at, forms } = req.body;

        const group = await groupForm.findByIdAndUpdate(req.params.groupId, {
            name, 
            members, 
            description, 
            created_at
        }, {new: true});

        group.forms = [];
        await Form.remove({ group: group._id});

        if(!forms)
            return res.send({ group });

        await Promise.all(forms.map(async form => {
            const groupForm = new Form({ ...form, author: req.userID, group: group._id })

            await groupForm.save();
            group.forms.push(groupForm);
        }))

        await group.save();

        return res.send({ group });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on update group. (Ref 00x303)'})
    }
}

module.exports = {
    create,
    update
}