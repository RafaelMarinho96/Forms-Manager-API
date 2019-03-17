'use strict'
const formModel = require('../models/form');

async function create(req, res){
    try {
        const form = await formModel.create({...req.body, author: req.userID});

        return res.send({ form })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on created a new form. (Ref 00x303)'});
    }
}

async function find(req, res){
    try {
        const forms = await formModel.find().populate('author');

        res.send({ forms })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on loading form list. (Ref 00x303)'});
    }
}

async function findById(req, res){
    try {
        const form = await formModel.findById(req.params.formId).populate('author');

        return res.send({form})
    } catch (err) {
        return res.status(400).send({ error: 'Failed on loading form. (Ref 00x303)'});
    }
}

async function deleteById(req, res){
   try {
       await formModel.findByIdAndRemove(req.params.formId);

       return res.send();
   } catch (err) {
        return res.status(400).send({ error: 'Failed on delete form. (Ref 00x303)'});
   } 
}

async function updateById(req, res){
    try {
        const data = req.body;

        const form = await formModel.findByIdAndUpdate(req.params.formId, data, {new: true})

        res.send({form})
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on update form. (Ref 00x303)'});
    }
}

async function pushFormById(req, res){
    try {
        const { form } = req.body;
        console.log(form);

        if(!form)
            return res.status(400).send({ error: 'Failed, form is not send in req body. (Ref 00x303)'});

        const formResult = await formModel.findByIdAndUpdate(req.params.formId, {form: form}, {new: true})

        res.send({formResult})
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Failed on update form. (Ref 00x303)'});
    }
}


async function findFormByName(req, res){
    try {
        const urlpath = req.params.name;

        const form = await formModel.find({urlPath: urlpath});

        return res.send(form)
    } catch (err) {
        return res.status(400).send({ error: 'Failed on update form. (Ref 00x303)'});
    }
}

module.exports = {
    create,
    find,
    findById,
    findFormByName,
    deleteById,
    updateById,
    pushFormById
}