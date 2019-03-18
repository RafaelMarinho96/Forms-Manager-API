const mongoose = require('../../database/index');

const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    urlPath: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    form:{
        type: Object,
        required: true
    },
})

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;