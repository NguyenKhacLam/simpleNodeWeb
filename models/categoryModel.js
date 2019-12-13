const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Category must have name!"]
    },
    slug: String,
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

// categorySchema.pre(/^find/, function(next) {})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;