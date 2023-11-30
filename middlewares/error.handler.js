module.exports = function errorHandler(err, req, res, next) {
  const errors = err.errors || { message: err.message };
  errors.status = false;
  res.status(err.status || 500).json({ errors });
};
