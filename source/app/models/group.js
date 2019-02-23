const mongoose = require('../../database/index')

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
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
    }
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;