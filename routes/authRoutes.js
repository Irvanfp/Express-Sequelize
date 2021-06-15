const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const authValidator = require("../middlewares/validators/authValidator");
const auth = require("../middlewares/auth");

const { imageUpload } = require("../middlewares/uploads/imageUpload");

const router = express.Router();

router.post(
  "/signup",
  imageUpload,
  authValidator.signup,
  auth.signup,
  authController.getToken
);
router.post(
  "/signin",
  authValidator.signin,
  auth.signin,
  authController.getToken
);
router.put(
  "/update/:id",
  imageUpload,
  authValidator.update,
  authController.update
);
router.get("/", auth.user, authController.getOne);
// router.get("/adminpage/", auth.admin, userController.getOne);
// router.get("/profilepage/", auth.user, userController.getOne);
router.get("/adminpage/users/", auth.admin, authController.getAll);
router.delete("/delete", auth.user, authController.delete);


//=========================google oauth================================
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);

// router.get()

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.OAUTH_CALLBACK_FRONTEND + "/auth/signin",
  }),
  authController.getToken
);

//======================================================================

module.exports = router;
