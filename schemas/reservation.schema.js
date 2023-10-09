const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  country: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bikeModel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentOnSite: { type: Boolean, default: false },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
