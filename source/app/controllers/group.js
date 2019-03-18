'use strict'
const groupForm = require('../models/group')
const Form = require('../models/form');
const answerModel =  require('../models/answer');
const urlService = require('../services/urlService');

async function create(req, res){
    try {
        const { name, members, description, created_at, forms } = req.body;

        var urlPath = urlService.generateUrlPath(name);

        const group = await groupForm.create({ name, members, description, created_at, urlPath, author: req.userID });

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

async function pushGroupFormById(req, res){
    try {
        const { forms } = req.body;
  
        var name = req.body.forms[0].name;
        var urlPath = urlService.generateUrlPath(name);

        const group = await groupForm.findByIdAndUpdate(req.params.groupId, forms, {new: true});

        if(!forms)
            return res.status(400).send({ error: 'Form is not exists in requisition. (Ref 00x303)'})

        await Promise.all(forms.map(async form => {
            const groupForm = new Form({ ...form, urlPath: urlPath, author: req.userID, group: group._id })

            console.log(groupForm)
            await groupForm.save();
            group.forms.push(groupForm);

            return res.send(groupForm)
        }))
        
        await group.save();
        
        return res.send({groupForm})
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on update group. (Ref 00x303)'})
    }
}

async function find(req, res){
    try {
        const group = await groupForm.find().populate(['author','forms']);

        res.send(group)
    } catch (err) {
        return res.status(400).send({ error: 'Failed on loading group list. (Ref 00x303)'});
    }
}

async function findGroupById(req, res){
    try {
        const group = await groupForm.findById(req.params.groupId).populate(['author','forms']);

        res.send({ group })
    } catch (err) {
        return res.status(400).send({ error: 'Failed on loading group list. (Ref 00x303)'});
    }
}

async function findGroupByUrlPath(req, res){
    try {
        const urlPath = req.params.urlPath;

        const group = await groupForm.findOne({urlPath: urlPath}).populate('forms');

        return res.send(group)
    } catch (err) {
        return res.status(400).send({ error: 'Failed on loading group list. (Ref 00x303)'});
    }
}

async function pushGroupAnswersById(req, res){
    try{
        const { answer } = req.body;

        const group = await groupForm.findByIdAndUpdate(req.params.groupId, answer, {new: true});

        if(!answer)
            return res.status(400).send({ error: 'Form is not exists in requisition. (Ref 00x303)'})

        await Promise.all(answer.map(async answer => {
            const groupForm = new answerModel({ ...answer, author: req.userID, group: group._id })

            await groupForm.save();
            group.answer.push(groupForm);

            return res.send(groupForm)
        }))
        
        await group.save();
        
        return res.send({groupForm})
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on update group. (Ref 00x303)'})
    }
}

module.exports = {
    create,
    update,
    find,
    pushGroupFormById,
    pushGroupAnswersById,
    findGroupById,
    findGroupByUrlPath
}