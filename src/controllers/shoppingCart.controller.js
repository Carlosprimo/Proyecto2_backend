const Product = require('../models/products.model')
const User = require('../models/user.model')
const ShoppingCart = require('../models/shoppingCart.model')
const jwt = require('jsonwebtoken');

async function getShoppingCart(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        
        const shoppingCart = await ShoppingCart.find({user: user});
        res.status(200).json({ shoppingCart })
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function ShoppingCartCreate(req, res) {
    const { token, productBody } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        
        if (!productBody){
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const product = await Product.findById(productBody);
        const newProduct = new ShoppingCart({ user, product });
        await newProduct.save().then(result => {
            res.status(200).json({message: 'Producto añadido al carrito'})
        });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function ShoppingCartDelete(req, res) {
    const { token, productBody } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        
        if (!productBody){
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const product = await Product.findById(productBody);

        ShoppingCart.deleteOne({ user: user, product: product }).then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).send({message: "Successful product delete"})
            }else{
                return res.status(200).send({message: "Failure to delete product"})
            }
        });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { getShoppingCart, ShoppingCartCreate, ShoppingCartDelete};