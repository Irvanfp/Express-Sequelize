const { Reservation, Room, User, Media } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

class ReservationController {
  async getAll(req, res) {
    try {
      console.log(req.query.page);
      let page = (req.query.page - 1) * 2;
      let data = await Reservation.findAndCountAll({
        limit: 10,
        offset: page,
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "reservation not found",
        });
      }

      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///getRoomReservation///===============================================================================================
  async getRoomReservation(req, res) {
    try {
      let roomData = await Room.findOne({
        where: { id: req.query.id_room },
        attributes: ["id", "user_id", "price"],
        include: [
          // Include is join
          {
            model: Reservation,
            attributes: [
              "id",
              "order_id",
              "number_of_nights",
              "start_date",
              "end_date",
              "price_per_night",
              "total",
              "status",
              ["createdAt", "waktu"],
            ],
          },
        ],
      });

      let data = roomData.dataValues;
      console.log(req.range);
      data.blockedCalendar = req.range;

      // If data is nothing

      if (roomData.length === 0) {
        return res.status(404).json({
          message: "hotel room not found",
        });
      }

      // If success
      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///getActiveUserReservation///===============================================================================================

  async getUserReservation(req, res) {
    try {
      let page = (req.query.page - 1) * 2;
      let dataActive = await Reservation.findAndCountAll({
        where: {
          [Op.and]: [{ id_user: `${req.id}` }, { status: req.status }],
        },
        attributes: [
          "id",
          "order_id",
          "guest_name",
          "guest_email",
          "guest_number",
          "guest_phone",
          "number_of_nights",
          "start_date",
          "end_date",
          "price_per_night",
          "total",
          "id_room",
          "id_user",
          "status",
          "url_confirmation",
          ["expire_date", `expired at`],
        ],
        include: [
          {
            model: Room,
            attributes: [
              "id",
              "name",
              "location",
              "total_occupancy",
              "total_bedrooms",
              "total_bathroom",
            ],
            include: [
              {
                model: Media,
                attributes: ["file_name"],
                limit: 1,
              },
            ],
          },
        ],

        limit: 10,
        offset: page,
      });

      let totalPage;
      if (dataActive.count <= 10) {
        totalPage = 1;
      } else {
        totalPage = Math.floor(dataActive.count / 10 + 1);
      }

      // If success
      return res.status(200).json({
        message: "success",
        count: dataActive.count,
        data: dataActive.rows,
        totalPage,
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///getOneUserReservation///===============================================================================================

  async getOneUserReservation(req, res) {
    try {
      let data = await Reservation.findAndCountAll({
        where: {
          [Op.and]: [
            { id_user: `${req.id}` },
            { order_id: req.query.order_id },
          ],
        },
        attributes: [
          "id",
          "order_id",
          "guest_name",
          "guest_email",
          "guest_number",
          "guest_phone",
          "number_of_nights",
          "start_date",
          "end_date",
          "price_per_night",
          "total",
          "id_room",
          "id_user",
          "status",
          "url_confirmation",
          ["expire_date", `expired at`],
        ],
        include: [
          {
            model: Room,
            attributes: [
              "id",
              "name",
              "location",
              "total_occupancy",
              "total_bedrooms",
              "total_bathroom",
            ],
            include: [
              {
                model: Media,
                attributes: ["file_name"],
                limit: 1,
              },
            ],
          },
        ],
      });

      // If success
      return res.status(200).json({
        message: "success",
        data,
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///createReservation///===============================================================================================

  async createReservation(req, res) {
    //Book Now Button
    try {
      // let current = new Date();
      const mails = {
        from: process.env.GMAIL_EMAIL,
        to: req.email,
        subject: "Registrasi Berhasil",
        text: `
        Hello ${req.email}
          You have booked from Travelook for ${req.hotelName} on ${req.body.start_date} till ${req.body.start_date} successfully. please complete your payment
          by sending your purchase screenshot yadda yadda yadda
        `,
      };

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
        authentication: "plain",
        address: "smtp.gmail.com",
        port: 587,
      });
      let dataCreate = await Reservation.create(req.body);
      let orderId = `Travelook-${Date.now()}${dataCreate.id}`;
      let dataUpdate = await Reservation.update(
        { order_id: orderId },
        {
          where: {
            id: dataCreate.id,
          },
        }
      );

      if (!dataCreate) {
        return res.status(201).json({
          message: "reervation cannot be created",
        });
      }
      transport.sendMail(mails, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          return res.status(201).json({
            message: [`success`, `Email sent: ${info.response}`],
            data: dataCreate.dataValues,
            order_id: orderId,
          });
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///cancelReservation///===============================================================================================

  async cancelReservation(req, res) {
    try {
      let cancel = await Reservation.update(
        { status: "failed" },
        {
          where: {
            id: req.cancel.id,
            // id_user: req.user.id,
          },
        }
      );

      let data = await Reservation.findOne({
        where: { id: req.cancel.id },
        attributes: [
          "id",
          "order_id",
          "total",
          "price_per_night",
          "start_date",
          "end_date",
          "number_of_nights",
          "status",
          "id_room",
          "image",
          ["updatedAt", "last update"],
        ],
      });

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }

  //==========================///rescheduleReservation///===============================================================================================

  async rescheduleReservation(req, res) {
    try {
      let reschedule = await Reservation.update(req.body, {
        where: {
          id: req.body.id,
          // id_user: req.user.id,
        },
      });

      let data = await Reservation.findOne({
        where: { id: req.body.id },
        attributes: [
          "id",
          "order_id",
          "total",
          "price_per_night",
          "start_date",
          "end_date",
          "number_of_nights",
          "id_room",
          "image",
          ["updatedAt", "last update"],
        ],
      });

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }
}

module.exports = new ReservationController();
