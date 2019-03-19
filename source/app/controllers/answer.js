'use strict'
const answerModel = require('../models/answer');

async function findAnwersByFormId(req, res){
    try {
        const answers = await answerModel.find({form: req.params.formId});

        return res.send({answers})
    } catch (err) {
        return res.status(400);
    }
}

async function findAnswerById(req, res){
    try {
        const answer = await answerModel.findById(req.params.answerId).populate(['author','form','group']);

        return res.send({answer})
    } catch (err) {
        return res.status(400);
    }
}

module.exports = {
    findAnwersByFormId,
    findAnswerById
} 