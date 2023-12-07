const express = require("express");
const app = express();
const router = express.Router();

const userController = require("../controllers/users.controller");
const UsersMiddleware = require("../middlewares/users.middleware");

router.get("/Users", userController.getUsers);

router.get("/Users/:userId", userController.getUser);

router.post("/Users", UsersMiddleware.addUser, userController.addUser);

router.put(
  "/Users/:userId",
  UsersMiddleware.updateUser,
  userController.updateUser
);

router.delete(
  "/Users/:userId",
  UsersMiddleware.deleteUser,
  userController.deleteUser
);

app.use("/api", router);

module.exports = app;
