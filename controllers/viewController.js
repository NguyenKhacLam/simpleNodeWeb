const Product = require('./../models/productModel');

exports.getIndex = async(req, res) => {
    const products = await Product.find();
    res.status(200).render('index', {
        title: 'Home Page',
        products
    })
}

exports.getSignUp = async(req, res) => {
    res.status(200).render('signup', {
        title: 'Sign Up'
    })
}

exports.getLogin = async(req, res) => {
    res.status(200).render('login', {
        title: 'Log In'
    })
}

exports.getAddProduct = async(req, res) => {
    res.status(200).render('addproduct', {
        title: 'Add product'
    })
}

exports.getAddCate = async(req, res) => {
    res.status(200).render('category', {
        title: 'Add Category'
    })
}

exports.getUser = async(req, res) => {
    res.status(200).render('user', {
        title: 'User'
    })
}

exports.cart = async(req, res) => {
    res.status(200).render('cart', {
        title: 'Cart'
    })
}