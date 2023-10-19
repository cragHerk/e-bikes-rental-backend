const express = require("express");
const router = express.Router();
const Reservation = require("../schemas/reservation.schema");

router.post("/book", async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    country,
    street,
    postalCode,
    city,
    phone,
    email,
    bikeModel,
    startDate,
    endDate,
    paymentOnSite,
  } = req.body;

  try {
    const existingReservation = await Reservation.findOne({
      $or: [
        {
          $and: [
            { startDate: { $lte: endDate } },
            { endDate: { $gte: startDate } },
            { bikeModel },
          ],
        },
        {
          $and: [
            { startDate: { $lte: startDate } },
            { endDate: { $gte: endDate } },
            { bikeModel },
          ],
        },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({ message: "The date is already booked." });
    }

    const newReservation = new Reservation({
      firstName,
      lastName,
      companyName,
      country,
      street,
      postalCode,
      city,
      phone,
      email,
      bikeModel,
      startDate,
      endDate,
      paymentOnSite,
    });

    await newReservation.save();

    res.status(201).json({ message: "Rezerwacja została pomyślnie zapisana." });
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas zapisywania rezerwacji." });
  }
});

module.exports = router;
