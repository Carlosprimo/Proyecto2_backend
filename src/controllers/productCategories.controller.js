const ProductCategories = require('../models/productCategories.model');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function ProductCategoriesRead(req, res) {
    try {
        const productCategories = await ProductCategories.find();
        res.json({ productCategories });

    } catch (error) {
        res.status(500).json({ error: 'Error', stack: error});
    }
}

async function ProductCategoriesCreate(req, res) {
    const { token, category } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        if (!category) return res.status(400).json({ error: 'Please fill all the fields' });

        try {
            const newProductCategory= new ProductCategories({ category, user });
            await newProductCategory.save();
            res.status(200).json({message: "Product category save" });
        } catch (error) {
            res.status(500).json({ error: 'Error', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function ProductCategoriesUpdate(req, res) {
    const productCategoryID = req.params.id
    const { token, categoryBody } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        if (!categoryBody) return res.status(400).json({ error: 'Please fill all the fields' });
        try {
            ProductCategories.updateOne({_id: productCategoryID}, {$set: categoryBody}).then(result => {
                res.status(200).send({message: "Successful product category update"})
            });
        } catch (error) {
            res.status(500).json({ error: 'Error', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function ProductCategoriesDelete(req, res) {
    const productCategoryID = req.params.id
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            ProductCategories.deleteOne({_id: productCategoryID}).then(result => {
                res.status(200).send({message: "Successful product category delete"})
            });
        } catch (error) {
            res.status(500).json({ error: 'Error', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { ProductCategoriesRead, ProductCategoriesCreate, ProductCategoriesUpdate, ProductCategoriesDelete };
