const producerController = require("../controllers/producers-controller");
const express = require("express");
const router = express.Router();


router
    .route("/")
    .get(producerController.getAll)



module.exports = router;