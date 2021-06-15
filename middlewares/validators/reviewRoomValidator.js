const validator = require("validator");
const { User, Room } = require("../../models");

module.exports.getAll = async (req, res, next) => {
  try {
    let errors = [];
    // Find Room
    let checkRoom = await Room.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!checkRoom) {
      return next({
        message: `Room ${req.params.id} Not Found`,
        statusCode: 404,
      });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    return next(e);
  }
};
module.exports.create = async (req, res, next) => {
  try {
    let errors = [];
    // Find Room
    let checkRoom = await Room.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!checkRoom) {
      return next({
        message: `Room ${req.params.id} Not Found`,
        statusCode: 404,
      });
    }
    // Find User
    let checkUser = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!checkUser) {
      return next({
        message: `User ${req.body.user_id} Not Found`,
        statusCode: 404,
      });
    }
    if (!validator.isNumeric(req.body.rating)) {
      errors.push("Rating must be a number");
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
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

module.exports.update = async (req, res, next) => {
  try {
    let errors = [];
    // Find Room
    let checkRoom = await Room.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!checkRoom) {
      return next({
        message: `Room ${req.params.id} Not Found`,
        statusCode: 404,
      });
    }
    // Find User
    let checkUser = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!checkUser) {
      return next({
        message: `User ${req.body.user_id} Not Found`,
        statusCode: 404,
      });
    }
    if (!validator.isNumeric(req.body.rating)) {
      errors.push("Rating must be a number");
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
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
    // Find Room
    let checkRoom = await Room.findOne({
      where: { id: `${req.params.id}` },
    });

    if (!checkRoom) {
      return next({
        message: `Room ${req.params.id} Not Found`,
        statusCode: 404,
      });
    }
    // Find User
    let checkUser = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!checkUser) {
      return next({
        message: `User ${req.body.user_id} Not Found`,
        statusCode: 404,
      });
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
