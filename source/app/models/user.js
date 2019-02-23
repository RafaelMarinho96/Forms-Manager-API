const bcrypt = require('bcryptjs');
const mongoose = require('../../database/index')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next) {
    const encryptPass = await bcrypt.hash(this.password, 10);
    this.password = encryptPass;

    next();

})
const User = mongoose.model('User', UserSchema);

module.exports = User;