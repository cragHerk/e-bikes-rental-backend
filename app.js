const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const availabilityRouter = require("./routes/avilablility.routes");
const reservationRouter = require("./routes/reservation.routes");

app.use("/api", availabilityRouter);
app.use("/api", reservationRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Site not found." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
});

module.exports = app;
