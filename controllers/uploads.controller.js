const cloudinary = require("cloudinary");
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadService, userService } = require("../services/index");

const getUploads = async (req, res, next) => {
  try {
    const { code, payload } = await uploadService.getUploads();
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const getUpload = async (req, res, next) => {
  try {
    const { uploadId } = req.params;
    const { code, payload } = await uploadService.getUpload(uploadId);
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const getUploadsUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { code, payload } = await uploadService.getUploadsUser(userId);
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const addUpload = async (req, res, next) => {
  try {
    const { tempFilePath } = req.files.file;
    const { userId } = req.params;
    const { name } = req.body;

    const { payload: userData } = await userService.getUser(userId);
    if(userData.data.length <= 0) throw "User not found";
    
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const { code, payload } = await uploadService.addUpload(userId, name, secure_url);

    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

const updateUpload = async (req, res, next) => {
  try {
    const { userId, uploadId } = req.params;
    const tempFilePath  = req.files ? req.files.file.tempFilePath : '';
    const { name: file } = req.body;

    const { payload: userData } = await userService.getUser(userId);
    if(userData.data.length <= 0) throw "User not found";

    const { payload: uploadData } = await uploadService.getUpload(uploadId);
    if(uploadData.data.length <= 0) throw "Upload not found";

    const { uploadurl, iduser } = uploadData.data[0];

    if(iduser != userId) throw "No permission for updating image";

    const splitedUrl = uploadurl.split("/");
    const name = splitedUrl[splitedUrl.length - 1];
    const publicId = name.split(".")[0];

    if(tempFilePath != ''){
      await cloudinary.v2.uploader.destroy(publicId);
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

      const { code, payload } = await uploadService.updateUpload(uploadId, file, secure_url);
      return res.status(code).json(payload);
    }else{
      const { code, payload } = await uploadService.updateUpload(uploadId, file, uploadurl);
      return res.status(code).json(payload);
    }

  } catch (error) {
    next(error);
  }
};

const deleteUpload = async (req, res, next) => {
  try {
    const { userId, uploadId } = req.params;

    const { payload: userData } = await userService.getUser(userId);
    if(userData.data.length <= 0) throw "User not found";

    const { payload: uploadData } = await uploadService.getUpload(uploadId);
    if(uploadData.data.length <= 0) throw "Upload not found";

    const { uploadurl, iduser } = uploadData.data[0];

    if(iduser != userId) throw "No permission for deleting image";

    const splitedUrl = uploadurl.split("/");
    const name = splitedUrl[splitedUrl.length - 1];
    const publicId = name.split(".")[0];

    await cloudinary.v2.uploader.destroy(publicId);
    const { code, payload } = await uploadService.deleteUpload(uploadId);
    return res.status(code).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUploads,
  getUpload,
  getUploadsUser,
  addUpload,
  updateUpload,
  deleteUpload,
};
