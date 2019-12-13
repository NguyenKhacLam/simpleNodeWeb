const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: [{
        firstname: {
            type: String,
            required: [true, "User must have first name!"],
        },
        lastname: {
            type: String,
            required: [true, "User must have last name!"],
        },
        username: {
            type: String,
            required: [true, "User must have user name!"],
            unique: true,
        }
    }],
    email: {
        type: String,
        unique: true,
        required: [true, "User must have email!"],
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    phone: {
        type: Number,
        required: [true, "User must have number!"]
    },
    address: {
        type: String,
        required: [true, "User must have address!"]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager']
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;