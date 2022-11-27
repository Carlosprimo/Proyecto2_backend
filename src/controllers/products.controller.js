const ProductCategories = require('../models/productCategories.model');
const Product = require('../models/products.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function productCreate(req, res) {
    const { token, name, price, category } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const categoryProduct = await ProductCategories.findOne({ category });
        if (!categoryProduct) {
            try {
                res.status(500).json({ error: 'Error', stack: error});
            } catch (error) {
                const newProduct = new Product({ name, price, user, category});
                await newProduct.save();
                res.status(200).json({message: "Product save" });
            }
        }else{
            return res.status(400).json({ error: 'The category does not exist' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function getProductUser(req, res) {
    const userID = req.params.id
    try {
        const products = await Product.find({user: userID});
        if (!products) {
            res.status(200).json({message: 'The user has not created any products'})
        } else {
            res.status(200).json({ products })      
        }
    } catch (error) {
        res.status(500).json({ error: 'Error', stack: error});
    }
}

async function getProduct(req, res) {
    const pruductID = req.params.id
    try {
        const products = await Product.find({_id: pruductID});
        if (!products) {
            res.status(200).json({message: 'Identification does not exist'})
        } else {
            res.status(200).json({ products })      
        }
    } catch (error) {
        res.status(500).json({ error: 'Error', stack: error});
    }
}

async function getProductName(req, res) {
    const nameProduct = req.params.name
    try {
        const products = await Product.find({name: nameProduct});
        if (!products) {
            res.status(200).json({message: 'Name does not exist'})
        } else {
            res.status(200).json({ products })      
        }
    } catch (error) {
        res.status(500).json({ error: 'Error', stack: error});
    }
}

async function getProductCategory(req, res) {
    const categoryProduct = req.params.id
    try {
        const products = await Product.find({category: categoryProduct});
        if (!products) {
            res.status(200).json({message: 'Name does not exist'})
        } else {
            res.status(200).json({ products })      
        }
    } catch (error) {
        res.status(500).json({ error: 'Error', stack: error});
    }
}

async function productUpdate(req, res) {
    const { token } = req.body;
    const productID = req.params.id

    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            const { productBody } = req.body
            Product.updateOne({ _id: productID, user: user }, { $set: productBody}).then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).send({message: "Successful product update"})
                }else{
                    res.status(200).send({message: "Failure to update product"})
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Invalid update', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function productDelete(req, res) {
    const { token } = req.body;
    const productID = req.params.id

    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            Product.deleteOne({ _id: productID, user: user }).then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).send({message: "Successful product delete"})
                }else{
                    res.status(200).send({message: "Failure to delete product"})
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Invalid update', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { productCreate, getProductUser, getProduct, getProductName, getProductCategory, 
    productUpdate, productDelete }
