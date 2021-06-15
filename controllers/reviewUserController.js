const { Review, Room, User } = require("../models"); // Import all models
require("../utils/associations"); // Import table relationship

class ReviewController {
  // Get all review data
  async getAll(req, res, next) {
    try {
      let data = await Review.findAll({
        where: { user_id: req.params.id },
        attributes: ["id", "rating", "comment", "updatedAt"], // just these attributes that showed
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
          },
        ],
      });
      if (data.length === 0) {
        return next({ message: "No Review Found", statusCode: 404 });
      }
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return next(e);
    }
  }
  async getAllAdmin(req, res, next) {
    try {
      let data = await Review.findAll({
        attributes: ["id", "rating", "comment", "updatedAt"], // just these attributes that showed
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
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

  async getOne(req, res, next) {
    try {
      let data = await Review.findOne({
        where: { user_id: req.query.user_id, id: req.query.review_id },
        attributes: ["id", "rating", "comment", "updatedAt"], // just these attributes that showed
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
          },
        ],
      });
      // If no data found
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

  async getOneAdmin(req, res, next) {
    try {
      let data = await Review.findOne({
        where: { id: req.params.id },
        attributes: ["id", "rating", "comment", "updatedAt"], // just these attributes that showed
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
          },
        ],
      });
      // If no data found
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
            user_id: req.params.id,
            id: req.query.review_id,
          },
        }
      );

      let data = await Review.findOne({
        where: {
          user_id: req.params.id,
          id: req.query.review_id,
        },
        attributes: ["id", "rating", "comment", "updatedAt"],
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
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
  async updateAdmin(req, res, next) {
    try {
      await Review.update(
        {
          rating: req.body.rating,
          comment: req.body.comment,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      let data = await Review.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "rating", "comment", "updatedAt"],
        include: [
          {
            model: Room,
            attributes: ["id", "name", "rating", "summary"],
          },
        ],
      });

      // If success
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      console.log(e);
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
          user_id: req.params.id,
          id: req.query.review_id,
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
  async deleteAdmin(req, res, next) {
    try {
      // Delete data
      let data = await Review.destroy({
        where: {
          id: req.params.id,
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
