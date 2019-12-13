const express = require('express');
const multer = require('multer');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');


const router = express.Router();

router
    .route('/')
    .get(productController.getAllProduct)
    .post(productController.uploadTourImages, productController.resize, productController.createProduct)
router
    .route('/:id')
    .patch(productController.uploadTourImages, productController.resize, productController.updateProduct)
module.exports = router;