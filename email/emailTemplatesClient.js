const moment = require("moment");

const generateBookingClientEmail = (reservation) => {
  const {
    firstName,
    lastName,
    email,
    bikeModel,
    startDate,
    endDate,
    totalPrice,
  } = reservation;

  const formattedStartDate = moment(startDate).format("DD/MM/YYYY");
  const formattedEndDate = moment(endDate).format("DD/MM/YYYY");

  const subject = "Potwierdzenie rezerwacji KamRock";
  const html = `
    <h2>Hej tu Kamil z wypożyczalni rowerów</h2>
    <h3>Oto potwierdzenie Twojej rezerwacji:</h3>
    <p><strong>Imię:</strong> ${firstName}</p>
    <p><strong>Nazwisko:</strong> ${lastName}</p>
    <p><strong>Model roweru:</strong> ${bikeModel}</p>
    <p><strong>Data początkowa:</strong> ${formattedStartDate}</p>
    <p><strong>Data końcowa:</strong> ${formattedEndDate}</p>
    <p><strong>Cena:</strong> ${totalPrice} zł</p>
    <h4>Wypożyczalnia rowerów elektrycznych Lipowa</h4>
    <p>Masz pytanie, zadzwoń !  : +48 536196751</p>
    <p>Do zobaczenia: KamRock - wypożyczalnia rowerów elektrycznych </p>
    <p> adres : Lipowa ul.sloneczne wzgórze 28</p>
  `;

  return { subject: subject, html: html, email: email };
};

module.exports = {
  generateBookingClientEmail,
};
