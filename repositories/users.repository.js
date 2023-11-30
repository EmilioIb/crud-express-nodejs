const queryGenerator = require("../utils/queryGenerator");

const getUsers = async () => {
  try {
    const query = "SELECT users_getUsers_v2();";
    return await queryGenerator.executeQuery(query, {}, false);
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const query = "SELECT users_getUser_v2(:_userId);";
    return await queryGenerator.executeQuery(
      query,
      {
        _userId: userId,
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
};
