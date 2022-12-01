const Review = require('../models/reviews.model');
const Product = require('../models/products.model')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

async function reviewCreate(req, res) {
    const { token, productBody, rating, body } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        if (!productBody || !rating || !body) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const product = await Product.findOne({ productBody });
        if (product) {
            try {
                res.status(500).json({ error: 'Error', stack: error});
            } catch (error) {
                const newReview = new Review({ user, product, rating, body});
                await newReview.save();
                res.status(200).json({message: "Review save" });
            }
        }else{
            return res.status(400).json({ error: 'The product does not exist' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function reviewUser(req, res) {
    const userID = req.params.id
    try {
        reviews = await Review.find({user: userID})
        res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).json({ error: 'Error', stack: error});
    }
}

async function reviewProduct(req, res) {
    const productID = req.params.id
    try {
        reviews = await Review.find({product: productID})
        res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).json({ error: 'Error', stack: error});
    }
}

async function reviewRating(req, res) {
    try {
        reviews = await Review.find({rating: 5})
        res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).json({ error: 'Error', stack: error});
    }
}

async function reviewDelete(req, res) {
    const reviewID = req.params.id
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            Review.deleteOne({_id: reviewID, user: user}).then(result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({message: "Review delete" });
                }else {
                    return res.status(200).send({message: "Failure to delete review"})
                }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = {reviewCreate, reviewUser, reviewProduct, reviewRating, reviewDelete}