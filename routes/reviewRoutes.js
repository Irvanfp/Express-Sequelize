const express = require("express");
const router = express.Router();

// Import middleware
const reviewRoomController = require("../controllers/reviewRoomController");
const reviewUserController = require("../controllers/reviewUserController");

const reviewUserValidator = require("../middlewares/validators/reviewUserValidator");
const reviewRoomValidator = require("../middlewares/validators/reviewRoomValidator");

const auth = require("../middlewares/auth");

// Admin Routes
// Get All Review for admin
router.get("/all", auth.admin, reviewUserController.getAllAdmin);
// Get One Review for admin
router.get("/:id", auth.admin, reviewUserController.getOneAdmin);
// Update Review for admin
router.put("/:id", auth.admin, reviewUserController.updateAdmin);
// Delete Review for admin
router.delete("/:id", auth.admin, reviewUserController.deleteAdmin);

// Get All Review based on User
router.get(
  "/user/:id",
  reviewUserValidator.getAll,
  reviewUserController.getAll
);
// Get One Review based on User
router.get("/", reviewUserValidator.getOne, reviewUserController.getOne);
// Update Review based on User
router.put(
  "/user/:id",
  reviewUserValidator.update,
  reviewUserController.update
);
// Delete Review based on User
router.delete(
  "/user/:id",
  reviewUserValidator.delete,
  reviewUserController.delete
);

// Get All Review based on Room
router.get(
  "/room/:id",
  reviewRoomValidator.getAll,
  reviewRoomController.getAll
);
// Create Review for Room
router.post(
  "/room/:id",
  reviewRoomValidator.create,
  reviewRoomController.create
);
// Update Review for Room
router.put(
  "/room/:id",
  reviewRoomValidator.update,
  reviewRoomController.update
);
// Delete Review for Room
router.delete(
  "/room/:id",
  reviewRoomValidator.delete,
  reviewRoomController.delete
);

module.exports = router;
