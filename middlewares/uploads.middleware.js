const Validator = require("../validators/uploads.validator");

class UploadsMiddleware {
  getUpload = async (req, res, next) => {
    try {
      await Validator.getUpload().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  getUserUploads = async (req, res, next) => {
    try {
      await Validator.getUserUploads().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  addUpload = async (req, res, next) => {
    try {
      await Validator.addUpload().validateAsync({
        ...req.params,
        ...req.body,
        ...req.files,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  addProfilePhoto = async (req, res, next) => {
    try {
      await Validator.addProfilePhoto().validateAsync({
        ...req.params,
        ...req.files,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  updateUpload = async (req, res, next) => {
    try {
      await Validator.updateUpload().validateAsync({
        ...req.body,
        ...req.params,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  deleteUpload = async (req, res, next) => {
    try {
      await Validator.deleteUpload().validateAsync({
        ...req.params,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };
}

module.exports = new UploadsMiddleware();
