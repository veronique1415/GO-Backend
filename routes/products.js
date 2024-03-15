const productsController = require("../controllers/products-controller");
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
    .get(productsController.getAll)
    .post(productsController.add)

router
    .route("/search")
    .get(productsController.searchProducts)    

router
    .route("/:productId")
    .get(productsController.findOne)



module.exports = router; 