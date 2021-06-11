const AppError = require('../utils/appError');

const hadleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token, log in again', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired', 401);

const sendErrorDev = (error, req, response) => {
  if (req.originalUrl.startsWith('/api')) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error: error,
    });
  } else {
    console.log(error);
    response
      .status(error.statusCode)
      .render('error', { title: 'Error', error });
  }
};

const sendErrorProd = (error, response) => {
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error('Error', error);
    response.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, request, response);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    if (err.name === 'CastError') err = hadleCastErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err);
    sendErrorProd(error, response);
  }
};
