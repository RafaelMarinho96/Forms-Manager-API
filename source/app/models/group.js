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
        type: String
    },
    description: {
        type: String,
        required: false
    },
    urlPath: {
        type: String,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }],
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;