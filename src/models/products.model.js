const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: String,
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
}, {timestamps: true});

module.exports = mongoose.models['Product'] || mongoose.model('Product', productSchema);
