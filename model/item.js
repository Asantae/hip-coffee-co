const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true, default: 'drink' },
    price: { type: Number, required: true, default: 0.00 },
    ingredients: { type: String, default: 'none'}
    },
    { collection: 'item'}
)

const model = mongoose.model('ItemSchema', ItemSchema)

module.exports = model