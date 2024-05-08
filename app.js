const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const deletePastReservations = require("./utils/deletePastReservations");
require("dotenv").config();
require("./config/config.passport");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const usersRouter = require("./routes/user.routes");
const availabilityRouter = require("./routes/availability.routes");
const reservationRouter = require("./routes/reservation.routes");
const getReservations = require("./routes/getReservations.routes");
const deleteReservation = require("./routes/deleteReservation.routes");
app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", usersRouter);
app.use("/api", availabilityRouter);
app.use("/api", reservationRouter);
app.use("/api", getReservations);
app.use("/api", deleteReservation);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(500).json({ message: err.message });
});

cron.schedule(
  "0 0 1 */2 *",
  () => {
    deletePastReservations();
  },
  {
    scheduled: true,
    timezone: "Europe/Warsaw",
  }
);

module.exports = app;
