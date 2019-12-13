const Category = require('./../models/categoryModel');
const handleFactory = require('./../controllers/handleFactory')
const AppError = require('./../utlis/appError');
const catchAsync = require('./../utlis/catchAsync');

exports.getAllCate = handleFactory.getAllDocument(Category);
exports.createCate = handleFactory.createOneDocument(Category);
exports.updateCate = handleFactory.updateOneDocument(Category);
exports.getOneCateBySlug = handleFactory.getOneDocument(Category);
exports.deleteOneCate = handleFactory.deleteOneDocument(Category);