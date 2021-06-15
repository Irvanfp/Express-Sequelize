const validator = require("validator");
const { User, Review } = require("../../models");

module.exports.getAll = async (req, res, next) => {
  try {
    // Find User
    let data = await User.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!data) {
      return next({
        message: `User ${req.params.id} Not Found`,
        statusCode: 404,
      });
    }

    next();
  } catch (e) {
    return next(e);
  }
};

module.exports.getOne = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await Promise.all([
      User.findOne({
        where: { id: req.query.user_id },
      }),
      Review.findOne({
        where: { id: req.query.review_id },
      }),
    ]);
    if (!findData[0]) {
      errors.push("User not found");
    }
    if (!findData[1]) {
      errors.push("Review not found");
    }
    if (errors.length > 0) {
      return next({ message: errors.join(", "), statusCode: 400 });
    }

    next();
  } catch (e) {
    return next(e);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await Promise.all([
      User.findOne({
        where: { id: req.params.id },
      }),
      Review.findOne({
        where: { id: req.query.review_id },
      }),
    ]);

    if (!findData[0]) {
      errors.push("User not found");
    }
    if (!findData[1]) {
      errors.push("Review not found");
    }
    if (!validator.isNumeric(req.body.rating)) {
      errors.push("Rating must be a number");
    }
    if (req.body.rating > 5) {
      errors.push("Rating should be number 1 to 5");
    }

    if (errors.length > 0) {
      return next({ message: errors.join(", "), statusCode: 400 });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    return next(e);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    let errors = [];

    let findData = await Promise.all([
      User.findOne({
        where: { id: req.params.id },
      }),
      Review.findOne({
        where: { id: req.query.review_id },
      }),
    ]);
    if (!findData[0]) {
      errors.push("User not found");
    }
    if (!findData[1]) {
      errors.push("Review not found");
    }
    if (errors.length > 0) {
      return next({ message: errors.join(", "), statusCode: 400 });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
