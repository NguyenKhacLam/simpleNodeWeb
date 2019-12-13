const express = require('express');
const cateController = require('./../controllers/categoryContoller');

const router = express.Router();

router
    .route('/')
    .get(cateController.getAllCate)
    .post(cateController.createCate)

router
    .route('/:id')
    .get(cateController.getOneCateBySlug)
    .patch(cateController.updateCate)
    .delete(cateController.deleteOneCate)
module.exports = router;