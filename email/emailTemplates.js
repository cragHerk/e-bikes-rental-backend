require("dotenv").config();
const generateBookingConfirmationEmail = (reservation) => {
  const {
    firstName,
    lastName,
    companyName = "brak",
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
  } = reservation;

  const emailSubject = "Potwierdzenie rezerwacji";
  const emailText =
    "Potwierdzenie rezerwacji\n\n" +
    "Imię: " +
    firstName +
    "\n" +
    "Nazwisko: " +
    lastName +
    "\n" +
    (companyName ? "Firma: " + companyName + "\n" : "") +
    "Kraj: " +
    country +
    "\n" +
    "Ulica: " +
    street +
    "\n" +
    "Kod pocztowy: " +
    postalCode +
    "\n" +
    "Miasto: " +
    city +
    "\n" +
    "Telefon: " +
    phone +
    "\n" +
    "Email: " +
    email +
    "\n" +
    "Model roweru: " +
    bikeModel +
    "\n" +
    "Data początkowa: " +
    startDate +
    "\n" +
    "Data końcowa: " +
    endDate +
    "\n" +
    "Cena: " +
    totalPrice +
    " zł\n";

  return { subject: emailSubject, text: emailText };
};

module.exports = {
  generateBookingConfirmationEmail,
};
