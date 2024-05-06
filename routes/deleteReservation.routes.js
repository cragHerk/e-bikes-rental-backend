const express = require("express");
const Reservation = require("../schemas/reservation.schema");

const router = express.Router();

router.delete("/reservations/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await Reservation.findByIdAndRemove(id);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
    } else {
      res.status(200).json({ message: "Reservation deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
