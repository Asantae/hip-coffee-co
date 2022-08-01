const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true, default: 'drink' },
    price: { type: Int32, required: true, default: 0.00 },
    ingrediants: { type: String, default: 'none'}
    },
    { collection: 'item'}
)

const model = mongoose.model('ItemSchema', ItemSchema)

module.exports = model