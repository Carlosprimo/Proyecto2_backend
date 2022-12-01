const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchasesSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true});

module.exports = mongoose.models['Purchases'] || mongoose.model('Purchases', purchasesSchema);
