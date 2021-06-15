const { Reservation } = require("../models");
const crypto = require("crypto"); // to encrypt something
const path = require("path"); // to detect path of directory
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

class PaymentController {
  async uploadPayment(req, res) {
    try {
      if (req.files) {
        const file = req.files.image;
        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          return res.status(400).json({ message: "File must be an image" });
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          return res
            .status(400)
            .json({ message: "Image must be less than 1MB" });
        }

        // // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // assign req.body.image with file.name
        req.body.image = file.name;

        // Upload image to /public/images
        file.mv(`./public/images/${file.name}`, async (err) => {
          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      }

      let uploadImage = await Reservation.update(
        { image: req.body.image },
        {
          where: {
            id: req.upload.id,
          },
        }
      );

      let data = await Reservation.findOne({
        where: { id: req.upload.id },
        attributes: [
          "id",
          "total",
          "price_per_night",
          "number_of_nights",
          "id_room",
          "image",
          ["updatedAt", "waktu"],
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

  //=================///paymentVerification///===================================================================
  async paymentVerification(req, res) {
    try {
      let verify = await Reservation.update(
        { status: req.verify, expire_date: req.expiry },
        {
          where: {
            id: req.approve.id,
          },
        }
      );

      let data = await Reservation.findOne({
        where: { id: req.approve.id },
        attributes: [
          "id",
          "total",
          "price_per_night",
          "number_of_nights",
          "id_room",
          "image",
          "status",
          ["updatedAt", "waktu"],
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
  //==========================///Payment-Gateway///=======================================================
  async createReservationPG(req, res) {
    //Book Now Button
    try {
      let current = new Date(Date.now() + 7 * 60 * 60 * 1000);
      let expTime = current.toISOString().replace("T", " ").substr(0, 19);
      console.log(process.env.SERVER_KEY);
      // Create Snap API instance
      let snap = await new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });

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

      if (!dataCreate) {
        return res.status(201).json({
          message: "reservation cannot be created",
        });
      }

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: req.body.total,
        },
        item_details: [
          {
            id: req.body.id_room,
            price: req.body.price_per_night,
            quantity: req.body.number_of_nights,
            name: req.hotelName,
          },
        ],
        customer_details: {
          first_name: req.body.guest_name,
          email: req.body.guest_email,
          phone: req.body.guest_phone,
        },
        enabled_payments: [
          "credit_card",
          "mandiri_clickpay",
          "cimb_clicks",
          "bca_klikbca",
          "bca_klikpay",
          "bri_epay",
          "echannel",
          "mandiri_ecash",
          "permata_va",
          "bca_va",
          "bni_va",
          "other_va",
          "gopay",
          "indomaret",
          "alfamart",
          "danamon_online",
          "akulaku",
        ],
        callbacks: {
          finish: "https://travelook108.herokuapp.com/thanks-for-choose-us",
        },
        expiry: {
          start_time: `${expTime} +0700`,
          unit: "minutes",
          duration: 24 * 60,
        },
      };

      let payment = await snap.createTransaction(parameter);
      let room_name = req.hotelName;

      const mails = {
        from: process.env.GMAIL_EMAIL,
        to: req.email,
        subject: "Registrasi Berhasil",
        text: `
        Hello ${req.email},

        You have booked from Travelook for ${req.hotelName} on ${req.body.start_date} till ${req.body.start_date} successfully. 
        To activate your reservation, please complete your payment here: ${payment.redirect_url}`,
      };

      let updateToken = await Reservation.update(
        {
          token: payment.token,
          url_confirmation: payment.redirect_url,
          order_id: orderId,
        },
        {
          where: {
            id: dataCreate.id,
          },
        }
      );

      transport.sendMail(mails, (error, info) => {
        if (error) {
          return res.status(201).json({ message: error });
        } else {
          return res.status(201).json({
            message: [`success`, `Email sent`],
            data: dataCreate.dataValues,
            room_name,
            order_id: orderId,
            payment,
          });
        }
      });
    } catch (e) {
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }
  //==========================///paymentHandler///===================================================================================
  async paymentHandler(req, res) {
    try {
      let orderId = req.body.order_id;
      let transactionStatus = req.body.transaction_status;
      let fraudStatus = req.body.fraud_status;

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      // Sample transactionStatus handling logic

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          // TODO set transaction status on your database to 'challenge'
          // and response with 200 OK
          Reservation.update(
            {
              status: "not approved",
            },
            {
              where: {
                order_id: orderId,
              },
            }
          );
        } else if (fraudStatus == "accept") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          Reservation.update(
            {
              status: "approved",
            },
            {
              where: {
                order_id: orderId,
              },
            }
          );
        }
      } else if (transactionStatus == "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        Reservation.update(
          {
            status: "approved",
          },
          {
            where: {
              order_id: orderId,
            },
          }
        );
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        Reservation.update(
          {
            status: "failed",
          },
          {
            where: {
              order_id: orderId,
            },
          }
        );
      } else if (transactionStatus == "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK}
        Reservation.update(
          {
            status: "not approved",
          },
          {
            where: {
              order_id: orderId,
            },
          }
        );
      }
      return res.status(200).json({ message: `transaction done` });
    } catch (e) {
      return res.status(500).json({
        message: "server error",
        error: e.message,
      });
    }
  }
}

module.exports = new PaymentController();
