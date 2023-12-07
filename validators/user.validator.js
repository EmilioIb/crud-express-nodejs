const joi = require("joi");

class UserValidator {
  addUser = () => {
    return joi
      .object()
      .keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        age: joi.number().integer().min(1).max(130).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  updateUser = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        age: joi.number().integer().min(1).max(130).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };

  deleteUser = () => {
    return joi
      .object()
      .keys({
        userId: joi.number().integer().min(1).required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new UserValidator();
