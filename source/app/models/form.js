const moongose = require('../../database/index');

const FormSchema = new moongose.Schema({
    name: {
        type: String,
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
    },
    description: {
        type: String,
        required: true
    },
    access: {
        level: {
            type: String,
        },
        members: [{
            type: String
        }]
    },
    form:{
        type: Object,
        required: true
    }
})

const Form = moongose.model('Form', FormSchema);

module.exports = Form;