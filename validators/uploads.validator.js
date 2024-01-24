const joi = require("joi");

class UserValidator {
  getUpload = () => {
    return joi
      .object()
      .keys({
        uploadId: joi.number().integer().min(1).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  getUserUploads = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  addUpload = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
        file: joi.object().required(),
        name: joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  addProfilePhoto = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
        file: joi.object().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  updateUpload = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
        uploadId: joi.number().integer().min(1).required(),
        name: joi.string().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  deleteUpload = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
        uploadId: joi.number().integer().min(1).required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new UserValidator();
