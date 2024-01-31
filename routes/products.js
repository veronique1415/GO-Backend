const productsController = require("../controllers/products-controller");
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(productsController.getAll)

router
    .route("/search")
    .get(productsController.searchProducts)    

router
    .route("/:productId")
    .get(productsController.findOne)



module.exports = router; 