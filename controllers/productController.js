const multer = require('multer');
const sharp = require('sharp');
const Product = require('./../models/productModel');
const handleFactory = require('./../controllers/handleFactory')
const AppError = require('./../utlis/appError');
const catchAsync = require('./../utlis/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);

exports.resize = catchAsync(async(req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();

    // 1) Cover image
    req.body.imageCover = `product-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${req.body.imageCover}`);

    // 2) Images
    req.body.images = [];

    await Promise.all(
        req.files.images.map(async(file, i) => {
            const filename = `product-${Date.now()}-${i + 1}.jpeg`;

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/products/${filename}`);

            req.body.images.push(filename);
        })
    );

    next();
    // console.log(req.files.imageCover);

})

exports.getAllProduct = handleFactory.getAllDocument(Product);
exports.createProduct = handleFactory.createOneDocument(Product);
exports.updateProduct = handleFactory.updateOneDocument(Product);