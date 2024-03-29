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

const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, age } = req.body;
    const { code, payload } = await userService.addUser(
      firstName,
      lastName,
      age
    );
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, age } = req.body;
    const { code, payload } = await userService.updateUser(
      userId,
      firstName,
      lastName,
      age
    );
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { code, payload } = await userService.deleteUser(userId);
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
