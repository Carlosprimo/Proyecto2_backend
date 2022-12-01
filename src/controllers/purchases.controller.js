const User = require('../models/user.model')
const ShoppingCart = require('../models/shoppingCart.model')
const Purchases = require('../models/purchases.model')
const jwt = require('jsonwebtoken');

async function getPurchases(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        const purchases = await Purchases.find({user: user});
        res.status(200).json({ purchases })
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function purchasesCreate(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        const products = await ShoppingCart.find({user: user}); 
        if (products.length > 0) {
            Purchases.insertMany(products).then(result => {
                ShoppingCart.deleteMany({user: user}).then(result => {
                    res.status(200).json({message: 'Purchase finish'})
                })
            })
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { getPurchases, purchasesCreate };