const { Review, Room, User } = require("../models"); // Import all models
require("../utils/associations"); // Import table relationship

class ReviewController {
  // Get all review data
  async getAll(req, res, next) {
    try {
      let data = await Review.findAll({
        where: { room_id: req.params.id },
        attributes: ["id", "rating", "comment", "updatedAt"], // just these attributes that showed
        include: [
          {
            model: User,
            attributes: ["id", "first_name", "last_name", "image"],
          },
        ],
      });
      if (data.length === 0) {
        return next({ message: "No Review Found", statusCode: 404 });
      }
      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return next(e);
    }
  }

  // Create Review
  async create(req, res, next) {
    try {
      let createReview = await Review.create({
        room_id: req.params.id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        comment: req.body.comment,
      });

      let data = await Review.findOne({
        where: { id: createReview.id },
        attributes: ["id", "rating", "comment", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["id", "first_name", "last_name", "image"],
          },
        ],
      });

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return next(e);
    }
  }

  // Update Review
  async update(req, res, next) {
    try {
      await Review.update(
        {
          rating: req.body.rating,
          comment: req.body.comment,
        },
        {
          where: {
            room_id: req.params.id,
            user_id: req.body.user_id,
          },
        }
      );

      let data = await Review.findOne({
        where: {
          room_id: req.params.id,
          user_id: req.body.user_id,
        },
        attributes: ["id", "rating", "comment", "updatedAt"],
        include: [
          {
            model: User,
            attributes: ["id", "first_name", "last_name", "image"],
          },
        ],
      });

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // If error
      return next(e);
    }
  }

  // Delete Data
  async delete(req, res, next) {
    try {
      // Delete data
      let data = await Review.destroy({
        where: {
          room_id: req.params.id,
          user_id: req.body.user_id,
        },
      });

      // If data deleted is null
      if (!data) {
        return next({ message: "Review Not Found", statusCode: 404 });
      }

      // If success
      return res.status(200).json({
        message: "Success delete review",
      });
    } catch (e) {
      // If error
      return next(e);
    }
  }
}

module.exports = new ReviewController();
