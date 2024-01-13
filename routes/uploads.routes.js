const express = require("express");
const app = express();
const router = express.Router();

const uploadController = require("../controllers/uploads.controller");
const UploadsMiddleware = require("../middlewares/uploads.middleware");

// todo: terminar con update, ver si el file va a ser opcional, en caso de que sea haz que solo borre la imagen y la resuba si hay, sino solo el nombre
// todo: añade middlewares

// Get Uploads
router.get("/", uploadController.getUploads);

// Get Upload
router.get("/:uploadId", UploadsMiddleware.getUpload, uploadController.getUpload);

// Get Uploads from User
router.get("/getUploadsUser/:userId", UploadsMiddleware.getUserUploads, uploadController.getUploadsUser);

// Subir Imagen
router.post("/:userId", UploadsMiddleware.addUpload, uploadController.addUpload);

// Actualizar Imagen
router.put("/:userId/:uploadId", UploadsMiddleware.updateUpload, uploadController.updateUpload);

// Borrar Imagen
router.delete("/:userId/:uploadId", UploadsMiddleware.deleteUpload ,uploadController.deleteUpload);

app.use("/uploads", router);

module.exports = app;
