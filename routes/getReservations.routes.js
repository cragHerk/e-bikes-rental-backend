const express = require("express");
const Reservation = require("../schemas/reservation.schema");

const router = express.Router();

router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
