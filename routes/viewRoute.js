const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getIndex);
router.get('/signup', authController.isLoggedIn, viewController.getSignUp);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/addproduct', authController.isLoggedIn, viewController.getAddProduct);
router.get('/addcategory', authController.protectRoute, authController.isLoggedIn, viewController.getAddCate);
router.get('/user', authController.isLoggedIn, viewController.getUser);
router.get('/cart', authController.isLoggedIn, viewController.cart);

module.exports = router;