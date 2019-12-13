const ApiFeature = require('./../utlis/apiFeatures');
const AppError = require('./../utlis/appError');
const catchAsync = require('./../utlis/catchAsync');

exports.deleteOneDocument = Model => catchAsync(async(req, res, next) => {
    const documment = await Model.findByIdAndDelete(req.params.id);
    if (!documment) return next(new AppError("No documment found with this ID", 404));

    res.status(201).json({
        status: 'success',
        message: 'Delete successfully!'
    })
})

exports.getAllDocument = Model => catchAsync(async(req, res, next) => {
    const features = new ApiFeature(Model.find(), req.query).filter().sort().paginate().limitFields();

    const documents = await features.query;

    res.status(200).json({
        status: 'success',
        results: documents.length,
        data: {
            documents
        }
    });
})

exports.createOneDocument = Model => catchAsync(async(req, res, next) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newDocument
        }
    })
})

exports.updateOneDocument = Model => catchAsync(async(req, res, next) => {
    const updateDocument = await Model.findByIdAndUpdate(req.params.id, req.body);

    if (!updateDocument) return next(new AppError("No documment found with this ID", 404));

    res.status(201).json({
        status: 'success',
        message: 'Update successfully!'
    })
})

exports.getOneDocument = Model => catchAsync(async(req, res, next) => {
    const slug = req.params.id;
    const document = await Model.find({ slug });

    if (!document) return next(new AppError("No documment found", 404));

    res.status(200).json({
        status: 'success',
        data: {
            document
        }
    })
})