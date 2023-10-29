require("dotenv").config();
const generateBookingClientEmail = (reservation) => {
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

  const subject = "Potwierdzenie rezerwacji KamRock";
  const html = `
    <h2>Hej tu Kamil z wypożyczalni rowerów</h2>
    <h3>Oto potwierdzenie Twojej rezerwacji:</h3>
    <p><strong>Imię:</strong> ${firstName}</p>
    <p><strong>Nazwisko:</strong> ${lastName}</p>
    ${companyName ? `<p><strong>Firma:</strong> ${companyName}</p>` : ""}
    <p><strong>Kraj:</strong> ${country}</p>
    <p><strong>Ulica:</strong> ${street}</p>
    <p><strong>Kod pocztowy:</strong> ${postalCode}</p>
    <p><strong>Miasto:</strong> ${city}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Model roweru:</strong> ${bikeModel}</p>
    <p><strong>Data początkowa:</strong> ${startDate}</p>
    <p><strong>Data końcowa:</strong> ${endDate}</p>
    <p><strong>Cena:</strong> ${totalPrice} zł</p>
    <h4>Wypożyczalnia rowerów elektrycznych Słotwina</h4>
    <p>Masz pytanie, zadzwoń !  : 123-321-123</p>
    <p>Do zobaczenia: KamRock - wypożyczalnia rowerów elektrycznych </p>
    <p> adres : Słotwina 123</p>
`;

  return { subject: subject, html: html, email: email };
};

module.exports = {
  generateBookingClientEmail,
};
