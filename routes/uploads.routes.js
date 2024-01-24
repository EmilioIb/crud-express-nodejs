const express = require("express");
const app = express();
const router = express.Router();

const uploadController = require("../controllers/uploads.controller");
const UploadsMiddleware = require("../middlewares/uploads.middleware");

// Get Uploads
router.get("/", uploadController.getUploads);

// Get Upload
router.get("/:uploadId", UploadsMiddleware.getUpload, uploadController.getUpload);

// Get Uploads from User
router.get("/getUploadsUser/:userId", UploadsMiddleware.getUserUploads, uploadController.getUploadsUser);

// Add Upload
router.post("/:userId", UploadsMiddleware.addUpload, uploadController.addUpload);

// Add Profile Photo for user
router.post("/addProfilePhoto/:userId", UploadsMiddleware.addProfilePhoto, uploadController.addProfilePhoto)

// Update Upload
router.put("/:userId/:uploadId", UploadsMiddleware.updateUpload, uploadController.updateUpload);

// Delete Upload
router.delete("/:userId/:uploadId", UploadsMiddleware.deleteUpload ,uploadController.deleteUpload);

app.use("/uploads", router);

module.exports = app;
