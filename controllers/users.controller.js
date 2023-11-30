const { userService } = require("../services/index");

const getUsers = async (req, res, next) => {
  try {
    const { code, payload } = await userService.getUsers();
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { code, payload } = await userService.getUser(userId);
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
};
