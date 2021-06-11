const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndDelete(request.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    response.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }

    response.status(200).json({
      status: 'success',
      data: { document },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (request, response, next) => {
    const document = await Model.create(request.body);

    response.status(201).json({
      status: 'success',
      data: { document },
    });
  });

exports.getOne = (Module, popOptions) =>
  catchAsync(async (request, response, next) => {
    const { id } = request.params;
    let query = Module.findById(id);

    if (popOptions) query = query.populate(popOptions);
    const document = await query;

    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }

    response.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (request, response, next) => {
    let filter = {};
    if (request.params.tourId) filter = { tour: request.params.tourId };
    const features = new APIFeatures(Model.find(filter), request.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const documents = await features.query;

    response.status(200).json({
      status: 'success',
      results: documents.length,
      data: {
        documents,
      },
    });
  });
