const queryGenerator = require("../utils/queryGenerator");

const getUploads = async () => {
  try {
    const query = "select uploads_getUploads();";
    return await queryGenerator.executeQuery(query, {}, false);
  } catch (error) {
    throw error;
  }
};

const getUpload = async (uploadId) => {
  try {
    const query = "select uploads_getUpload(:uploadId);";
    return await queryGenerator.executeQuery(query, { uploadId }, false);
  } catch (error) {
    throw error;
  }
};

const getUploadsUser = async (uploadId) => {
  try {
    const query = "select uploads_getUploadsUser(:uploadId);";
    return await queryGenerator.executeQuery(
      query,
      {
        uploadId,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const addUpload = async (userId, uploadName, fileName) => {
  try {
    const query = "select uploads_insUpload(:userId, :uploadName, :fileName);";
    return await queryGenerator.executeQuery(
      query,
      {
        userId, uploadName, fileName
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const updateUpload = async (uploadId, uploadName, fileName) => {
  try {
    const query =
      "select uploads_updUpload(:uploadId, :uploadName, :fileName);";
    return await queryGenerator.executeQuery(
      query,
      {
        uploadId, uploadName, fileName
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const addProfilePhoto = async (uploadId, image) => {
  try {
    const query =
      "select user_profilePhoto(:uploadId, :image);";
    return await queryGenerator.executeQuery(
      query,
      {
        uploadId, image
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

const deleteUpload = async (uploadId) => {
  try {
    const query = "select uploads_delUpload(:uploadId)";
    return await queryGenerator.executeQuery(
      query,
      {
        uploadId,
      },
      false
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUploads,
  getUpload,
  getUploadsUser,
  addUpload,
  updateUpload,
  deleteUpload,
  addProfilePhoto,
};
