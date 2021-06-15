const validator = require("validator");
const { Reservation, Room, User } = require("../../models");
const { Op } = require("sequelize");
const setRange = require("../../utils/setRange");

exports.createReservation = async (req, res, next) => {
  try {
    const startDate = new Date(`${req.body.start}`).addHours(7);
    const endDate = new Date(`${req.body.end}`).addHours(7);
    const bookRange = setRange.getDates(startDate, endDate);

    let today = new Date(Date.now() + 7 * 60 * 60 * 1000);
    // let nextYear = new Date(today.getTime() + 360 * 24 * 60 * 60 * 1000);
    let name = `${req.body.firstName} ${req.body.lastName}`;
    // console.log(`nextYear`, nextYear);

    let errors = [];

    /**
     * date format: yyyy/mm/dd
     */

    if (!req.body.number) {
      req.body.number = `1`;
    }

    if (!validator.isDate(req.body.start)) {
      errors.push("start_date is not correct");
    }

    if (startDate < today.addDays(1)) {
      errors.push("min 24 hrs before booking date");
    }

    if (!validator.isDate(req.body.end)) {
      errors.push("end_date is not correct");
    }

    if (req.body.start >= req.body.end) {
      errors.push("please select correct date range");
    }

    if (name.length <= 3) {
      errors.push("please put your name");
    }

    if (!validator.isEmail(req.body.email)) {
      errors.push("email field must be valid");
    }

    if (!validator.isNumeric(req.body.number)) {
      errors.push("please put correct number");
    }

    if (!validator.isNumeric(req.body.phone)) {
      errors.push("please put correct phone number");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    let roomData = await Promise.all([
      Room.findOne({
        where: { id: req.query.id_room },
        attributes: ["id", "name", "price", "total_occupancy"],
        include: [
          // Include is join
          {
            model: Reservation,
            attributes: ["start_date", "end_date", "expire_date", "status"],
          },
        ],
      }),
      User.findOne({
        where: { id: req.user.id },
        attributes: ["email"],
      }),
    ]);

    //jika room tidak ada////
    if (!roomData[0]) {
      return res.status(400).json({
        message: "room is invalid",
      });
    }

    let roomObject = roomData[0].dataValues;
    let reserveObject = roomObject.Reservations.map((x) => x.dataValues);

    let reservationStatus = reserveObject.map((x) => x.status);

    let reservationStartDate = reserveObject.map((x) => x.start_date);

    let reservationEndDate = reserveObject.map((x) => x.end_date);

    let reservationExpire = reserveObject.map((x) => x.expire_date);

    let eligibleExpire = reservationExpire.every((x) => x > today);
    let eligibleStatus = reservationStatus.every((x) => x == "approved");
    if (reserveObject.length > 0) {
      for (i = 0; i < reservationStatus.length; i++) {
        let belumTerbook =
          (startDate < reservationStartDate[i] &&
            startDate < reservationEndDate[i] &&
            endDate < reservationStartDate[i] &&
            endDate < reservationEndDate[i]) ||
          (startDate > reservationStartDate[i] &&
            startDate > reservationEndDate[i] &&
            endDate > reservationStartDate[i] &&
            endDate > reservationEndDate[i]) ||
          `${endDate}` == `${reservationStartDate[i]}` ||
          `${startDate}` == `${reservationEndDate[i]}`;

        let sudahExpired = reservationExpire[i] <= today;
        let sudahApprove = reservationStatus[i] == "approved";
        let sudahFailed = reservationStatus[i] == "failed";

        //jika tanggal SUDAH terbooked akan mengecek apakah BELUM expired dan BELUM failed
        if (!belumTerbook && !sudahExpired && !sudahFailed) {
          return res.status(401).json({
            message: "date is unavailable",
          });
        }

        //jika tanggal SUDAH terbooked akan mengecek apakah SUDAH expired dan SUDAH di approve
        if (!belumTerbook && sudahExpired && sudahApprove) {
          return res.status(401).json({
            message: "date is unavailable",
          });
        }
      }
    }

    //==================guest number============
    let guest_number = roomObject.total_occupancy;
    if (guest_number < req.body.number) {
      return res.status(400).json({
        message: "room occupancy is invalid",
      });
    }

    // semua masukkan req.body
    let jmlNights = (endDate - startDate) / 1000 / 60 / 60 / 24;
    let totalNights = roomObject.price * jmlNights;

    req.email = roomData[1].email;
    req.hotelName = roomObject.name;

    req.email = roomData[1].email;
    req.hotelName = roomObject.name;

    req.body = {
      number_of_nights: jmlNights,
      guest_name: name,
      guest_email: req.body.email,
      guest_number: req.body.number,
      guest_phone: req.body.phone,
      total: totalNights,
      start_date: startDate,
      end_date: endDate,
      price_per_night: roomObject.price,
      number_of_nights: jmlNights,
      id_room: roomObject.id,
      id_user: req.user.id,
      expire_date: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    };

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//=========================roomReservation=================================================================================================
exports.roomReservation = async (req, res, next) => {
  try {
    let errors = [];
    let today = new Date(Date.now() + 7 * 60 * 60 * 1000);

    let reservationData = await Room.findOne({
      where: { id: req.query.id_room },
      attributes: ["id", "user_id", "price"],
      include: [
        // Include is join
        {
          model: Reservation,
          attributes: ["start_date", "end_date", "expire_date", "status"],
        },
      ],
    });

    ////jika room tidak ada////
    if (!reservationData) {
      return res.status(404).json({
        message: "hotel not found",
      });
    }

    // =====finding range=========

    let roomObject = reservationData.dataValues;
    let reserveObject = roomObject.Reservations.map((x) => x.dataValues);

    let reservationStatus = reserveObject.map((x) => x.status);

    let reservationStartDate = reserveObject.map((x) => x.start_date);

    let reservationEndDate = reserveObject.map((x) => x.end_date);

    let reservationExpire = reserveObject.map((x) => x.expire_date);

    // let eligibleExpire = reservationExpire.every((x) => x > today);
    // let eligibleStatus = reservationStatus.every((x) => x == "failed");

    // ====
    let reservationRange = [];

    for (t = 0; t < reservationStartDate.length; t++) {
      let eligibleExpire = reservationExpire[t] > today;
      let eligibleStatus = reservationStatus[t] == "failed";

      if (eligibleExpire || eligibleStatus) {
        let temp = setRange.getDates(
          reservationStartDate[t],
          reservationEndDate[t]
        );
        reservationRange.push(temp);
      }
    }
    //==============================

    // semua masukkan req.body
    req.range = reservationRange;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//========================================roomCancelation==================================================================================
exports.roomCancelation = async (req, res, next) => {
  try {
    let errors = [];

    let reservationCancel = await Reservation.findOne({
      where: {
        [Op.and]: [
          { id: req.body.id_reservation },
          { id_user: req.user.id },
          { id_room: req.query.id_room },
        ],
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

    if (!reservationCancel) {
      return res.status(400).json({
        message: "not valid",
      });
    }

    let starDate = reservationCancel.start_date.getTime();
    let today = new Date().getTime();
    //==============================

    if (today > starDate) {
      errors.push("reservation already pass date");
    }

    if (
      reservationCancel.status == "failed" ||
      reservationCancel.status == "done"
    ) {
      errors.push("reservation no longer active");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    // semua masukkan req.body
    req.cancel = reservationCancel;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//========================================reservationReschedule==================================================================================
exports.reservationReschedule = async (req, res, next) => {
  try {
    let errors = [];

    const startDate = new Date(`${req.body.start}`).addHours(7);
    const endDate = new Date(`${req.body.end}`).addHours(7);
    const bookRange = setRange.getDates(startDate, endDate);

    let today = new Date(Date.now() + 7 * 60 * 60 * 1000);

    if (!validator.isDate(req.body.start)) {
      errors.push("start_date is not correct");
    }

    if (startDate < today.addDays(1)) {
      errors.push("min 24 hrs before booking date");
    }

    if (!validator.isDate(req.body.end)) {
      errors.push("end_date is not correct");
    }

    if (req.body.start >= req.body.end) {
      errors.push("please select correct date range");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    let roomData = await Promise.all([
      Reservation.findOne({
        where: {
          [Op.and]: [
            { id: req.body.id_reservation },
            { id_user: req.user.id },
            { id_room: req.query.id_room },
            { status: [`approved`, `not approved`] },
          ],
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
      }),
      Room.findOne({
        where: { id: req.query.id_room },
        attributes: ["id", "price", "total_occupancy"],
        include: [
          // Include is join
          {
            model: Reservation,
            attributes: ["id", "start_date", "end_date", "expire_date"],
          },
        ],
      }),
    ]);

    //jika room tidak ada////
    if (!roomData[0]) {
      return res.status(404).json({
        message: "reservation invalid",
      });
    }

    if (!roomData[1]) {
      return res.status(404).json({
        message: "hotel room not found",
      });
    }

    let roomObject = roomData[1].dataValues;
    let reserveObject = roomObject.Reservations.map((x) => x.dataValues);

    let reservationStatus = reserveObject.map((x) => x.status);

    let reservationId = reserveObject.map((x) => x.id);

    let reservationStartDate = reserveObject.map((x) => x.start_date);

    let reservationEndDate = reserveObject.map((x) => x.end_date);

    let reservationExpire = reserveObject.map((x) => x.expire_date);

    // let eligibleExpire = reservationExpire.every((x) => x > today);
    // let eligibleStatus = reservationStatus.every((x) => x == "approved");

    for (i = 0; i < reservationStatus.length; i++) {
      let belumTerbook =
        (startDate < reservationStartDate[i] &&
          startDate < reservationEndDate[i] &&
          endDate < reservationStartDate[i] &&
          endDate < reservationEndDate[i]) ||
        (startDate > reservationStartDate[i] &&
          startDate > reservationEndDate[i] &&
          endDate > reservationStartDate[i] &&
          endDate > reservationEndDate[i]) ||
        `${endDate}` == `${reservationStartDate[i]}` ||
        `${startDate}` == `${reservationEndDate[i]}`;

      let sudahExpired = reservationExpire[i] <= today;
      let sudahApprove = reservationStatus[i] == "approved";
      let sudahFailed = reservationStatus[i] == "failed";
      let idReservation = reservationId[i] == req.body.id_reservation;

      //jika tanggal SUDAH terbooked akan mengecek apakah BELUM expired dan BELUM failed SELAIN id reservation itu
      if (!belumTerbook && !sudahExpired && !sudahFailed && !idReservation) {
        return res.status(401).json({
          message: "date is unavailable",
        });
      }

      //jika tanggal SUDAH terbooked akan mengecek apakah SUDAH expired dan SUDAH di approve SELAIN id reservation itu
      if (!belumTerbook && sudahExpired && sudahApprove && !idReservation) {
        return res.status(401).json({
          message: "date is unavailable",
        });
      }
    }

    //==============================

    // semua masukkan req.body
    let jmlNights = (endDate - startDate) / 1000 / 60 / 60 / 24;
    let totalNights = roomData[1].dataValues.price * jmlNights;

    req.body = {
      id: roomData[0].id,
      total: totalNights,
      start_date: startDate,
      end_date: endDate,
      price_per_night: roomObject.price,
      number_of_nights: jmlNights,
      status: "not approved",
      expire_date: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    };

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//=========================userReservation=================================================================================================
exports.userReservation = async (req, res, next) => {
  try {
    let errors = [];
    let today = new Date(Date.now() + 7 * 60 * 60 * 1000);

    let reservationData = await Promise.all([
      Reservation.update(
        { status: "failed" },
        {
          where: {
            [Op.and]: [
              { id_user: req.user.id },
              { status: "not approved" },
              { expire_date: { [Op.lt]: today } },
            ],
          },
        }
      ),
      Reservation.update(
        { status: "done" },
        {
          where: {
            [Op.and]: [
              { id_user: req.user.id },
              { status: "approved" },
              { end_date: { [Op.lt]: today } },
            ],
          },
        }
      ),
    ]);

    let activePage = ["approved", "not approved"];
    let nonActivePage = ["failed", "done"];

    req.id = req.user.id;
    req.status = req.body.status == `active` ? activePage : nonActivePage;

    ////jika reservation tidak ada////
    if (!reservationData) {
      return res.status(404).json({
        message: "reservation not found",
      });
    }

    // ===

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};

//=========================oneUserReservation=================================================================================================
exports.oneUserReservation = async (req, res, next) => {
  try {
    let errors = [];

    req.id = req.user.id;

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Start Panic! Internal Server Error",
      error: e.message,
    });
  }
};
