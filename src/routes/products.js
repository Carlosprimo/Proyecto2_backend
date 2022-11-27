const router = require('express').Router();
const { ProductCategoriesRead, ProductCategoriesCreate, ProductCategoriesUpdate, ProductCategoriesDelete } = require("../controllers/productCategories.controller")
const { productCreate } = require('../controllers/products.controller')


router.get("/productsCategories", ProductCategoriesRead)

router.post("/productsCategories", ProductCategoriesCreate)

router.patch("/productsCategories/:id", ProductCategoriesUpdate)

router.delete("/productsCategories/:id", ProductCategoriesDelete)

module.exports = router;