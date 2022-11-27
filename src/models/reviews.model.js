const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        require: true
    },
    body: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.models['Review'] || mongoose.model('Review', reviewSchema);