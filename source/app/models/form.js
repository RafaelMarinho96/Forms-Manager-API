const moongose = require('../../database/index');

const FormSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    form:{
        type: Object,
        required: true
    }
})

const Form = moongose.model('Form', FormSchema);

module.exports = Form;