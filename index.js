require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const fs = require("fs");
const path = require("path");

const express = require("express");
const fileUpload = require("express-fileupload");

//import routes
const userRoutes = require("./routes/authRoutes.js");
const roomRoutes = require("./routes/roomRoutes.js");
const mediaRoutes = require("./routes/mediaRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const reservationRoutes = require("./routes/reservationRoute.js");

const app = express();
const cors = require("cors");
app.use(cors());
// Security Packages
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const morgan = require("morgan");

// Body parser
app.use(express.json()); // Enable json req.body
app.use(
  express.urlencoded({
    extended: true,
  })
); // Enable req.body urlencoded

// To read form-data
app.use(fileUpload());
// set static assets to public directory (usually for images, videos, and other files)
// app.use(express.static("public"));

// To import errorHandler
const errorHandler = require("./middlewares/errorHandler");

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 60,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

//statuc folder for images
app.use(express.static("public"));

//import associations
require("./utils/associations");

//make routes
app.use("/auth", userRoutes);
app.use("/room", roomRoutes);
app.use("/review", reviewRoutes);
app.use("/media", mediaRoutes);
app.use("/reservation", reservationRoutes);

app.use(errorHandler);

const PORT = 5000 || process.env.PORT;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on ${PORT}!`));
}

module.exports = app;
