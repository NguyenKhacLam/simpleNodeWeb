const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const CartSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }
})

CartSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// CartSchema.pre(/^find/, function(next) {})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;