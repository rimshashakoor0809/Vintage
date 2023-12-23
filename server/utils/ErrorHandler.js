const ErrorHandler = (res, error, message) => {
  const status = error.statusCode || 500;
  res.status(status).json({
    success: false,
    message: message || error.message,
    error: error.stack,
    data: null
  });
}

module.exports = ErrorHandler;
