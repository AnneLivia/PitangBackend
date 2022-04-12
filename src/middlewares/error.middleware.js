const errorMiddleware = (error, req, res, next) => {
  res.status(error.statusCode || 500);

  if (error.listOfErrors) {
    return res.json({
      message: error.message,
      errors: error.listOfErrors,
    });
  }

  // only message was passed
  res.json({ message: error.message });

  // (optional) next
  // to show stack trace of the error: next(error)
  next();
};

export default errorMiddleware;
