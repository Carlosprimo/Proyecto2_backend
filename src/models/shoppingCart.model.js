const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true});

module.exports = mongoose.models['ShoppingCart'] || mongoose.model('ShoppingCart', shoppingCartSchema);