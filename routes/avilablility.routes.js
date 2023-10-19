require("express");
const router = express.Router();
const Reservation = require("../schemas/reservation.schema");

router.get("/availability/:bikeModel", async (req, res) => {
  const { bikeModel } = req.params;

  try {
    const reservations = await Reservation.find(
      { bikeModel },
      "startDate endDate -_id"
    );

    const reservedDates = [];

    reservations.forEach((reservation) => {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      for (
        let currentDay = start;
        currentDay <= end;
        currentDay.setDate(currentDay.getDate() + 1)
      ) {
        reservedDates.push({ date: new Date(currentDay) });
      }
    });

    res.status(200).json({ reservedDates });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving date availability." });
  }
});

module.exports = router;
