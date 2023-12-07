const Validator = require("../validators/user.validator");

class UsersMiddleware {
  addUser = async (req, res, next) => {
    try {
      req.userToAdd = await Validator.addUser().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      req.userToUpdate = await Validator.updateUser().validateAsync({
        ...req.params,
        ...req.body,
      });

      next();
    } catch (error) {
      res
        .status(400)
        .json({ status: false, message: error.message || error, data: null });
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      req.userToDelete = await Validator.deleteUser().validateAsync({
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

module.exports = new UsersMiddleware();
