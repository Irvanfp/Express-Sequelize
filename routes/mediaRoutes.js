const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../middlewares/uploads/imageUpload");

let routes = (app) => {
  router.post("/upload", upload.imageUpload, uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;
