const producerController = require("../controllers/producers-controller");
const productController = require("../controllers/products-controller")
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Define multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use current timestamp as filename
  }
});

// Configure multer upload middleware
const upload = multer({ storage: storage });


router
    .route("/")
    .get(producerController.getAll)
    .post(upload.single("producer_image"), producerController.add)

router
    .get("/search", producerController.searchProducers);      


router 
    .route("/:producerId")
    .get(producerController.findOne)
    .put(producerController.updatedProducer)  
    .delete(producerController.deleteProducer) 
     
   
router
    .route("/:producerId/products")
    .get(productController.producersProducts)
    




module.exports = router;