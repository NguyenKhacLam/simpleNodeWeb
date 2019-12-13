const express = require('express');
const Category = require('./../models/categoryModel')

const localVar = express();

localVar.use(async(req, res, next) => {
    res.locals.user = "noUser"
    res.locals.cate = await Category.find();
    next();
})

module.exports = localVar;