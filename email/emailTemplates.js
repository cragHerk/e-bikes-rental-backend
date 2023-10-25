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
  const emailText = `
    Potwierdzenie rezerwacji
    
    Imię: ${firstName}
    Nazwisko: ${lastName}
    ${companyName ? `Firma: ${companyName}` : ""}
    Kraj: ${country}
    Ulica: ${street}
    Kod pocztowy: ${postalCode}
    Miasto: ${city}
    Telefon: ${phone}
    Email: ${email}
    Model roweru: ${bikeModel}
    Data początkowa: ${startDate}
    Data końcowa: ${endDate}
    Cena: ${totalPrice} zł
    `;

  return { subject: emailSubject, text: emailText };
};

module.exports = {
  generateBookingConfirmationEmail,
};
