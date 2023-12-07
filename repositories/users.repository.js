const queryGenerator = require("../utils/queryGenerator");

const getUsers = async () => {
  try {
    const query = "SELECT users_getUsers_v2();";
    return await queryGenerator.executeQuery(query, {}, false);
  } catch (error) {
    throw error;
  }
};

const getUser = async (_userId) => {
  try {
    const query = "SELECT users_getUser_v2(:_userId);";
    return await queryGenerator.executeQuery(
      query,
      {
        _userId,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const addUser = async (_firstName, _lastName, _age) => {
  try {
    const query = "SELECT users_insUser(:_firstName, :_lastName, :_age);";
    return await queryGenerator.executeQuery(
      query,
      {
        _firstName,
        _lastName,
        _age,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const updateUser = async (_userId, _firstName, _lastName, _age) => {
  try {
    const query =
      "SELECT users_updUser(:_userId, :_firstName, :_lastName, :_age);";
    return await queryGenerator.executeQuery(
      query,
      {
        _userId,
        _firstName,
        _lastName,
        _age,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (_userId) => {
  try {
    const query = "SELECT users_delUser(:_userId);";
    return await queryGenerator.executeQuery(
      query,
      {
        _userId,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
