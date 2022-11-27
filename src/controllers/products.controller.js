const ProductCategories = require('../models/productCategories.model');
const Product = require('../models/products.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function productCreate(req, res) {
    const { token, name, price, categoryBody } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        if (!name || !price || !categoryBody) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const category = await ProductCategories.findOne({ categoryBody });
        if (category) {
            try {
                const newProduct = new Product({ name, price, user, categoryBody});
                await newProduct.save();
                res.status(200).json({message: "Product save" });
            } catch (error) {
                res.status(500).json({ error: 'Error', stack: error});
            }
        }else{
            return res.status(400).json({ error: 'The category does not exist' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }

}


module.exports = {productCreate}