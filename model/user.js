const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: null },
    loggedIn: { type: Boolean, default: false },
    lastLogged: { type: String, default: false},
    role: {type: String, default: 'Cashier' }
    },
    { collection: 'user'}
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model