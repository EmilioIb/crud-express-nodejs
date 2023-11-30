const { userRepository } = require("../repositories/index");

const getUsers = async () => {
  try {
    const res = await userRepository.getUsers();
    const data = res[0].users_getusers_v2;

    if (data.length <= 0) {
      return {
        code: 204,
        payload: {
          status: true,
          msg: "No data found",
          data: [],
        },
      };
    } else {
      return {
        code: 200,
        payload: {
          status: true,
          msg: `Users found: ${data.length}`,
          data,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const getUser = async (userId) => {
  try {
    const res = await userRepository.getUser(userId);
    const data = res[0].users_getuser_v2;

    if (data.length <= 0) {
      return {
        code: 200,
        payload: {
          status: true,
          msg: "No data found",
          data: [],
        },
      };
    } else {
      return {
        code: 200,
        payload: {
          status: true,
          msg: `User with id ${userId} found`,
          data,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getUser,
};
