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

const addUser = async (firstName, lastName, age) => {
  try {
    const res = await userRepository.addUser(firstName, lastName, age);
    const { msg, status } = res[0].users_insuser;

    if (!status) {
      return {
        code: 500,
        payload: {
          status,
          msg,
        },
      };
    } else {
      return {
        code: 200,
        payload: {
          status,
          msg,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, firstName, lastName, age) => {
  try {
    const res = await userRepository.updateUser(
      userId,
      firstName,
      lastName,
      age
    );
    const { msg, status } = res[0].users_upduser;

    if (!status) {
      return {
        code: 500,
        payload: {
          status,
          msg,
        },
      };
    } else {
      return {
        code: 200,
        payload: {
          status,
          msg,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const res = await userRepository.deleteUser(userId);
    const { msg, status } = res[0].users_deluser;

    if (!status) {
      return {
        code: 500,
        payload: {
          status,
          msg,
        },
      };
    } else {
      return {
        code: 200,
        payload: {
          status,
          msg,
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
  addUser,
  updateUser,
  deleteUser,
};
