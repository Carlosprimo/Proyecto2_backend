const router = require('express').Router();
const { getShoppingCart, ShoppingCartCreate, ShoppingCartDelete } = require('../controllers/shoppingCart.controller')

router.get('/', getShoppingCart)

router.post('/', ShoppingCartCreate)

router.delete('/', ShoppingCartDelete)

module.exports = router;