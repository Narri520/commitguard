const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';

  console.error(`[Error Handler] ${errorCode} - ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
    errorCode: errorCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
