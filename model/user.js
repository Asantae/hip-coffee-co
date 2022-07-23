const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: null }
    },
    { collection: 'user'}
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model