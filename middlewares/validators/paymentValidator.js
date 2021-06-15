const validator = require("validator");
const { Reservation, Room, User } = require("../../models");
const { Op } = require("sequelize");
const setRange = require("../../utils/setRange");

exports.verifyPayment = async (req, res, next) => {
  try {
    let errors = [];
    let today = new Date();
    let checkInput = req.body.status != "approved" || "failed";

    if (!checkInput) {
      errors.push(`please only put 'approved' or 'failed'`);
    }

    let reserveData = await Reservation.findOne({
      where: { id: req.query.id },

      attributes: [
        "id",
        "id_user",
        "id_room",
        "start_date",
        "end_date",
        "expire_date",
        "status",
      ],
    });

    if (!reserveData) {
      return res.status(404).json({
        message: "reservation invalid",
      });
    }

    let checkStat = reserveData.status == `not approved`;
    let checkExp = reserveData.expire_date >= today;

    if (!checkStat) {
      errors.push(`reservation is already ${reserveData.status}`);
    }

    if (!checkExp) {
      errors.push(`reservation is already expired`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    req.approve = reserveData;
    req.verify = req.body.status;
    req.expiry = reserveData.end_date;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//========================uploadPayment===============================================================

exports.uploadPayment = async (req, res, next) => {
  try {
    let errors = [];
    let today = new Date();

    let reserveData = await Reservation.findOne({
      where: {
        [Op.and]: [{ id: req.query.id }, { id_user: req.user.id }],
      },

      attributes: [
        "id",
        "id_user",
        "id_room",
        "start_date",
        "end_date",
        "expire_date",
        "status",
      ],
    });

    if (!reserveData) {
      return res.status(404).json({
        message: "reservation invalid",
      });
    }

    let checkStat = reserveData.status == `not approved`;
    let checkExp = reserveData.expire_date >= today;

    if (!checkStat) {
      errors.push(`reservation is already ${reserveData.status}`);
    }

    if (!checkExp) {
      errors.push(`reservation is already expired`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    req.upload = reserveData;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};
