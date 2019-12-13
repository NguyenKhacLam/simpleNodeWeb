const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('./../utlis/appError');
const catchAsync = require('./../utlis/catchAsync');

exports.createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.logIn = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_COOKIE_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (!email || !password) return next(new AppError('Please provide email and password', 400));

    const user = await User.findOne({ email }).select('+password')

    if (!user) return next(new AppError('Incorrect email or password', 401));

    token = this.createToken(user._id);

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions)

    res.status(201).json({
        status: 'success',
        token,
        message: 'You are logged in!'
    })

})

exports.signUp = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    })

    token = this.createToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.protectRoute = catchAsync(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('Please log in to perform this action!', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new AppError('This user is no longer exists!', 404));
    }
    next();
})

exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            res.locals.user = 'noUser';
            return next();
        }
    }
    next();
};

exports.logout = catchAsync(async(req, res, next) => {
    res.cookie('jwt', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now + 10 * 1000)
    })

    res.status(200).json({ status: 'success' })
})

exports.forgetPassword = catchAsync(async(req, res, next) => {

})

exports.resetPassword = catchAsync(async(req, res, next) => {

})

exports.updatePassword = catchAsync(async(req, res, next) => {

})