const moongose = require('../../database/index')

const AnswerSchema = new moongose.Schema({
    answer: {
        type: Object,
        required: true
    },
    author: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    group: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
})

const Answer = moongose.model('Answer', AnswerSchema);

module.exports = Answer;