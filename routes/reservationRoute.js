const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const reservationValidator = require("../middlewares/validators/reservationValidator");
const PaymentController = require("../controllers/paymentController");
const PaymentValdator = require("../middlewares/validators/paymentValidator");

const auth = require("../middlewares/auth");

//=====================///checkin///===============================

router
  .route("/room")
  .get(
    auth.admin,
    reservationValidator.roomReservation,
    reservationController.getRoomReservation
  )
  .post(
    auth.user,
    reservationValidator.createReservation,
    PaymentController.createReservationPG
  );

//=====================///get all reservation(admin's dashboard)///===============================

router.route("/").get(auth.admin, reservationController.getAll);

//=====================///payment///=====================================

router
  .route("/payment")
  .put(
    auth.user,
    PaymentValdator.uploadPayment,
    PaymentController.uploadPayment
  )
  .post(
    auth.user,
    reservationValidator.createReservation,
    PaymentController.createReservationPG
  );
router
  .route("/verify")
  .put(
    auth.admin,
    PaymentValdator.verifyPayment,
    PaymentController.paymentVerification //=== verification via manual -- admin's job====//
  )
  .post(PaymentController.paymentHandler); //=== verification via gateway -- all user's job====//

//=====================///cancellation///===============================

router
  .route("/user")
  .post(
    auth.user,
    reservationValidator.userReservation,
    reservationController.getUserReservation
  )
  .put(
    auth.user,
    reservationValidator.roomCancelation,
    reservationController.cancelReservation
  );

//=====================///reschedule///===============================

router
  .route("/order")
  .put(
    auth.user,
    reservationValidator.reservationReschedule,
    reservationController.rescheduleReservation
  ).get(
    auth.user,
    reservationValidator.oneUserReservation,
    reservationController.getOneUserReservation
  )

module.exports = router;
