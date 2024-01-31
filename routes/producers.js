const producerController = require("../controllers/producers-controller");
const productController = require("../controllers/products-controller")
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(producerController.getAll)

router
    .get("/search", producerController.searchProducers);      


router 
    .route("/:producerId")
    .get(producerController.findOne) 
     
   
router
    .route("/:producerId/products")
    .get(productController.producersProducts)  
    




module.exports = router;