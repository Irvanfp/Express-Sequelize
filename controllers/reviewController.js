const { review, room } = require("../models");
require("../utils/associations"); // Import table relationship

class ReviewController {
  /**Get All Review  ==============================================================================================================
   */
  async getAll(req, res) {
    try {
      let options = {
        page: req.body.page,
        limit: 10,
        sort: "-updatedAt",
        leanWithId: true,
        collation: { locale: "en" },
      };

      let data = await review.paginate({ room: req.body.room }, options);
      let lastPage = Math.floor(data.length / 10) + 1;
      if (options.page > lastPage || options.page < 0) options.page = 1;

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  /**Get One Review  ==============================================================================================================
   */
  async getOne(req, res) {
    try {
      let data = await review.findOne({
        where: { id: req.params.id },
      });

      if (!data) {
        return res.status(404).json({
          message: "Review Not Found",
        });
      }

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  /**Create Review for room =============================================================================================
   */
  async create(req, res) {
    try {
      let data = await review.create(req.body);
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  /**Update Review for room =============================================================================================
   */
  async update(req, res) {
    try {
      let data = await review.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        runvalidator: true,
      });
      await data.save(); //last added, if wrong try to delete 'await'

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // console.error("controller", e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }

  /**Delete Review for room =============================================================================================
   */
  async delete(req, res) {
    try {
      let data = await review.findOne({ _id: req.body.review });
      await data.remove();

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
}

module.exports = new ReviewController();
