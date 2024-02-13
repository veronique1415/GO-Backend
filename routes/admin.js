const adminController = require("../controllers/admin-controller")
const express = require("express");
const router = express.Router();


router
    .route("/")
    .post(adminController.loginAdmin)