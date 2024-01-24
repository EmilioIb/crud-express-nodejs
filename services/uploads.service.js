const { uploadRepository } = require("../repositories/index");

const getUploads = async () => {
  try {
    const res = await uploadRepository.getUploads();
    const data = res[0].uploads_getuploads;

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
          msg: `Uploads found: ${data.length}`,
          data,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const getUpload = async (uploadId) => {
  try {
    const res = await uploadRepository.getUpload(uploadId);
    const data = res[0].uploads_getupload;

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
          msg: `Upload with id ${uploadId} found`,
          data,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const getUploadsUser = async (userId) => {
  try {
    const res = await uploadRepository.getUploadsUser(userId);
    const data = res[0].uploads_getuploadsuser;

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
          msg: `Uploads from user with id ${userId} found`,
          data,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

const addUpload = async (userId, uploadName, uploadUrl) => {
  try {
    const res = await uploadRepository.addUpload(userId, uploadName, uploadUrl);
    const { msg, status } = res[0].uploads_insupload;

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

const addProfilePhoto = async (userId, uploadUrl) => {
  try {
    const res = await uploadRepository.addProfilePhoto(userId, uploadUrl);
    const { msg, status } = res[0].user_profilephoto;

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

const updateUpload = async (uploadId, uploadName, uploadUrl) => {
  try {
    const res = await uploadRepository.updateUpload(
      uploadId, uploadName, uploadUrl
    );
    const { msg, status } = res[0].uploads_updupload;

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

const deleteUpload = async (uploadId) => {
  try {
    const res = await uploadRepository.deleteUpload(uploadId);
    const { msg, status } = res[0].uploads_delupload;

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
  getUploads,
  getUpload,
  getUploadsUser,
  addUpload,
  addProfilePhoto,
  updateUpload,
  deleteUpload,
};
