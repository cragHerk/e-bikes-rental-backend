const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const deletePastReservations = require("./utils/deletePastReservations");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const availabilityRouter = require("./routes/availability.routes");
const reservationRouter = require("./routes/reservation.routes");
const getReservations = require("./routes/getReservations.routes");
const deleteReservation = require("./routes/deleteReservation.routes");

app.use("/api", availabilityRouter);
app.use("/api", reservationRouter);
app.use("/api", getReservations);
app.use("/api", deleteReservation);

app.use((req, res) => {
  res.status(404).json({ message: "Site not found." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
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
