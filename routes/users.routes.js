const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/Users", userController.getUsers);
router.get("/Users/:userId", userController.getUser);

app.use("/api", router);

module.exports = app;