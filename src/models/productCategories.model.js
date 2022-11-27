const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategoriesSchema = new Schema ({
    category: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.models['ProductCategories'] || mongoose.model('ProductCategories', productCategoriesSchema);
