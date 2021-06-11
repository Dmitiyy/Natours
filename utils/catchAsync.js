const catchAsync = (fn) => (request, response, next) => {
  fn(request, response, next).catch((err) => next(err));
};
module.exports = catchAsync;
