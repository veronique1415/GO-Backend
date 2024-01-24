const productsController = require("../controllers/products-controller");
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(productsController.getAll)



module.exports = router;