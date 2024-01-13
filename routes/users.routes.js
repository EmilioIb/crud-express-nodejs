const express = require("express");
const app = express();
const router = express.Router();

const userController = require("../controllers/users.controller");
const UsersMiddleware = require("../middlewares/users.middleware");

router.get("/", userController.getUsers);

router.get("/:userId", UsersMiddleware.deleteAndGetUser, userController.getUser);

router.post("/", UsersMiddleware.addUser, userController.addUser);

router.put("/:userId", UsersMiddleware.updateUser, userController.updateUser);

router.delete(
  "/:userId",
  UsersMiddleware.deleteAndGetUser,
  userController.deleteUser
);

app.use("/users", router);

module.exports = app;
