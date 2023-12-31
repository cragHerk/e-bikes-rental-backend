const express = require("express");
const router = express.Router();
const { sendEmail } = require("../email/emailSender.js");
const { sendEmailToClient } = require("../email/emailSenderToClient.js");
const { generateBookingEmail } = require("../email/emailTemplates.js");
const {
  generateBookingClientEmail,
} = require("../email/emailTemplatesClient.js");
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
    totalPrice,
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
      totalPrice,
    });

    try {
      await newReservation.save();
    } catch (dbError) {
      return res.status(500).json({
        message: "Błąd podczas zapisywania rezerwacji w bazie danych.",
      });
    }

    try {
      const emailInfo = generateBookingEmail(newReservation);
      await sendEmail(emailInfo);
    } catch (emailError) {
      return res
        .status(500)
        .json({ message: "Błąd podczas wysyłania e-maila." });
    }
    try {
      const emailClientInfo = generateBookingClientEmail(newReservation);
      await sendEmailToClient(emailClientInfo);
    } catch (emailError) {
      return res
        .status(500)
        .json({ message: "Błąd podczas wysyłania e-maila do klienta." });
    }

    res.status(201).json({ message: "Rezerwacja została pomyślnie zapisana." });
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas przetwarzania rezerwacji." });
  }
});

module.exports = router;
