const mongoose = require('../../database/index')

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    members: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true
    },
    form: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }]
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;