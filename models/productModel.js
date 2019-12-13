const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Product must have name!"]
    },
    categories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }],
    brand: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    }],
    slug: String,
    imageCover: {
        type: String,
        default: 'noimg.png',
        required: [true, "Product must have cover image!"]
    },
    images: [String],
    price: {
        type: Number,
        required: [true, "Product must have price!"]
    },
    salesPrice: {
        type: Number,
        validator: {
            function(el) {
                return el => this.price;
            },
            message: "SalesPrice can not greater than price!"
        }
    },
    description: {
        type: String,
        required: [true, "Product must have description!"]
    },
    amount: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    options: [{
        nameOption: String,
        optionVals: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;