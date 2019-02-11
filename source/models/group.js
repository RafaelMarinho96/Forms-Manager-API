const moongose = require('../database/index')

const GroupSchema = new moongose.Schema({
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

const Group = moongose.model('Group', GroupSchema);

module.exports = Group;