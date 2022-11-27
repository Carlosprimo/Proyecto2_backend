const router = require('express').Router();
const { ProductCategoriesRead, ProductCategoriesCreate, ProductCategoriesUpdate, 
    ProductCategoriesDelete } = require("../controllers/productCategories.controller");
const { productCreate, getProductUser, getProduct, getProductName, getProductCategory, 
    productUpdate, productDelete} = require('../controllers/products.controller');
const { reviewCreate, reviewUser, reviewProduct, reviewRating, 
    reviewDelete } = require("../controllers/reviews.controller")

router.get("/productsCategories", ProductCategoriesRead);

router.post("/productsCategories", ProductCategoriesCreate);

router.patch("/productsCategories/:id", ProductCategoriesUpdate);

router.delete("/productsCategories/:id", ProductCategoriesDelete);

router.post("/", productCreate);

router.get("/user/:id", getProductUser);

router.get("/:id", getProduct);

router.get("/name/:name", getProductName);

router.get("/category/:id", getProductCategory);

router.patch(":id", productUpdate);

router.delete(":id", productDelete);

router.post("/review", reviewCreate);

router.get("/review/bestRating", reviewRating)

router.get("/review/:id", reviewUser)

router.get("/review/prod/:id", reviewProduct)

router.delete("/review/:id", reviewDelete)

module.exports = router;